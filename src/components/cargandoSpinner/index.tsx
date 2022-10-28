const CargandoSpinner = (props?: { mensaje?: string }) => {
  return (
    <div className="flex flex-col justify-center items-center gap-2">
      <div>
        <div className="border-t-transparent w-16 h-16 border-4 border-blue-400 border-solid rounded-full animate-spin"></div>
      </div>
      <p className="text-xl">{props?.mensaje || "Cargando..."}</p>
    </div>
  );
};

export default CargandoSpinner;
