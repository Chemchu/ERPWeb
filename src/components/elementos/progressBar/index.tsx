const CustomProgressBar = (props: { progress: number }) => {
  return (
    <div className="w-2/4 h-20">
      <div className="block p-4 m-auto bg-white rounded-lg w-full ">
        <div className="w-full h-6 bg-gray-400 rounded-full mt-3">
          <div
            style={{
              width: `${props.progress}%`,
              transition: "all 0.1s ease-in-out",
            }}
            className={`flex w-full h-full justify-center items-center text-xs text-white bg-green-500 rounded-full`}
          >
            {props.progress}%
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomProgressBar;
