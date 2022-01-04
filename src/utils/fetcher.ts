//declare function fetcher(input: RequestInfo, init?: RequestInit): Promise<Response>;

const fetcher = (url: string) => fetch(url).then(res => res.json())

export default fetcher;