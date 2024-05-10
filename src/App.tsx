import { Canvas } from "@react-three/fiber"
import Calculator from './components/Calculator';
import { useState, useEffect } from "react";
import SpinningBackground from "./components/SpinningBackground";
import LocalLoader from "./components/LocalLoader";
import Loader from "./components/Loader";
import useMeasure from "react-use-measure";
import useCubeContext from "./hooks/useCubeContext";
import { useGSAP } from '@gsap/react';
import gsap from "gsap";
import ViewOptions from "./components/ViewOptions";
import { VIEW_3 } from "./constants";

gsap.registerPlugin(useGSAP);

const CalcCube = () => {
  const { setWidth, setHeight, gsapRef } = useCubeContext();
  const [loaded, setLoaded] = useState(false);
  const [entered, setEntered] = useState(false);
  const [ref, { width, height }] = useMeasure();


  const { contextSafe } = useGSAP({ scope: gsapRef });

  useEffect(() => {
    setWidth(width);
    setHeight(height);
  }, [width, height, contextSafe]);

  return (
    <>
      <div ref={ref} className="w-full h-screen flex justify-center items-center relative overflow-hidden">
        <SpinningBackground />
        <div ref={gsapRef} className="w-full h-full">
          <ViewOptions />
          <Canvas camera={{
            position: [
              VIEW_3.camPos.x,
              VIEW_3.camPos.y,
              VIEW_3.camPos.z
            ]
          }}>
            <Calculator />
          </Canvas>
        </div>
        <LocalLoader setLoaded={setLoaded} />
      </div>
      <Loader
        loaded={loaded}
        entered={entered}
        setEntered={setEntered}
        letters={['C', 'A', 'L', 'C', ' ', 'C', 'U', 'B', 'E']}
        subTitle={'Ideal on Desktop'}
      />
    </>
  )
}



export default CalcCube