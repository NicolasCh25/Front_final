import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { ToastContainer, toast } from "react-toastify"
import { useNavigate } from "react-router"
import { useFetch } from "../hooks/useFetch"
import storeAuth from "../context/storeAuth"

const Create = () => {
  const fetchDataBackend = useFetch()
  const [imagen, setImagen] = useState(null)
  const navigate = useNavigate()
  const { token, rol } = storeAuth()

  const { register, handleSubmit, formState: { errors } } = useForm()

  useEffect(() => {
    if (rol === "invitado") {
        toast.warning("Los invitados no pueden crear proyectos.")
        navigate('/dashboard/list')
    }
  }, [rol, navigate])

  const registrarProyecto = async (dataForm) => {
    try {
      const formData = new FormData()
      Object.entries(dataForm).forEach(([key, value]) => {
        formData.append(key, value)
      })
      if (imagen) formData.append("imagen", imagen)

      const url = `${import.meta.env.VITE_BACKEND_URL}/proyecto/registro`

      const response = await fetchDataBackend(url, formData, "POST", {
        Authorization: `Bearer ${token}`
      })

      if (response) {
        navigate('/dashboard/list')
      }

    } catch (error) {
      console.error(error)
    }
  }

  const inputClass = "block w-full rounded-xl border border-gray-300 bg-gray-50 focus:bg-white focus:border-[#17243D] focus:outline-none focus:ring-1 focus:ring-[#17243D] py-2.5 px-4 text-gray-700 transition-all duration-200"
  const labelClass = "mb-1.5 block text-sm font-bold text-[#17243D]"

  return (
    <div className="relative w-full min-h-[calc(100vh-4rem)] flex justify-center items-center py-10 px-4 overflow-hidden">
      <ToastContainer />

      {/* ✅ CORRECCIÓN AQUÍ: Usamos style={{ backgroundImage }} */}
      {/* Esto es más seguro que usar Tailwind para rutas de imágenes */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: "url('/images/esfot.jpg')" }}
      ></div>
      
      {/* 2. CAPA DE COLOR */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-100/80 to-blue-900/10"></div>

      {/* --- CARD DEL FORMULARIO --- */}
      <div className="relative z-10 w-full max-w-3xl bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/50">
        
        <div className="text-center mb-8">
            <h1 className="text-3xl font-black text-[#17243D] tracking-tight">
              REGISTRA TU <span className="text-[#F5BD45]">PROYECTO</span>
            </h1>
            <div className="h-1 w-20 bg-[#F5BD45] mx-auto mt-2 rounded-full"></div>
            <p className="text-gray-500 mt-3 text-sm">
              Ingresa los detalles del nuevo proyecto académico
            </p>
        </div>

        <form onSubmit={handleSubmit(registrarProyecto)} className="space-y-5">
          
          {/* Título */}
          <div>
            <label className={labelClass}>Título del Proyecto</label>
            <input
              type="text"
              placeholder="Ej. Sistema de Gestión de Inventarios"
              className={inputClass}
              {...register("titulo", { required: "El título es obligatorio" })}
            />
            {errors.titulo && <p className="text-red-500 text-xs mt-1 font-semibold">{errors.titulo.message}</p>}
          </div>

          {/* Descripción */}
          <div>
            <label className={labelClass}>Descripción</label>
            <textarea
              placeholder="Describe brevemente el alcance y objetivo del proyecto..."
              className={`${inputClass} h-24 resize-none`}
              {...register("descripcion", { required: "La descripción es obligatoria" })}
            />
             {errors.descripcion && <p className="text-red-500 text-xs mt-1 font-semibold">{errors.descripcion.message}</p>}
          </div>

          {/* Grid: Fecha y GitHub */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={labelClass}>Fecha de Realización</label>
              <input
                type="date"
                className={inputClass}
                {...register("fecha_realizacion", { required: "Fecha requerida" })}
              />
               {errors.fecha_realizacion && <p className="text-red-500 text-xs mt-1 font-semibold">{errors.fecha_realizacion.message}</p>}
            </div>

            <div>
              <label className={labelClass}>Repositorio GitHub</label>
              <div className="relative">
                <input
                    type="text"
                    placeholder="https://github.com/..."
                    className={`${inputClass} pl-10`} 
                    {...register("github_url")}
                />
                <span className="absolute left-3 top-3 text-gray-400 font-bold text-xs">GH</span>
              </div>
            </div>
          </div>

          {/* Grid: Video y Tecnologías */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div>
                <label className={labelClass}>URL del Video</label>
                <input
                  type="text"
                  placeholder="YouTube / Drive"
                  className={inputClass}
                  {...register("video_url", { required: "Video requerido" })}
                />
             </div>
             <div>
                <label className={labelClass}>Tecnologías</label>
                <input
                  type="text"
                  placeholder="React, Node, MongoDB..."
                  className={inputClass}
                  {...register("tecnologias")}
                />
             </div>
          </div>

          {/* Grid: Estudiante y Carrera */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={labelClass}>Estudiante Responsable</label>
              <input
                type="text"
                placeholder="Nombre completo"
                className={inputClass}
                {...register("estudiante", { required: "Nombre requerido" })}
              />
            </div>
            
            <div>
              <label className={labelClass}>Carrera</label>
              <select
                className={inputClass}
                {...register("carrera", { required: "Carrera requerida" })}
              >
                <option value="">-- Seleccione una Carrera --</option>
                <option value="Desarrollo de Software">Desarrollo de Software</option>
                <option value="Redes y Telecomunicaciones">Redes y Telecomunicaciones</option>
                <option value="Aguas y Saneamiento">Aguas y Saneamiento</option>
                <option value="Electromecánica">Electromecánica</option>
                <option value="Procesamiento de Maderas">Procesamiento de Maderas</option>
              </select>
            </div>

          </div>

          {/* Grid: Periodo e Imagen */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            <div>
               <label className={labelClass}>Periodo Académico</label>
               <input
                 type="text"
                 placeholder="Ej. 2024-A"
                 className={inputClass}
                 {...register("periodo_academico")}
               />
            </div>

            <div>
              <label className={labelClass}>Imagen de Portada</label>
              <label className="flex flex-col items-center justify-center w-full h-12 border-2 border-gray-300 border-dashed rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                  <div className="flex items-center space-x-2 pt-1">
                      <span className="text-sm text-gray-500">{imagen ? imagen.name : "Seleccionar archivo"}</span>
                  </div>
                  <input 
                    type="file" 
                    className="hidden" 
                    accept="image/*"
                    onChange={(e) => setImagen(e.target.files[0])}
                  />
              </label>
            </div>
          </div>

          <hr className="border-gray-200 my-8" />

          {/* Botón Submit */}
          <button
            type="submit"
            className="w-full bg-[#17243D] hover:bg-[#1F3059] text-white font-bold py-3.5 px-4 rounded-xl shadow-lg transform hover:-translate-y-1 transition-all duration-200 focus:ring-2 focus:ring-offset-2 focus:ring-[#17243D]"
          >
            GUARDAR PROYECTO
          </button>

        </form>
      </div>
    </div>
  )
}

export default Create