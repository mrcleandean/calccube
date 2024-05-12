import Screen from "../components/Screen";
import useCubeContext from "../hooks/useCubeContext";
import Behaviour from "../utils/behaviour";
import { useEffect, useMemo, type PointerEvent } from "react";
import { Color, MeshBasicMaterial, Mesh, type Scene } from "three";
import { useGLTF, useTexture } from "@react-three/drei";
import gsap from "gsap"
import { useGSAP } from "@gsap/react";
import { useThree } from "@react-three/fiber";
import { KEY_MAPPINGS, VOLUME_MULTIPLIER } from "../constants";
import glb from '../assets/calculator.glb';
import keypress from '../assets/keypress.mp3';
import withSymbols from "../assets/with-symbols.jpg";

export type KeyMapKeysType = keyof typeof KEY_MAPPINGS;

export type GLTFType = {
    nodes: {
        [key in KeyMapKeysType]: Mesh;
    }
    scene: Scene;
}

export type NodeKeyMapType = {
    [key in KeyMapKeysType]: Mesh
} & {
    [key: string]: Mesh | undefined;
}

const Calculator = () => {
    const { calc, setCalc, setCamera, gsapRef } = useCubeContext();
    const { contextSafe } = useGSAP({ scope: gsapRef });
    const { camera } = useThree();
    const { nodes, scene } = useGLTF(glb) as unknown as GLTFType;

    const map = useTexture(withSymbols);
    map.flipY = false;

    const behaviour = useMemo(() => new Behaviour(), []);
    const audio = useMemo(() => {
        const click = new Audio(keypress)
        click.volume = VOLUME_MULTIPLIER;
        return click;
    }, []);

    const nodeKeyMap: NodeKeyMapType = useMemo(() => {
        const map: Partial<NodeKeyMapType> = {};
        Object.keys(KEY_MAPPINGS).forEach(key => {
            const typedKey = key as keyof typeof KEY_MAPPINGS;
            const typedValue = KEY_MAPPINGS[typedKey];
            if (typedValue in nodes) {
                map[typedKey] = nodes[typedValue as keyof typeof nodes];
            }
        });
        return map as NodeKeyMapType;
    }, [nodes]);

    const click = (e: PointerEvent & { object: Mesh }) => {
        e.stopPropagation()
        const node = e.object
        if (node.name === 'Case' || node.name === 'Display') return
        animate(node)
        behaviour.runOperation(node, calc, setCalc)
    }

    const animate = contextSafe((node: Mesh) => {
        audio.currentTime = 0
        audio.play();
        gsap
            .timeline()
            .to(node.position, { duration: 0.1, y: -0.35, ease: 'power3.inOut' })
            .to(node.position, { duration: 0.125, y: 0, ease: 'power3.inOut' });
    })

    useEffect(() => {
        setCamera(camera);
    }, [camera]);

    useEffect(() => {
        const color = new Color(0.57, 0.53, 0.53);
        const mat = new MeshBasicMaterial({ map, color });
        scene.traverse(node => {
            if (node instanceof Mesh && node.isMesh) node.material = mat;
        })
    }, [map]);

    useEffect(() => {
        const press = (e: KeyboardEvent) => {
            const node = nodeKeyMap[e.key]
            if (!node) return
            animate(node)
            behaviour.runOperation(node, calc, setCalc)
        }
        window.addEventListener('keydown', press);
        return () => {
            window.removeEventListener('keydown', press);
        }
    }, [calc, setCalc]);

    // This above effect is neccesary because we have no element to attach the listener to in JSX,
    // and the document.addEventListener only stores the initial state of calc, so we need to update
    // it's callback whenever calc changes.

    return (
        <>
            <Screen calc={calc} />
            <primitive
                object={scene}
                rotation={[0, Math.PI, 0]}
                position={[0, 0, 0]}
                onPointerDown={click}
            />
        </>
    )
}

export default Calculator;