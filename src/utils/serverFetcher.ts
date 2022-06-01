import { envInformation } from "./envInfo";
import { print } from 'graphql/language/printer'

export const GQLQuery = (query: string, variables: any): Promise<Response> => {
    return fetch(`${envInformation.ERPBACK_URL}graphql`,
        {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({
                query: query,
                variables: variables
            })
        }
    );
}

export const GQLMutate = (mutation: string, variables: any): Promise<Response> => {
    return fetch(`${envInformation.ERPBACK_URL}graphql`,
        {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({
                mutation: mutation,
                variables: variables
            })
        }
    );
}

export default GQLQuery;