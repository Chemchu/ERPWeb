import { Merma } from "../../tipos/Merma";
import { notifyError } from "../toastify";
import { CreateMermaList } from "../typeCreator";
import queryString from 'query-string';

export const FetchMermas = async (): Promise<Merma[]> => {
    try {
        let mermaRes = [] as Merma[];
        const mResponse = await fetch('/api/mermas');

        if (!mResponse.ok) { notifyError("Error al buscar las mermas"); return []; }

        const resJson = await mResponse.json();
        mermaRes = CreateMermaList(resJson.data);
        return mermaRes
    }
    catch (e: any) {
        notifyError(e);
        return [];
    }

}

export const FetchMermaByQuery = async (userQuery: string): Promise<Merma[]> => {
    try {
        let id: any = new Object;
        id.query = userQuery.valueOf();

        const query = queryString.stringify(id);
        const mResponse = await fetch(`/api/mermas/${query}`);
        if (!mResponse.ok) { notifyError("Error al buscar las mermas"); return []; }

        const mJson = await mResponse.json();
        return CreateMermaList(mJson)
    }
    catch (e) {
        console.log(e);
        notifyError("Error de conexión");
        return [];
    }
}