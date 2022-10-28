import Head from "next/head";

const Fallback = () => (
  <>
    <Head>
      <title>ERPWeb PWA</title>
    </Head>
    <main className="h-screen w-full flex flex-col justify-center items-center bg-blue-800">
      <h1 className="text-6xl md:text-8xl font-extrabold text-white tracking-widest">Offline</h1>
      <div className="bg-orange-600 px-2 md:px-3 text-sm md:text-base rounded rotate-12 md:-rotate-12 absolute">
        No tienes conexión
      </div>
    </main>
  </>
);

export default Fallback;
