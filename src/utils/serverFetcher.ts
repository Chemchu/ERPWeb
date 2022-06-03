import { envInformation } from "./envInfo";
import { print } from 'graphql/language/printer'

export const GQLQuery = (props: { query: string, variables: any }): Promise<Response> => {
    return fetch(`${envInformation.ERPBACK_URL}graphql`,
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
    return fetch(`${envInformation.ERPBACK_URL}graphql`,
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