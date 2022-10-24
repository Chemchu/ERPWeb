const NuevoBoton = (props: { accionEvent: Function }) => {
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        props.accionEvent();
      }}
    >
      <label
        className="flex flex-shrink-0 justify-center gap-2 w-28 py-2 text-base font-semibold text-white bg-green-500 cursor-pointer
            rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-blue-200"
      >
        <span>Nuevo</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </label>
    </button>
  );
};

export default NuevoBoton;
