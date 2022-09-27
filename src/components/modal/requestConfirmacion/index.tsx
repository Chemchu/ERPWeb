import { motion } from "framer-motion";
import { In } from "../../../utils/animations";
import { Backdrop } from "../backdrop";

const RequestConfirmacion = (props: { titulo: string, msg: string, acceptCallback: Function, cancelCallback: Function }) => {
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} >
            <Backdrop onClick={(e) => { e.stopPropagation(); props.cancelCallback() }} >
                <motion.div className="shadow-lg rounded-2xl p-4 bg-white dark:bg-gray-800 w-64 m-auto"
                    onClick={(e) => e.stopPropagation()}
                    variants={In}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                >

                    <div className="w-full h-full text-center">
                        <div className="flex h-full  flex-col justify-between items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-20 h-20 text-blue-500">
                                <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm11.378-3.917c-.89-.777-2.366-.777-3.255 0a.75.75 0 01-.988-1.129c1.454-1.272 3.776-1.272 5.23 0 1.513 1.324 1.513 3.518 0 4.842a3.75 3.75 0 01-.837.552c-.676.328-1.028.774-1.028 1.152v.75a.75.75 0 01-1.5 0v-.75c0-1.279 1.06-2.107 1.875-2.502.182-.088.351-.199.503-.331.83-.727.83-1.857 0-2.584zM12 18a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
                            </svg>


                            <p className="text-gray-800 dark:text-gray-200 text-xl font-bold mt-4">
                                {props.titulo}
                            </p>
                            <p className="text-gray-600 dark:text-gray-400 text-xs py-2 px-6">
                                {props.msg}
                            </p>
                            <div className="flex items-center justify-between gap-4 w-full mt-8">
                                <button onClick={() => props.acceptCallback()} type="button" className="py-2 px-4  bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                                    Sí
                                </button>
                                <button onClick={() => props.cancelCallback()} type="button" className="py-2 px-4  bg-white hover:bg-gray-100 focus:ring-blue-500 focus:ring-offset-blue-200 text-blue-500 w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                                    No
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </Backdrop >
        </motion.div >
    )
}

export default RequestConfirmacion;