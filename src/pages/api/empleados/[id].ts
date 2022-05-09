import { gql } from "@apollo/client";
import { NextApiRequest, NextApiResponse } from "next";
import GQLFetcher from "../../../utils/serverFetcher";
import queryString from 'query-string';
import { DELETE_EMPLEADO, QUERY_EMPLEADOS, UPDATE_EMPLEADO } from "../../../utils/querys";
import { Empleado } from "../../../tipos/Empleado";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const method = req.method;
        const query = queryString.parse(req.query.id.toString());

        switch (method) {
            case 'POST':
                if (req.query.id === "file") {
                    return await AddEmpleadosFromFile(req, res);
                }

            case 'GET':
                if (query.query) { return await GetEmpleadosFromQuery(query, res); }
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
    const fetchResult = await GQLFetcher.query(
        {
            query: QUERY_EMPLEADOS,
            variables: {
                "find": {
                    "_id": req.query.id
                }
            }
        }
    );

    if (!fetchResult.error) {
        return res.status(200).json(JSON.stringify({ message: `Empleado encontrado`, empleado: fetchResult.data.empleado }));
    }

    return res.status(300).json({ message: `Fallo al realizar la búsqueda` });
}

const GetEmpleadosFromQuery = async (userQuery: queryString.ParsedQuery<string>, res: NextApiResponse) => {
    if (!userQuery.query) { res.status(300).json({ message: `La query no puede estar vacía` }); }

    const fetchResult = await GQLFetcher.query(
        {
            query: QUERY_EMPLEADOS,
            variables: {
                "find": {
                    "query": userQuery.query
                }
            }
        }
    );

    if (fetchResult.data.productos) {
        return res.status(200).json({ message: `Productos encontrados`, productos: fetchResult.data.productos });
    }

    return res.status(300).json({ message: `Fallo al realizar la búsqueda` });
}

const AddEmpleadosFromFile = async (req: NextApiRequest, res: NextApiResponse) => {
    // const response = await GQLFetcher.mutate({
    //     mutation: ADD_EMPLEADO_FILE,
    //     variables: {
    //         csv: JSON.stringify(req.body)
    //     }
    // });

    // if (response.data.addProductosFile.successful) {
    //     return res.status(200).json({ message: response.data.addProductosFile.message });
    // }

    return res.status(300).json({ message: `Fallo al añadir los empleados desde el archivo` });
}

const DeleteEmpleado = async (req: NextApiRequest, res: NextApiResponse) => {
    const response = await GQLFetcher.mutate({
        mutation: DELETE_EMPLEADO,
        variables: {
            "id": req.query.id
        }
    });

    if (response.data.deleteEmpleado.successful) {
        return res.status(200).json({ message: response.data.deleteEmpleado.message, successful: response.data.deleteEmpleado.successful });
    }
    return res.status(300).json({ message: `Fallo al borrar el empleado: ${response.data.deleteEmpleado.message}`, successful: response.data.deleteEmpleado.successful });
}

const UpdateEmpleado = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const emp: Empleado = req.body;

        const response = await GQLFetcher.mutate({
            mutation: UPDATE_EMPLEADO,
            variables: {
                "id": emp._id,
                "nombre": emp.nombre,
                "apellidos": emp.apellidos,
                "rol": emp.rol,
                "email": emp.email
            }
        });

        if (response.data.updateEmpleado.successful) {
            res.status(200).json({ message: response.data.updateEmpleado.message, successful: response.data.updateEmpleado.successful });
            return;
        }

        res.status(300).json({ message: `Fallo al actualizar el empleado: ${response.data.message}`, successful: false });
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({ message: `Error interno: respuesta no válida por parte del servidor.`, successful: false });
    }
}

export default handler;

