import { envInformation } from "./envInfo";

const AddVenta = async () => {

}

const Autenticar = async (username: string, password: string): Promise<boolean> => {
    try {
        const loginPostConfig = {
            email: username,
            password: password
        }

        // Petición login
        const resFromAPI = await (await fetch(`${envInformation.ERPBACK_URL}login/authenticate`, {
            method: 'GET',
            body: JSON.stringify(loginPostConfig)
        }
        )).json();

        let response = false;
        resFromAPI.data.success ? response = true : response = false;

        return response;
    }
    catch (err) {
        console.log(err);
        return false;
    }
}