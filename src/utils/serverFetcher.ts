import { envInformation } from "./envInfo";

export const GQLQuery = (props: { query: string, variables: any }): Promise<Response> => {
    console.log(envInformation.ERPBACK_URL);

    return fetch(`${envInformation.ERPBACK_URL}api/graphql`,
        {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({
                query: props.query,
                variables: props.variables
            })
        }
    );
}

export const GQLMutate = (props: { mutation: string, variables: any }): Promise<Response> => {
    return fetch(`${envInformation.ERPBACK_URL}api/graphql`,
        {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({
                query: props.mutation,
                variables: props.variables
            })
        }
    );
}

export default GQLQuery;