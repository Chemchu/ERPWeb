import type { NextPage } from 'next'
import { motion } from 'framer-motion';
import React from 'react';
import { SplitLetters, SplitWords } from '../components/elementos/compAnimados/SplitText';
import { useRouter } from 'next/router';

const Home: NextPage = () => {
    const router = useRouter();

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { duration: 1.5 } }} exit={{ opacity: 0, transition: { duration: 1 } }}
            className="min-h-screen bg-no-repeat flex flex-col justify-center sm:py-12 relative overflow-hidden h-screen bg-landing1 bg-cover bg-center">
            <header className="absolute top-0 left-0 right-0 z-20">
                <nav className="container mx-auto px-6 md:px-12 py-4">
                    <div className="md:flex justify-center items-center">
                        <div className="flex justify-between items-center">
                            <div className="md:hidden">
                                <button className="text-white focus:outline-none">
                                    <svg className="h-12 w-12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M4 6H20M4 12H20M4 18H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        </path>
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div className="hidden md:flex items-center">
                            <button onClick={() => { router.push('/login') }}>
                                <motion.a initial={{ opacity: 1 }} animate={{ opacity: 1 }}
                                    whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }} className="text-lg uppercase mx-3 text-white cursor-pointer hover:text-gray-300">
                                    <SplitWords initial={{ y: '100%', rotate: 90, }} animate="visible" variants={{ visible: (i: number) => ({ rotate: 0, y: 0, transition: { delay: 0.95 + (i * 0.1) } }) }} >
                                        Iniciar sesión
                                    </SplitWords>
                                </motion.a>
                            </button>
                        </div>
                    </div>
                </nav>
            </header>
            <div className="container mx-auto px-6 md:px-12 relative z-10 flex items-center py-32 xl:py-40">
                <div className="w-full flex flex-col items-center relative z-10">
                    <h1 className="font-extrabold text-7xl text-center sm:text-8xl text-white leading-tight mt-4">
                        <SplitLetters initial={{ y: '100%', rotate: 90 }} animate="visible" variants={{ visible: (i: number) => ({ rotate: 0, y: 0, transition: { delay: 1.15 + (i * 0.1) } }) }}>
                            ERPWeb
                        </SplitLetters>
                    </h1>
                    <motion.a className="block bg-gray-800 hover:bg-gray-900 py-3 px-4 text-lg text-white font-bold uppercase mt-10" whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }}>
                        Contáctanos
                    </motion.a>
                </div>
            </div>
        </motion.div >
    );
}

export default Home
