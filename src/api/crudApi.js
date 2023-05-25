import axios from "axios";
import { getEnvVariables } from "../helpers/getEnvVariables";


const { VITE_API_URL } = getEnvVariables()

const Api = axios.create({
    baseURL: VITE_API_URL
})

// configurar intercectores
// tipo solicitud
Api.interceptors.request.use( config => {
// estmos leyendo el token de del registro o login
    config.headers = {
        ...config.headers,
         "x-token": localStorage.getItem('token')
       
    }

    return config
})

export default Api;