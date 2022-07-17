import { NextApiRequest, NextApiResponse } from "next";
import queryString from 'query-string';
import { isStringObject } from "util/types";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const method = req.method;

        switch (method) {
            case 'GET':
                const fecha: string = typeof req.query.id === "string" ? req.query.id : req.query.id[0];
                return await GetSummaryByDate(fecha, res)
        }

        return res.status(300).json({ message: `Solo se acepta metodo GET`, successful: false });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: `${err}` });
    }
}

const GetSummaryByDate = async (date: string, res: NextApiResponse) => {
    try {
        const apiResponse = await (await fetch(`${process.env.ERPGATEWAY_URL}api/analytics/summary/${date}`)).json();

        const data = JSON.parse(apiResponse.data);
        return res.status(apiResponse.successful ? 200 : 300).json({ message: apiResponse.message, successful: apiResponse.successful, data: data });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: `Error: ${err}`, successful: false });
    }
}


export default handler;