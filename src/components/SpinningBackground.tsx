import useCubeContext from "../hooks/useCubeContext";

const SpinningBackground = () => {
    const { width, height } = useCubeContext();
    const bgDem = Math.sqrt(width ** 2 + height ** 2); // ensures that the sqaure always just barely covers the entire screen when rotating
    return <div className="absolute bg-gradient-to-tr from-[#A9F1DF] to-[#FFBBBB] animate-calc-cube" style={{ width: bgDem, height: bgDem }} />
}

export default SpinningBackground;