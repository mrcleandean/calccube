import { useRef, useState, type ReactNode } from "react";
import { CubeContext } from "../hooks/useCubeContext";
import { Camera } from "@react-three/fiber";

export type CameraType = Camera & {
    manual?: boolean | undefined;
}

export type CalcType = {
    operator: string;
    prevOperand: string;
    currentOperand: string;
    power: boolean;
}

const CubeProvider = ({ children }: { children: ReactNode }) => {
    const [calc, setCalc] = useState<CalcType>({
        operator: '',
        prevOperand: '',
        currentOperand: '',
        power: true
    });
    const [camera, setCamera] = useState<CameraType | null>(null);
    const [width, setWidth] = useState(window.innerWidth);
    const [height, setHeight] = useState(window.innerHeight);
    const gsapRef = useRef<HTMLDivElement | null>(null);
    return (
        <CubeContext.Provider value={{
            calc, setCalc,
            camera, setCamera,
            width, setWidth,
            height, setHeight,
            gsapRef
        }}>
            {children}
        </CubeContext.Provider>
    )
}

export default CubeProvider;