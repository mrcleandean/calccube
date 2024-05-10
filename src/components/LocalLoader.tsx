import { useProgress } from "@react-three/drei";
import { type Dispatch, type SetStateAction, useEffect } from "react";

const LocalLoader = ({ setLoaded }: { setLoaded: Dispatch<SetStateAction<boolean>> }) => {
    const state = useProgress();
    useEffect(() => {
        if (state.progress === 100) {
            setLoaded(true);
        }
    }, [state]);
    return null;
}

export default LocalLoader;