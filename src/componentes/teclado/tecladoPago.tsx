import { motion } from "framer-motion";

type TecladoProps = {
    tipoPago: string,
    numInput: string, 
    setNumInput: Function
}

export const Teclado = (props: TecladoProps) => {
    return(
        <div className="text-gray-700 px-3 pt-2 pb-3 rounded-lg bg-gray-200">
            <div className="flex text-lg font-semibold">
                <div className="flex-grow text-left">{props.tipoPago.toUpperCase()}</div>
                <div className="flex text-right">
                    <div className="mr-2">€</div>
                    <input type="text" inputMode="numeric" className="w-28 text-right bg-white shadow rounded-lg 
                        focus:bg-white focus:shadow-lg px-2 focus:outline-none" onChange={(e) => props.setNumInput(e.target.value)} value={props.numInput}/>
                </div>
            </div>
            <hr className="my-2" />
            <div className="grid grid-cols-3 gap-2 mt-2">
                <motion.button whileTap={{scale: 0.9}} className="bg-white h-12 shadow rounded-lg hover:shadow-lg hover:bg-blue-400 hover:text-white focus:outline-none" onClick={() => {props.setNumInput(`${parseFloat(props.numInput + 7)}`)}}>7</motion.button>
                <motion.button whileTap={{scale: 0.9}} className="bg-white h-12 shadow rounded-lg hover:shadow-lg hover:bg-blue-400 hover:text-white focus:outline-none" onClick={() => {props.setNumInput(`${parseFloat(props.numInput + 8)}`)}}>8</motion.button>
                <motion.button whileTap={{scale: 0.9}} className="bg-white h-12 shadow rounded-lg hover:shadow-lg hover:bg-blue-400 hover:text-white focus:outline-none" onClick={() => {props.setNumInput(`${parseFloat(props.numInput + 9)}`)}}>9</motion.button>

                <motion.button whileTap={{scale: 0.9}} className="bg-white h-12 shadow rounded-lg hover:shadow-lg hover:bg-blue-400 hover:text-white focus:outline-none" onClick={() => {props.setNumInput(`${parseFloat(props.numInput + 4)}`)}}>4</motion.button>
                <motion.button whileTap={{scale: 0.9}} className="bg-white h-12 shadow rounded-lg hover:shadow-lg hover:bg-blue-400 hover:text-white focus:outline-none" onClick={() => {props.setNumInput(`${parseFloat(props.numInput + 5)}`)}}>5</motion.button>
                <motion.button whileTap={{scale: 0.9}} className="bg-white h-12 shadow rounded-lg hover:shadow-lg hover:bg-blue-400 hover:text-white focus:outline-none" onClick={() => {props.setNumInput(`${parseFloat(props.numInput + 6)}`)}}>6</motion.button>

                <motion.button whileTap={{scale: 0.9}} className="bg-white h-12 shadow rounded-lg hover:shadow-lg hover:bg-blue-400 hover:text-white focus:outline-none" onClick={() => {props.setNumInput(`${parseFloat(props.numInput + 1)}`)}}>1</motion.button>
                <motion.button whileTap={{scale: 0.9}} className="bg-white h-12 shadow rounded-lg hover:shadow-lg hover:bg-blue-400 hover:text-white focus:outline-none" onClick={() => {props.setNumInput(`${parseFloat(props.numInput + 2)}`)}}>2</motion.button>
                <motion.button whileTap={{scale: 0.9}} className="bg-white h-12 shadow rounded-lg hover:shadow-lg hover:bg-blue-400 hover:text-white focus:outline-none" onClick={() => {props.setNumInput(`${parseFloat(props.numInput + 3)}`)}}>3</motion.button>

                <motion.button whileTap={{scale: 0.9}} className="bg-white h-12 shadow rounded-lg hover:shadow-lg text-2xl hover:bg-blue-400 focus:outline-none" onClick={() => {props.setNumInput(`${props.numInput}.`)}}>.,</motion.button>
                <motion.button whileTap={{scale: 0.9}} className="bg-white h-12 shadow rounded-lg hover:shadow-lg hover:bg-blue-400 focus:outline-none" onClick={() => {props.setNumInput(`${props.numInput + 0}`)}}>0</motion.button>
                <motion.button whileTap={{scale: 0.9}} className="bg-white h-12 shadow rounded-lg hover:shadow-lg hover:bg-red-500 hover:text-white focus:outline-none" onClick={() => {props.setNumInput(props.numInput.substring(0, props.numInput.length - 1))}}>←</motion.button>
            </div>
        </div>                   


    );
}