
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const apiResponse = await (await fetch(`${process.env.ERPGATEWAY_URL}api/recommendation`, {
            body: req.body
        })).json();

        const data = JSON.parse(apiResponse.data);
        return res.status(apiResponse.successful ? 200 : 300).json({ message: apiResponse.message, successful: apiResponse.successful, data: data });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: `Error: ${err}`, successful: false });
    }
}

export default handler;

