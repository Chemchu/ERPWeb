import DashboardLayout from "../../layout";

const ServerError = () => {
    return (
        <div className="h-screen w-full overflow-hidden p-2" >
            <div className="h-full rounded-3xl bg-white border">
                <div className="flex flex-col w-full h-full items-center justify-evenly text-black">
                    <h1 className="font-extrabold text-5xl text-center leading-tight mt-4">
                        Error de conexión con el servidor
                    </h1>
                    <p className="font-extrabold text-8xl animate-bounce">
                        404
                    </p>
                </div>
            </div>
        </div >

    );
}
ServerError.PageLayout = DashboardLayout;

export default ServerError;