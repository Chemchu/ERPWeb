import { AnimatePresence, motion } from "framer-motion";
import React, { useRef, useState } from "react";
import { SplitLetters } from "../../components/elementos/compAnimados/SplitText";
import Router from "next/router";
import { GetServerSideProps } from "next";
import getJwtFromString from "../../hooks/jwt";

const container = {
  hidden: { opacity: 0, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delay: 1.5,
      delayChildren: 1.8,
      staggerChildren: 0.2,
      staggerDirection: -1,
    },
  },
};

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

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
    y: "-100vh",
    opacity: 0,
    transition: {
      ease: [0.87, 0, 0.13, 1],
      duration: 1,
    },
  },
};

const LoginPage = (props: { video: string }) => {
  return (
    <motion.div
      className="bg-white w-full h-full items-center font-sans"
      initial={exitVariant.initial}
      animate={exitVariant.animate}
      exit={exitVariant.exit}
      variants={exitVariant}
    >
      <video autoPlay loop muted className="w-full h-full object-cover fixed -z-10">
        <source src={props.video} type="video/mp4" />
      </video>
      <LoginForm />
    </motion.div>
  );
};

export const LoginForm = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [loginFallido, setLoginFallido] = useState<boolean>(false);

  const Volver = () => {
    Router.push("/");
  };

  const Authenticate = async () => {
    setLoading(true);
    const loginFetch = await fetch(`/api/login`, {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({
        email: emailRef.current?.value,
        password: passwordRef.current?.value,
      }),
    });

    const loginJson = await loginFetch.json();
    if (loginJson.successful) {
      return Router.push("/dashboard");
    }

    setLoading(false);
    setLoginFallido(true);
  };

  return (
    <motion.div
      className={`inset-0 flex items-center min-h-screen bg-no-repeat bg-top justify-center sm:py-12 bg-cover`}
      variants={exitVariant}
      initial={exitVariant.initial}
      animate={exitVariant.animate}
    >
      <motion.div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md" animate="visible" initial="hidden">
        <motion.div
          animate={loginFallido ? { rotate: [-2, 1.9, -0.87, 1.1, -0.5, 0.5, 0] } : { rotate: 0 }}
          variants={container}
          className="bg-white shadow w-full rounded-xl divide-y divide-gray-200"
        >
          <div className="p-5">
            <motion.h1 className="font-bold text-center text-2xl mb-5" variants={item}>
              <SplitLetters
                initial={{ y: "100%", rotate: 90 }}
                animate="visible"
                variants={{
                  visible: (i: number) => ({
                    rotate: 0,
                    y: 0,
                    transition: { delay: 2.8 + i * 0.1 },
                  }),
                }}
              >
                ERPWeb
              </SplitLetters>
            </motion.h1>

            <motion.div className="flex flex-col">
              <motion.div variants={item}>
                <label className="font-semibold text-sm text-black pb-1 block">Correo electrónico</label>
                <input
                  name="email"
                  type="text"
                  ref={emailRef}
                  onChange={() => {
                    setLoginFallido(false);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      Authenticate();
                    }
                  }}
                  className={`border border-gray-400 rounded-xl px-3 py-2 mt-1 mb-5 text-sm w-full ${
                    loginFallido ? `outline-red-500 border-red-500 border-2` : `outline-blue-500`
                  } `}
                />
              </motion.div>

              <motion.div variants={item}>
                <label className="font-semibold text-sm text-black pb-1 block">Contraseña</label>
                <input
                  name="password"
                  type="password"
                  ref={passwordRef}
                  onChange={() => {
                    setLoginFallido(false);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      Authenticate();
                    }
                  }}
                  className={`border border-gray-400 rounded-xl px-3 py-2 mt-1 mb-5 text-sm w-full
                                        ${
                                          loginFallido ? `outline-red-500 border-red-500 border-2` : `outline-blue-500`
                                        } `}
                />
              </motion.div>

              <motion.div variants={item}>
                <button
                  className="mb-1 transition duration-200 bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 
                                    focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white 
                                    w-full py-2.5 rounded-xl text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
                  onClick={() => {
                    Authenticate();
                  }}
                >
                  <span className="inline-block mr-2">Acceder</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-4 h-4 inline-block"
                  >
                    <path strokeLinecap="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </motion.div>
            </motion.div>

            <motion.div variants={item}>
              <button
                onClick={Volver}
                className="transition duration-200 py-2.5 cursor-pointer font-normal text-sm rounded-xl text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:bg-red-700 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 w-full ring-inset"
              >
                <span className="inline-block mr-2">Volver</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-4 h-4 inline-block"
                >
                  <path strokeLinecap="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </button>
            </motion.div>
          </div>
        </motion.div>
        <AnimatePresence>
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center justify-center bg-white shadow w-full h-10 rounded-xl divide-y divide-gray-200 mt-2"
            >
              Iniciando sesión...
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const [, isValidCookie] = getJwtFromString(context.req.cookies.authorization);

  if (isValidCookie) {
    return {
      redirect: {
        permanent: false,
        destination: `/dashboard`,
      },
    };
  }

  return {
    props: {
      video: `/video/marketVideo-0.mp4`,
    },
  };
};

export default LoginPage;
