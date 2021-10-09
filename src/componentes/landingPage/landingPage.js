import { motion } from 'framer-motion';
import { useHistory } from 'react-router-dom';
import {TransitionExit} from '../compAnimados/Transition.js'
import { useState } from 'react';

function LandingPage() {
  const history = useHistory();

  return (    
    <div className="relative overflow-hidden h-screen bg-landing1 bg-cover bg-center">
        <TransitionExit color="bg-black" />
        <motion.div></motion.div>
        <div className="inset-0 bg-black opacity-25 absolute">
        </div>
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
                        <motion.a whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }} className="text-lg uppercase mx-3 text-white cursor-pointer hover:text-gray-300" onClick={() => { history.push("/login")}}>
                            Iniciar sesión
                        </motion.a>
                    </div>
                </div>
            </nav>
        </header>
        <div className="container mx-auto px-6 md:px-12 relative z-10 flex items-center py-32 xl:py-40">
            <div className="w-full flex flex-col items-center relative z-10">
                <h1 className="font-extrabold text-7xl text-center sm:text-8xl text-white leading-tight mt-4">
                    ERPWeb
                </h1>
                <motion.a href="#" className="block bg-gray-800 hover:bg-gray-900 py-3 px-4 text-lg text-white font-bold uppercase mt-10" whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }}>
                    Contáctanos
                </motion.a>
            </div>
        </div>
    </div>
  );

}

export default LandingPage;
