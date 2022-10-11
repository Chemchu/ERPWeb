import type { NextPage } from 'next'
import { motion } from 'framer-motion';
import React from 'react';
import { SplitLetters, SplitWords } from '../components/elementos/compAnimados/SplitText';
import { useRouter } from 'next/router';

const Home: NextPage = () => {
    const router = useRouter();

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { duration: 1.5 } }} exit={{ opacity: 0, transition: { duration: 1 } }}
            className="bg-no-repeat flex flex-col justify-start relative overflow-hidden h-screen bg-landing2 bg-cover bg-center">
            <header className="flex justify-center w-full h-auto">
                <button onClick={() => { router.push('/login') }}
                    className="hover:scale-110 ease-in-out duration-150">
                    <motion.a initial={{ opacity: 1 }} animate={{ opacity: 1 }}
                        whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }} className="text-lg uppercase mx-3 text-white cursor-pointer hover:text-gray-300">
                        <SplitWords initial={{ y: '100%', rotate: 90, }} animate="visible" variants={{ visible: (i: number) => ({ rotate: 0, y: 0, transition: { delay: 0.95 + (i * 0.1) } }) }} >
                            Iniciar sesión
                        </SplitWords>
                    </motion.a>
                </button>
            </header>
            <h1 className="flex justify-center items-center h-full font-extrabold text-7xl text-center sm:text-8xl text-white leading-tight">
                <SplitLetters initial={{ y: '100%', rotate: 90 }} animate="visible"
                    variants={{ visible: (i: number) => ({ rotate: 0, y: 0, transition: { delay: 1.15 + (i * 0.1) } }) }}>
                    ERPWeb
                </SplitLetters>
            </h1>
        </motion.div >
    );
}

export default Home
