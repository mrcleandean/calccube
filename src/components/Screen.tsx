import { Html } from "@react-three/drei"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import type { CalcType } from "./CubeProvider"

const Screen = ({ calc }: { calc: CalcType }) => {
    return (
        <Html
            position={[-6, 1.43, 0]}
            rotation={[-Math.PI * 0.5, 0, Math.PI * 0.5]}
            transform
            zIndexRange={[0]}
        >
            <div className="w-[17.75rem] h-[5.45rem] bg-black flex justify-center items-center select-none">
                <motion.div
                    variants={{
                        show: {
                            scaleX: 1,
                            transition: {
                                ease: 'easeOut',
                                duration: 1.9
                            }
                        },
                        hidden: {
                            scaleX: 0,
                            transition: {
                                ease: 'easeOut',
                                duration: 1.9
                            }
                        }
                    }}
                    animate={calc.power ? 'show' : 'hidden'}
                    initial='show'
                    className="w-[16.25rem] h-[3.95rem] bg-gray-900 gap-2 flex justify-between items-end rounded-sm"
                >
                    <div className="w-7 h-7 bg-orange-300 flex justify-center items-center rounded-sm">
                        <h1 className="text-black">{calc.operator}</h1>
                    </div>
                    <div className="flex flex-col justify-center items-end h-full w-full overflow-x-auto">
                        <div className="h-1/2 flex items-center justify-end">
                            <h1 className="text-[15px] text-gray-200 font-medium mr-1">{calc.prevOperand}</h1>
                        </div>
                        <div className="h-1/2 flex items-center justify-end flex-wrap">
                            {
                                calc.currentOperand === ''
                                    ? <Cursor />
                                    : <h1 className="text-[20px] text-white font-semibold mr-1">{calc.currentOperand}</h1>
                            }
                        </div>
                    </div>
                </motion.div>
            </div>
        </Html>
    )
}

const Cursor = () => {
    const [isVisible, setIsVisible] = useState(true)
    useEffect(() => {
        const intervalId = setInterval(() => {
            setIsVisible((prev) => !prev)
        }, 750)
        return () => clearInterval(intervalId)
    }, [])
    return (
        <div className={`${isVisible ? 'opacity-1' : 'opacity-0'} bg-white w-3 h-5 mr-2`} />
    )
}

export default Screen