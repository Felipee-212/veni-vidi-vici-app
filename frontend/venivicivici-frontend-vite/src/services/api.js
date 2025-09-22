import axios from "axios";

//setear la conexion conexion con la api
const api=axios.create({
    baseURL: import.meta.env.VITE_API_URL|| "http://localhost:8080",
})

// seteammos las autorizaciones
export const setAuthHeader=(email,password)=>{
    api.defaults.auth={username:email,password:password}
};
// limpia el logeo
export const clearAuthHeader = () => {
    delete api.defaults.auth;
};

export default api;
