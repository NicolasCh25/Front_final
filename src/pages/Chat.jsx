import { useNavigate } from "react-router"
import { FaArrowLeft, FaTools } from "react-icons/fa" // Agregué íconos para que se vea mejor

const Chat = () => {
    const navigate = useNavigate()

    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] bg-gray-50 p-6">
            <div className="max-w-md w-full bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 p-8 text-center relative">
                
                {/* Decoración de fondo sutil */}
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-purple-500 to-indigo-500"></div>

                {/* Ícono animado */}
                <div className="mx-auto bg-purple-50 w-28 h-28 rounded-full flex items-center justify-center mb-6 animate-pulse ring-8 ring-purple-50/50">
                    <FaTools className="text-4xl text-purple-600" />
                </div>

                <h2 className="text-3xl font-extrabold text-gray-800 mb-3 tracking-tight">
                    Chat en <span className="text-purple-600">Construcción</span>
                </h2>
                
                <p className="text-gray-500 mb-8 leading-relaxed">
                    Estamos preparando un módulo de chat increíble para mejorar la comunicación. <br/>
                    <span className="font-semibold text-purple-500">¡Estará listo muy pronto!</span>
                </p>

                {/* Barra de progreso decorativa */}
                <div className="w-full bg-gray-100 rounded-full h-3 mb-8 overflow-hidden relative">
                    <div className="absolute top-0 left-0 h-full bg-purple-600 w-3/4 rounded-full animate-[loading_2s_ease-in-out_infinite]"></div>
                    {/* Efecto de brillo en la barra */}
                    <div className="absolute top-0 left-0 h-full w-full bg-gradient-to-r from-transparent via-white/30 to-transparent animate-[shimmer_1.5s_infinite]"></div>
                </div>

                {/* BOTÓN DE VOLVER (Reemplazo) */}
                <div className="flex justify-center">
                    <button 
                        onClick={() => navigate('/dashboard/list')}
                        className="group flex items-center gap-2 px-8 py-3 bg-white border-2 border-gray-200 text-gray-600 font-bold rounded-full hover:border-purple-600 hover:text-purple-600 transition-all duration-300 transform hover:-translate-y-1 shadow-sm hover:shadow-md"
                    >
                        <FaArrowLeft className="group-hover:-translate-x-1 transition-transform duration-300" />
                        Volver al Panel
                    </button>
                </div>

            </div>
            
            {/* Texto pequeño de pie de página */}
            <p className="mt-6 text-gray-400 text-sm">
                Versión Beta 1.0
            </p>
        </div>
    )
}

export default Chat