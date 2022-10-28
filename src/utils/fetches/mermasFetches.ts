import { Merma, NuevaMerma } from "../../tipos/Merma";
import { notifyError } from "../toastify";
import { CreateMermaList } from "../typeCreator";
import queryString from "query-string";

export const FetchMermas = async (): Promise<Merma[]> => {
  try {
    let mermaRes = [] as Merma[];
    const mResponse = await fetch("/api/mermas");

    if (!mResponse.ok) {
      notifyError("Error al buscar las mermas");
      return [];
    }

    const resJson = await mResponse.json();
    mermaRes = CreateMermaList(resJson.data);
    return mermaRes;
  } catch (e: any) {
    notifyError(e);
    return [];
  }
};

export const FetchMermaByQuery = async (userQuery: string): Promise<Merma[]> => {
  try {
    let id: any = new Object();
    id.query = userQuery.valueOf();

    const query = queryString.stringify(id);
    const mResponse = await fetch(`/api/mermas/${query}`);
    if (!mResponse.ok) {
      notifyError("Error al buscar las mermas");
      return [];
    }

    const mJson = await mResponse.json();
    return CreateMermaList(mJson.mermas);
  } catch (e) {
    console.log(e);
    notifyError("Error de conexión");
    return [];
  }
};

export const AddNuevaMerma = async (merma: NuevaMerma) => {
  try {
    const mResponse = await fetch(`/api/mermas/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(merma),
    });

    const msg = await mResponse.json();
    return { message: msg.message, successful: msg.successful };
  } catch (e) {
    console.log(e);
    return { message: "Error: " + String(e), successful: false };
  }
};

export const DeleteMerma = async (_id: string) => {
  try {
    const mResponse = await fetch(`/api/mermas/${_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const msg = await mResponse.json();
    return { message: msg.message, successful: msg.successful };
  } catch (e) {
    console.log(e);
    return { message: "Error: " + String(e), successful: false };
  }
};
