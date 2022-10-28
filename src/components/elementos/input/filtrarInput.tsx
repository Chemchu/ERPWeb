const FiltrarInput = (props: {
  filtro: string;
  setFiltro: React.Dispatch<React.SetStateAction<string>>;
  FiltrarCallback: Function;
}) => {
  return (
    <>
      <input
        className="rounded-lg border appearance-none shadow-lg w-44 xl:w-96 h-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
        placeholder="Buscar..."
        onChange={(e) => {
          props.setFiltro(() => e.target.value);
        }}
        onKeyPress={async (e) => {
          e.key === "Enter" && (await props.FiltrarCallback());
        }}
      />

      {props.filtro ? (
        <button
          className="px-4 py-2 font-semibold text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-purple-200"
          onClick={async (e) => {
            e.preventDefault();
            await props.FiltrarCallback();
          }}
        >
          Filtrar
        </button>
      ) : (
        <button disabled className="px-4 py-2 font-semibold text-white bg-blue-300 rounded-lg shadow-md cursor-default">
          Filtrar
        </button>
      )}
    </>
  );
};

export default FiltrarInput;
