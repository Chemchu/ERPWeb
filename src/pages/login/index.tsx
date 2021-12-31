import { motion } from 'framer-motion';
import React from 'react';
import { SplitLetters } from '../../components/compAnimados/SplitText';
import Router, { useRouter } from 'next/router';
import { getCsrfToken, useSession } from "next-auth/react"
import { CtxOrReq } from 'next-auth/client/_utils';

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

const exitVariant = {
    initial: {
        x: "0vw",
        opacity: 0,
    },
    animate: {
        x: "0vw",
        opacity: 1,
        transition: {
            duration: 1.5,
            ease: [0.87, 0, 0.13, 1],
        },
    },
    exit: {
        y: '-100vh',
        opacity: 0,
        transition: {
            ease: [0.87, 0, 0.13, 1],
            duration: 1
        }
    },
}

const LoginPage = (props: { video: string, csrfToken: string }) => {
    const { status } = useSession();
    const router = useRouter();

    if (status === "authenticated") {
        router.push('/dashboard');
    }

    if (!props.csrfToken) {
        router.push('/');
    }

    return (
        <motion.div className="bg-white w-full h-full items-center font-sans" initial={exitVariant.initial} animate={exitVariant.animate} exit={exitVariant.exit} variants={exitVariant} >
            <video autoPlay loop muted className='w-full h-full object-cover fixed -z-10'>
                <source src={props.video} type="video/mp4" />
            </video>
            <LoginForm csrfToken={props.csrfToken} />
        </motion.div >
    );
}

export const LoginForm = (props: { csrfToken: string }) => {
    const Volver = () => {
        Router.push('/');
    }

    return (
        <motion.div className={`inset-0 flex items-center min-h-screen bg-no-repeat bg-top justify-center sm:py-12 bg-cover`}
            variants={exitVariant} initial={exitVariant.initial} animate={exitVariant.animate} >
            <motion.div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md" animate="visible" initial="hidden" variants={container}>
                <div className="bg-white shadow w-full rounded-lg divide-y divide-gray-200" >
                    <div className="px-5 py-7">
                        <motion.h1 className="font-bold text-center text-2xl mb-5" variants={item}>
                            <SplitLetters initial={{ y: '100%', rotate: 90, }} animate="visible" variants={{ visible: (i: number) => ({ rotate: 0, y: 0, transition: { delay: (2.8) + (i * 0.1) } }) }}>
                                ERPWeb
                            </SplitLetters>
                        </motion.h1>

                        <form method="post" action="/api/auth/callback/credentials">
                            <input name="csrfToken" type="hidden" defaultValue={props.csrfToken} />

                            <motion.div variants={item}>
                                <motion.label animate={{ color: '#111' }} className="font-semibold text-sm text-gray-600 pb-1 block">Dirección de correo</motion.label>
                                <motion.input animate={{ borderColor: '#ddd', color: '#111' }} name="email" type="text"
                                    className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" />
                            </motion.div>

                            <motion.div variants={item}>
                                <motion.label animate={{ color: '#111' }} className="font-semibold text-sm text-gray-600 pb-1 block">Contraseña</motion.label>
                                <motion.input animate={{ borderColor: '#ddd', color: '#111' }} name="password" type="password"
                                    className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" />
                            </motion.div>

                            <motion.div variants={item}>
                                <button type="submit" className="mb-1 transition duration-200 bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block">
                                    <span className="inline-block mr-2">Acceder</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 inline-block">
                                        <path strokeLinecap="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </button>
                            </motion.div>
                        </form>

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
    );
}

export async function getServerSideProps(context: CtxOrReq) {
    const csrf = await getCsrfToken(context);

    return {
        props: {
            video: `/video/marketVideo-${Math.floor(Math.random() * 5)}.mp4`,
            csrfToken: csrf,
        },
    }
}

export default LoginPage;