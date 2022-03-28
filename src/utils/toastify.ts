import { toast } from "react-toastify";

export const notifyError = (msg: string) => {
    toast.error(msg, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
    });
}

export const notifySuccess = (msg: string) => {
    toast.success(msg, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
    });
}

export const notifyWarn = (msg: string) => {
    toast.warn(msg, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
    });
}

export const notifyPromise = (promise: Promise<any>, msgInicial: string, msgExito?: string, msgError?: string) => {
    toast.promise(promise,
        {
            pending: msgInicial,
            success: {
                render({ data }) {
                    return `${data || msgExito}`
                },
            },
            error: {
                render({ data }) {
                    return `${data || msgError}`;
                }
            }
        }
    );
}