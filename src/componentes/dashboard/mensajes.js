function MensajePreview(props) {
    if(!props.mensajes) return (
    <div>
        <div className="flex flex-col">
            <span className="text-sm text-gray-400 font-semibold dark:text-white ml-2">
                ¡Vaya! parece que no tienes ningún mensaje
            </span>
        </div>
    </div>)

    const mensajesRecibidos = props.mensajes;
    const msgs = mensajesRecibidos.map(
        (msg) => 
        <div>
            <a href="#" className="block relative">
                <img alt="profil" src={msg.senderImage} className="mx-auto object-cover rounded-full h-10 w-10 "/>
            </a>
            <div className="flex flex-col">
                <span className="text-sm text-gray-900 font-semibold dark:text-white ml-2">
                    {msg.senderName}
                </span>
                <span className="text-sm text-gray-400 dark:text-gray-300 ml-2">
                    {msg.mensaje}
                </span>
            </div>
        </div>
    );

    return(
        <li className="flex items-center my-6 space-x-2">
            {msgs}
        </li>
    );
}

export default function Mensajes(props) {
    return(
        <div className="mb-4">
            <div className="shadow-lg rounded-2xl p-4 bg-white dark:bg-gray-700 w-full">
                <p className="font-bold text-md text-black dark:text-white">
                    Mensajes
                </p>
                <ul>
                    <MensajePreview mensajes={props.mensajes} />
                </ul>
            </div>
        </div>
    );
}