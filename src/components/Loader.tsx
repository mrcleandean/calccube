import { ImSpinner2 } from "react-icons/im";
import { AnimatePresence, motion } from 'framer-motion';
import { Dispatch, SetStateAction } from "react";

export type LoaderPropTypes = {
    loaded: boolean;
    entered: boolean;
    setEntered: Dispatch<SetStateAction<boolean>>;
    letters: string[];
    subTitle?: string | null
}

const TitleSpan = ({ char, i, length }: { char: string, i: number, length: number }) => {
    const animationDuration = 2 * 1.75;
    const mergeFactor = 0.06 * 1.75;
    const totalAnimationTime = length * animationDuration * mergeFactor;
    return (
        <>
            {
                char === ' '
                    ? <div className="w-[3.2vw]" />
                    : (
                        <motion.span
                            variants={{
                                animate: {
                                    scale: [1, 1.2, 0.95, 1],
                                    rotate: [0, 2, -2, 0],
                                    color: ['rgb(255, 255, 255)', 'rgb(191, 219, 254)', 'rgb(255, 255, 255)'],
                                    transition: {
                                        delay: i * animationDuration * mergeFactor,
                                        duration: animationDuration,
                                        ease: "linear",
                                        repeat: Infinity,
                                        repeatDelay: totalAnimationTime - animationDuration
                                    }
                                }
                            }}
                            animate="animate"
                            className="select-none cursor-default"
                        >
                            {char}
                        </motion.span>
                    )
            }
        </>
    )
}

const Loader = ({ loaded, entered, setEntered, letters, subTitle = null }: LoaderPropTypes) => {
    let adjustedLetterIndex = 0;

    return (
        <>
            <AnimatePresence>
                {!entered && (
                    <motion.div
                        initial={{ opacity: 1, left: 0 }}
                        exit={{ opacity: 0, left: '-105%' }}
                        transition={{
                            opacity: { duration: 1.2, ease: "easeOut" },
                            left: { duration: 0.6, ease: "easeOut" },
                        }}
                        className='bg-loader overscroll-none w-screen h-screen fixed z-50 top-0 left-0 flex justify-center items-center'
                    >
                        <div className="w-screen h-screen max-h-[25rem] flex justify-evenly items-center flex-col">
                            <div className="flex justify-center items-center flex-col">
                                <h1 className="text-[11.5vw] text-white font-extrabold flex">
                                    {letters.map((char, i) => {
                                        if (char === ' ') adjustedLetterIndex++;
                                        return <TitleSpan
                                            key={`loading-span-${i}`}
                                            i={i - adjustedLetterIndex} char={char}
                                            length={letters.length}
                                        />
                                    })}
                                </h1>
                                {subTitle && <h1 className="text-white font-semibold text-[2.5vw]">
                                    <i>{subTitle}</i>
                                </h1>}
                            </div>

                            {
                                !loaded
                                    ? (
                                        <div className="flex justify-center items-center flex-col">
                                            <AnimatePresence>
                                                <motion.div
                                                    variants={{
                                                        animate: {
                                                            rotate: 360,
                                                            transition: {
                                                                duration: 1,  // Duration of one rotation
                                                                ease: "linear",  // Linear easing for constant speed
                                                                repeat: Infinity,  // Repeat the animation indefinitely
                                                            },
                                                        }
                                                    }}
                                                    animate="animate"
                                                >
                                                    <ImSpinner2 color={"rgb(191, 219, 254)"} size={45} />
                                                </motion.div>
                                            </AnimatePresence>
                                            <h1 className="text-[13px] mt-2 text-white">Loading assets...</h1>
                                        </div>
                                    )
                                    : (
                                        <AnimatePresence>
                                            <motion.div
                                                onClick={() => setEntered(true)}
                                                className='border-white border-2 p-5 transition-all hover:scale-105 cursor-pointer rounded-lg relative'
                                            >
                                                <div className="absolute inset-0 border-transparent border-[1px] hover:border-white hover:scale-x-[1.35] hover:scale-y-150 transition-all rounded-lg"></div>
                                                <h1 className="text-white text-2xl">Enter</h1>
                                            </motion.div>
                                        </AnimatePresence>
                                    )
                            }
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}

export default Loader