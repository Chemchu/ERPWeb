
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const apiResponse = await (await fetch(`${process.env.ERPGATEWAY_URL}api/recommender`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(req.body)
        })).json();

        const apiJson = JSON.parse(apiResponse);
        const successful = apiJson.data !== "INVALID"
        return res.status(successful ? 200 : 300).json({ message: apiJson.message, successful: successful, data: apiJson.data });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: `Error: ${err}`, successful: false, data: "INVALID" });
    }
}

export default handler;

