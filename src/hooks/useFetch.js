import axios from "axios"
import { toast } from "react-toastify"

export function useFetch() {

    const fetchDataBackend = async (url, data = null, method = "GET", headers = {}) => {
        const loadingToast = toast.loading("Procesando solicitud...")
        
        try {
            // Lógica para determinar el Content-Type correcto
            let finalHeaders = { ...headers }
            
            // ✅ CORRECCIÓN APLICADA AQUÍ:
            // Agregamos "data &&" al inicio.
            // Esto le dice: "Solo pon la etiqueta 'application/json' si REALMENTE hay datos".
            // Si data es null (como en DELETE), no pone nada y el backend no explota.
            if (data && !(data instanceof FormData)) {
                finalHeaders["Content-Type"] = "application/json"
            }

            const options = {
                method,
                url, // Asegúrate de que esta URL sea completa o configurar axios.defaults.baseURL
                headers: finalHeaders,
                data
            }

            const response = await axios(options)
            
            toast.dismiss(loadingToast)
            toast.success(response?.data?.msg)
            return response?.data

        } catch (error) {
            toast.dismiss(loadingToast)
            console.error(error)
            // Manejo seguro del error por si el backend no responde
            const errorMsg = error.response?.data?.msg || "Error de conexión con el servidor"
            toast.error(errorMsg)
        }
    }
    return fetchDataBackend
}