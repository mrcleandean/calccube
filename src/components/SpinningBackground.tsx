import useCubeContext from "../hooks/useCubeContext";

const SpinningBackground = () => {
    const { width, height } = useCubeContext();
    const bgDem = Math.sqrt(width ** 2 + height ** 2);
    return <div className="absolute bg-gradient-to-tr from-[#0bd1ff] via-[#ffa3ff] to-[#ffd34e] animate-calc-cube" style={{ width: bgDem, height: bgDem }} />
}

export default SpinningBackground;