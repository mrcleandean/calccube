import type { CalcType } from "../components/CubeProvider";
import type { Mesh } from "three";
import type { Dispatch, SetStateAction } from 'react';
import powerdown from '../assets/powerdown.mp3';
import powerup from '../assets/powerup.mp3';

export type NodeOperatorKeyType = 'Divide' | 'Multiply' | 'Plus' | 'Minus';
export type SetCalcType = Dispatch<SetStateAction<CalcType>>;

class Behaviour {
    operatorSymbolMap: {
        'Divide': '/',
        'Multiply': 'x',
        'Plus': '+',
        'Minus': '-'
    }
    powerDownAudio: HTMLAudioElement;
    powerUpAudio: HTMLAudioElement;
    constructor() {
        this.operatorSymbolMap = {
            'Divide': '/',
            'Multiply': 'x',
            'Plus': '+',
            'Minus': '-'
        };
        this.powerDownAudio = new Audio(powerdown);
        this.powerUpAudio = new Audio(powerup);
        this.powerDownAudio.volume = 0.4;
        this.powerUpAudio.volume = 0.4;
    }
    runOperation(node: Mesh, calc: CalcType, setCalc: SetCalcType) {
        switch (node.name) {
            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                this.pressNumber(node.name, setCalc)
                break;
            case 'Equals':
                this.pressEqual(calc, setCalc)
                break;
            case 'Decimal':
                this.pressDecimal(calc, setCalc)
                break;
            case 'Divide':
            case 'Multiply':
            case 'Plus':
            case 'Minus':
                this.pressOperator(node.name, calc, setCalc)
                break;
            case 'AC':
                this.pressAC(setCalc)
                break;
            case 'PlusOrMinus':
                this.pressPlusOrMinus(calc, setCalc)
                break;
            case 'Percent':
                this.pressPercent(calc, setCalc)
                break;
            case 'IO':
                this.pressIO(calc, setCalc)
                break;
            case 'Del':
                this.pressDel(setCalc)
                break;
            case 'Rand':
                this.pressRand(setCalc)
                break;
            case 'Pi':
                this.pressPi(setCalc)
                break;
        }
    }
    pressNumber(numString: string, setCalc: SetCalcType) {
        setCalc(prev => ({
            ...prev,
            currentOperand: prev.currentOperand + numString
        }))
    }
    pressEqual(calc: CalcType, setCalc: SetCalcType) {
        if (calc.prevOperand === '' && calc.currentOperand === '' || calc.prevOperand === '' && calc.currentOperand !== '') return
        if (calc.prevOperand !== '' && calc.currentOperand !== '') {
            let newCur: undefined | number;
            const prev = Number(calc.prevOperand)
            const curr = Number(calc.currentOperand)
            switch (calc.operator) {
                case '/':
                    newCur = prev / curr
                    break
                case 'x':
                    newCur = prev * curr
                    break
                case '+':
                    newCur = prev + curr
                    break
                case '-':
                    newCur = prev - curr
                    break
            }
            setCalc(prev => ({
                ...prev,
                operator: '',
                prevOperand: '',
                currentOperand: String(newCur)
            }))
        }
    }
    pressDecimal(calc: CalcType, setCalc: SetCalcType) {
        if (calc.currentOperand.includes('.')) return
        if (calc.currentOperand === '') {
            setCalc(prev => ({
                ...prev,
                currentOperand: prev.currentOperand + '0.'
            }))
            return
        } else {
            setCalc(prev => ({
                ...prev,
                currentOperand: prev.currentOperand + '.'
            }))
        }
    }
    pressOperator(name: NodeOperatorKeyType, calc: CalcType, setCalc: SetCalcType) {
        if (calc.prevOperand === '' && calc.currentOperand === '') return
        if (calc.prevOperand === '' && calc.currentOperand !== '') {
            setCalc(prev => ({
                ...prev,
                operator: this.operatorSymbolMap[name],
                prevOperand: prev.currentOperand,
                currentOperand: ''
            }))
            return
        }
        if (calc.prevOperand !== '' && calc.currentOperand === '') {
            setCalc(prev => ({
                ...prev,
                operator: this.operatorSymbolMap[name],
            }))
        }
        if (calc.prevOperand !== '' && calc.currentOperand !== '') {
            let newPrev: undefined | number;
            const prev = Number(calc.prevOperand)
            const curr = Number(calc.currentOperand)
            switch (calc.operator) {
                case '/':
                    newPrev = prev / curr
                    break
                case 'x':
                    newPrev = prev * curr
                    break
                case '+':
                    newPrev = prev + curr
                    break
                case '-':
                    newPrev = prev - curr
                    break
            }
            setCalc(prev => ({
                ...prev,
                operator: this.operatorSymbolMap[name],
                prevOperand: String(newPrev),
                currentOperand: ''
            }))
            return
        }
    }
    pressAC(setCalc: SetCalcType) {
        setCalc(prev => ({
            ...prev,
            operator: '',
            prevOperand: '',
            currentOperand: ''
        }))
    }
    pressPlusOrMinus(calc: CalcType, setCalc: SetCalcType) {
        if (calc.currentOperand === '') return
        const invertedVal = Number(calc.currentOperand) * -1
        setCalc(prev => ({
            ...prev,
            currentOperand: String(invertedVal)
        }))
    }
    pressPercent(calc: CalcType, setCalc: SetCalcType) {
        if (calc.currentOperand === '') return
        const percentedVal = Number(calc.currentOperand) / 100
        setCalc(prev => ({
            ...prev,
            currentOperand: String(percentedVal)
        }))
    }
    pressIO(calc: CalcType, setCalc: SetCalcType) {
        if (calc.power) {
            this.powerDownAudio.currentTime = 0
            this.powerDownAudio.play()
            this.powerUpAudio.pause()
        } else {
            this.powerUpAudio.currentTime = 0
            this.powerUpAudio.play()
            this.powerDownAudio.pause()
        }
        setCalc(prev => ({
            ...prev,
            operator: '',
            prevOperand: '',
            currentOperand: '',
            power: !prev.power
        }))
    }
    pressDel(setCalc: SetCalcType) {
        setCalc(prev => ({
            ...prev,
            currentOperand: prev.currentOperand.slice(0, -1)
        }))
    }
    pressRand(setCalc: SetCalcType) {
        setCalc(prev => ({
            ...prev,
            currentOperand: String(Math.random())
        }))
    }
    pressPi(setCalc: SetCalcType) {
        setCalc(prev => ({
            ...prev,
            currentOperand: String(Math.PI)
        }))
    }
}

export default Behaviour