import { request as req } from "@umijs/max"

export async function getInitialState() {
    const token = localStorage.getItem('token');
    if (!token) {
        return { currentUser: null };
    }
    const currentUser = await req('/api/user')
    return { currentUser };
}

export const request = {
    timeout: 60000,
    errorConfig: {
        errorHandler: () => { },
        errorThrower: () => { }
    },
    requestInterceptors: [
        (config: any) => {
            const token = localStorage.getItem('token');
            const authHeaders = token && (config.url.substring(0, 5) == '/api/') ?
                { Authorization: 'Bearer ' + token } :
                {};

            config.headers = { ...config.headers, ...authHeaders };
            return config;
        }
    ],
    responseInterceptors: []
};