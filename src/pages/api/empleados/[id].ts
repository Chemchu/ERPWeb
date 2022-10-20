import { NextApiRequest, NextApiResponse } from "next";
import GQLQuery, { GQLMutate } from "../../../utils/serverFetcher";
import queryString from 'query-string';
import { DELETE_EMPLEADO, QUERY_EMPLEADOS, UPDATE_EMPLEADO } from "../../../utils/querys";
import { Empleado } from "../../../tipos/Empleado";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        if (!req.query.id) { return res.status(300).json({ message: `No se puede recibir una petición sin param por esta ruta`, successful: false }); }

        const method = req.method;
        const query = queryString.parse(req.query.id.toString());
        switch (method) {
            case 'GET':
                if (Object.keys(query).length > 0) { return await GetEmpleadosFromQuery(query, res); }
                else { return await GetEmpleadoFromId(req, res); }

            case 'PUT':
                return await UpdateEmpleado(req, res);

            case 'DELETE':
                return await DeleteEmpleado(req, res);
        }

        return res.status(300).json({ message: `Fallo al buscar el empleado` });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: `Fallo al de consexión con el servidor: ${err}` });
    }
}

const GetEmpleadoFromId = async (req: NextApiRequest, res: NextApiResponse) => {
    const serverRes = await GQLQuery(
        {
            query: QUERY_EMPLEADOS,
            variables: {
                "find": {
                    "_id": req.query.id
                }
            }
        }
    )
    const apiResponse = await serverRes.json();

    const data = JSON.parse(apiResponse.data);
    return res.status(serverRes.ok ? 200 : 300).json(JSON.stringify({ message: apiResponse.message, data: data.empleados, successful: serverRes.ok }));
}

const GetEmpleadosFromQuery = async (userQuery: queryString.ParsedQuery<string>, res: NextApiResponse) => {
    if (!userQuery.query && !userQuery.isLibre) { res.status(300).json({ message: `La query no puede estar vacía` }); }

    const serverRes = await GQLQuery(
        {
            query: QUERY_EMPLEADOS,
            variables: {
                "find": {
                    "query": userQuery.query,
                    "isLibre": userQuery.isLibre ? userQuery.isLibre === 'true' : null
                }
            }
        }
    )
    const apiResponse = await serverRes.json();

    const data = JSON.parse(apiResponse.data);
    return res.status(serverRes.ok ? 200 : 300).json({ message: data.message, data: data.empleados, successful: data.successful });
}

const DeleteEmpleado = async (req: NextApiRequest, res: NextApiResponse) => {
    const serverRes = await GQLMutate({
        mutation: DELETE_EMPLEADO,
        variables: {
            "id": req.query.id
        }
    })
    const apiResponse = await serverRes.json();

    const data = JSON.parse(apiResponse.data)
    return res.status(data.deleteEmpleado.successful ? 200 : 300).json({ message: data.deleteEmpleado.message, successful: data.deleteEmpleado.successful });
}

const UpdateEmpleado = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const emp: Empleado = req.body;

        const serverRes = await GQLMutate({
            mutation: UPDATE_EMPLEADO,
            variables: {
                "id": emp._id,
                "empleadoInput": {
                    "nombre": emp.nombre,
                    "apellidos": emp.apellidos,
                    "rol": emp.rol,
                    "dni": emp.dni,
                }
            }
        })
        const apiResponse = await serverRes.json();

        const data = JSON.parse(apiResponse.data).updateEmpleado;
        return res.status(data.successful ? 200 : 300).json({ message: data.message, successful: data.successful });
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({ message: `Error interno: respuesta no válida por parte del servidor.`, successful: false });
    }
}

export default handler;

