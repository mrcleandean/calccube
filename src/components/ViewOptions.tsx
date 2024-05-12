import useCubeContext from "../hooks/useCubeContext";
import { useRef } from "react";
import { Vector3 } from "three";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { VIEW_1, VIEW_2, VIEW_3 } from "../constants";
import Button from "./Button";

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
                <Button
                    onClick={() => camAnim(VIEW_1)}
                    text='View 1'
                />
                <Button
                    onClick={() => camAnim(VIEW_2)}
                    text="View 2"
                />
                <Button
                    onClick={() => camAnim(VIEW_3)}
                    text="View 3"
                />
            </div>
        </div>
    )
}



export default ViewOptions;