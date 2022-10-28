export const Paginador = (props: {
  numPages: number;
  paginaActual: number;
  cambiarPaginaActual: Function;
  maxPages: number;
}) => {
  const offset =
    props.paginaActual > Math.ceil(props.maxPages / 2) + 1
      ? props.paginaActual - (Math.ceil(props.maxPages / 2) + 1)
      : 0;
  const numBtns = [...Array.from(Array(props.numPages).keys())];
  const sliceLength = numBtns.slice(offset, offset + props.maxPages).length;

  return (
    <div className="flex items-center">
      <button
        className="w-full p-3 sm:p-4 border text-base rounded-l-xl text-gray-600 bg-white hover:bg-gray-100"
        onClick={() => {
          props.cambiarPaginaActual(props.paginaActual - 1);
        }}
      >
        <svg
          width="9"
          fill="currentColor"
          height="8"
          className=""
          viewBox="0 0 1792 1792"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M1427 301l-531 531 531 531q19 19 19 45t-19 45l-166 166q-19 19-45 19t-45-19l-742-742q-19-19-19-45t19-45l742-742q19-19 45-19t45 19l166 166q19 19 19 45t-19 45z"></path>
        </svg>
      </button>
      {sliceLength < props.maxPages
        ? numBtns.slice(props.numPages - props.maxPages, props.numPages).map((n) => {
            return (
              <button
                key={`paginador${n}`}
                className={`w-full px-3 py-1 sm:px-4 sm:py-2 border-t border-b text-base ${
                  n + 1 == props.paginaActual
                    ? "text-blue-700 font-semibold bg-gray-200"
                    : "text-gray-600 hover:bg-gray-100 bg-white"
                }`}
                onClick={() => {
                  props.cambiarPaginaActual(n + 1);
                }}
              >
                {n + 1}
              </button>
            );
          })
        : numBtns.slice(offset, offset + props.maxPages).map((n) => {
            return (
              <button
                key={`paginador${n}`}
                className={`w-full px-3 py-1 sm:px-4 sm:py-2 border-t border-b text-base ${
                  n + 1 == props.paginaActual
                    ? "text-blue-700 font-semibold bg-gray-200"
                    : "text-gray-600 hover:bg-gray-100 bg-white"
                }`}
                onClick={() => {
                  props.cambiarPaginaActual(n + 1);
                }}
              >
                {n + 1}
              </button>
            );
          })}

      <button
        className="w-full p-3 sm:p-4 border text-base rounded-r-xl text-gray-600 bg-white hover:bg-gray-100"
        onClick={() => {
          props.cambiarPaginaActual(props.paginaActual + 1);
        }}
      >
        <svg
          width="9"
          fill="currentColor"
          height="8"
          className=""
          viewBox="0 0 1792 1792"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M1363 877l-742 742q-19 19-45 19t-45-19l-166-166q-19-19-19-45t19-45l531-531-531-531q-19-19-19-45t19-45l166-166q19-19 45-19t45 19l742 742q19 19 19 45t-19 45z"></path>
        </svg>
      </button>
    </div>
  );
};
