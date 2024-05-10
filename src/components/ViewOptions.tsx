import useCubeContext from "../hooks/useCubeContext";
import { useRef } from "react";
import { Vector3 } from "three";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { VIEW_1, VIEW_2, VIEW_3 } from "../constants";

export type ObjVectorType = {
    x: number;
    y: number;
    z: number;
}

const ViewOptions = () => {
    const { camera, gsapRef } = useCubeContext();
    const lookAtVector = useRef<Vector3>(new Vector3(0, 0, 0));
    const { contextSafe } = useGSAP({ scope: gsapRef });
    const camAnim = contextSafe(({ camPos, camVec }: { camPos: ObjVectorType; camVec: ObjVectorType }) => {
        if (camera === null) return
        gsap
            .timeline()
            .to(lookAtVector.current, {
                onUpdate: () => camera?.lookAt(lookAtVector.current),
                overwrite: 'auto',
                ease: 'elastic.out(1,0.75)',
                duration: 2,
                x: camVec.x,
                y: camVec.y,
                z: camVec.z
            })
            .to(camera.position, {
                overwrite: 'auto',
                ease: 'elastic.out(1,0.75)',
                duration: 2,
                x: camPos.x,
                y: camPos.y,
                z: camPos.z
            }, '<')
    });
    return (
        <div className="absolute top-3 left-3 flex justify-center items-start gap-3 flex-col z-[1]">
            <div className="flex gap-2 items-center justify-center select-none">
                <button onClick={() => camAnim(VIEW_1)} className="bg-white border-none py-0.5 px-1.5 rounded-xl text-black cursor-pointer">View 1</button>
                <button onClick={() => camAnim(VIEW_2)} className="bg-white border-none py-0.5 px-1.5 rounded-xl text-black cursor-pointer">View 2</button>
                <button onClick={() => camAnim(VIEW_3)} className="bg-white border-none py-0.5 px-1.5 rounded-xl text-black cursor-pointer">View 3</button>
            </div>
        </div>
    )
}

export default ViewOptions;