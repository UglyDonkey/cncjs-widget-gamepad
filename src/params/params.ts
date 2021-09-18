
export interface Params {
    token: string;
    host: string;
}

const urlParams = new URLSearchParams(window.location.search);

const params: Params = {
    token: urlParams.get('token')!,
    host: urlParams.get('host') || ''
}

export default params;
