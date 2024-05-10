import { createContext, useContext, type SetStateAction, type Dispatch, type MutableRefObject } from "react";
import type { CalcType } from "../components/CubeProvider";
import type { Camera } from "@react-three/fiber";

export type CameraType = Camera & {
    manual?: boolean | undefined;
}

export type CubeContextType = {
    calc: CalcType,
    setCalc: Dispatch<SetStateAction<CalcType>>
    camera: CameraType | null,
    setCamera: Dispatch<SetStateAction<CameraType | null>>
    width: number,
    setWidth: Dispatch<SetStateAction<number>>
    height: number,
    setHeight: Dispatch<SetStateAction<number>>
    gsapRef: MutableRefObject<HTMLDivElement | null>
}

export const CubeContext = createContext<CubeContextType | undefined>(undefined);

const useCubeContext = () => {
    const context = useContext(CubeContext);
    if (!context) {
        throw new Error('useCubeContext must be used within a CubeProvider');
    }
    return context;
}

export default useCubeContext;