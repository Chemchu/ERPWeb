export const Inicio = () => {
    return (
        <div className="overflow-auto h-screen pb-24 pt-2 pr-2 pl-2 md:pt-0 md:pr-0 md:pl-0">
            <div className="flex flex-col flex-wrap sm:flex-row ">
                <div className="w-full sm:w-1/2 xl:w-1/3">
                    {/* <Task /> */}
                </div>

                <div className="w-full sm:w-1/2 xl:w-1/3">
                    {/* <TasksList /> */}
                </div>

                <div className="w-full sm:w-1/2 xl:w-1/3">
                    {/* <Calendar /> */}
                    {/* <Mensajes /> */}
                </div>
            </div>
        </div>
    );
}