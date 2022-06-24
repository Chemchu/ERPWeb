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

export const notifyLoading = (promise: Promise<any>, msgInicial: string, successfulCallback?: Function, failureCallback?: Function) => {
    const toastId = toast.loading(msgInicial);
    promise
        .then(async (response) => {
            let data = response;
            if (Boolean(data.headers)) {
                data = await response.json()
            }

            if (data.successful) {
                toast.update(toastId, { render: data.message, type: "success", isLoading: false, autoClose: 5000, draggable: true, pauseOnHover: true, closeOnClick: true })
                if (successfulCallback) { successfulCallback(); }
            }
            else {
                toast.update(toastId, { render: data.message, type: "error", isLoading: false, autoClose: 5000, draggable: true, pauseOnHover: true, closeOnClick: true })
                if (failureCallback) { failureCallback(); }
            }
        })
        .catch((err) => {
            toast.update(toastId, { render: err, type: "error", isLoading: false, autoClose: 5000, draggable: true, pauseOnHover: true, closeOnClick: true })
        });
}