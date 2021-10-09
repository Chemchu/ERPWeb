import { motion } from 'framer-motion';
import { useState } from 'react';
import { axios } from 'axios';
import { useHistory  } from 'react-router-dom';
import LandingPage from '../landingPage/landingPage';

const container = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            delay: 1.5,
            delayChildren: 1.8,
            staggerChildren: 0.2,
            staggerDirection: -1
        }
    }
}    
const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1
    }
}

const exitVariant= {
    initial: {
        x: "-100vw",
        
      },
      animate: {
        x: "0vw",
        transition: {
          duration: 1.5,
          ease: [0.87, 0, 0.13, 1],
        },
      },
      exit: {
        y: '-100vh',
        transition:{ 
            ease: [0.87, 0, 0.13, 1], 
            duration: 1
        }
    },
}

// Se elige 6 como maximo y 1 como minimo porq hay 5 fotos diferentes de bg (6 exclusivo)
const randomBg =  "bg-supermarket" + Math.floor(Math.random() * (6 - 1) + 1).toString();

function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();
    
    function Acceder(e) {
        const loginPostConfig = {
            method: 'post',
            url: 'https://localhost:8080/api/login',
            data: {
                FirstName: username,
                PassWord: password
            }
        }

        history.push('/perfil');
        
        // Petición login
        //   axios.post(loginPostConfig).then(
        //     (autorizado) => {
        //       if(autorizado) {
        //         // Redireccionar menu principal
        //       }
        //       else {
        //         // Pop up login fallido
        //       }
        //     }
        //   );

    }

    function Volver(e) {
        history.push('/');
    }   

    return(
        // 
        <motion.div className="bg-black w-full h-full items-center " exit={exitVariant.exit} variants={exitVariant} >
            <motion.div className= {`inset-0 flex items-center min-h-screen bg-no-repeat bg-top justify-center sm:py-12 bg-cover ${randomBg}`} 
                variants={exitVariant} initial={ exitVariant.initial } animate={exitVariant.animate} > 
                {/* <InitTransition color="bg-black" shouldExpand={false}/> */}
                <motion.div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md" animate="visible" initial="hidden" variants={container}>
                    <div className="bg-white shadow w-full rounded-lg divide-y divide-gray-200" >
                        <div className="px-5 py-7">
                            <motion.h1 className="font-bold text-center text-2xl mb-5" variants={item}>ERPWeb</motion.h1>  

                            <motion.div variants={item}>
                                <label className="font-semibold text-sm text-gray-600 pb-1 block">Dirección de correo</label>
                                <input type="text" className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" onChange={(e) => setUsername(e.target.value)} />
                            </motion.div>
                            
                            <motion.div variants={item}>
                                <label className="font-semibold text-sm text-gray-600 pb-1 block">Contraseña</label>
                                <input type="text" className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" onChange={(e) => setPassword(e.target.value)}/>
                            </motion.div>
                            
                            <motion.div variants={item}>
                                <button type="button" onClick={Acceder} className="mb-1 transition duration-200 bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block">
                                    <span className="inline-block mr-2">Acceder</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 inline-block">
                                        <path strokeLinecap="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </button>
                            </motion.div>

                            <motion.div variants={item}>
                                <button onClick={Volver} className="transition duration-200 py-2.5 cursor-pointer font-normal text-sm rounded-lg text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:bg-red-700 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 w-full ring-inset">
                                    <span className="inline-block mr-2">Volver</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 inline-block">
                                        <path strokeLinecap="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                    </svg>
                                </button>
                            </motion.div>
                        </div>
                        <div className="py-3">
                            <motion.div className="grid grid-cols-2 gap-1" variants={item}>
                                <div className="text-center sm:text-left whitespace-nowrap">
                                    <button className="transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-200 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 inline-block align-text-top">
                                            <path strokeLinecap="round" strokeWidth="2" d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
                                        </svg>
                                        <span className="inline-block ml-1">He olvidado mi contraseña</span>
                                    </button>
                                </div>
                                <div className="text-center sm:text-right whitespace-nowrap">
                                    <button className="transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-200 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 inline-block align-text-bottom	">
                                            <path strokeLinecap="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                                        </svg>
                                        <span className="inline-block ml-1">Ayuda</span>
                                    </button>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </motion.div>
        
    );
}

export default LoginPage;