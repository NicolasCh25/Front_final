import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { ToastContainer, toast } from "react-toastify"
import { useNavigate, useParams } from "react-router" 
import { useFetch } from "../hooks/useFetch"
import storeAuth from "../context/storeAuth"
import { FaTrash, FaSave, FaArrowLeft, FaImage } from "react-icons/fa"
import Swal from 'sweetalert2' 

const Update = () => {
  const { id } = useParams() 
  const navigate = useNavigate()
  const fetchDataBackend = useFetch()
  const { token } = storeAuth()
  const [imagenPreview, setImagenPreview] = useState(null)
  const [imagenFile, setImagenFile] = useState(null)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm()

  // 1️⃣ CARGAR DATOS
  useEffect(() => {
    const obtenerProyecto = async () => {
      try {
        const url = `${import.meta.env.VITE_BACKEND_URL}/proyecto/${id}`
        const data = await fetchDataBackend(url, null, "GET", {
            Authorization: `Bearer ${token}`
        })

        if (data) {
          setValue("titulo", data.titulo)
          setValue("descripcion", data.descripcion)
          setValue("github_url", data.github_url)
          setValue("video_url", data.video_url)
          setValue("tecnologias", data.tecnologias) 
          setValue("estudiante", data.estudiante)
          setValue("carrera", data.carrera) 
          setValue("periodo_academico", data.periodo_academico)
          
          if(data.fecha_realizacion){
             const fechaFormat = new Date(data.fecha_realizacion).toISOString().split('T')[0]
             setValue("fecha_realizacion", fechaFormat)
          }

          if (data.imagen?.secure_url) {
             setImagenPreview(data.imagen.secure_url)
          } else if (data.imagenes?.[0]?.secure_url) {
             setImagenPreview(data.imagenes[0].secure_url)
          }
        }
      } catch (error) {
        console.error(error)
        toast.error("Error al cargar el proyecto")
      }
    }
    obtenerProyecto()
  }, [id, setValue, fetchDataBackend, token])


  // 2️⃣ ACTUALIZAR
  const actualizarProyecto = async (dataForm) => {
    try {
      const formData = new FormData()

      Object.entries(dataForm).forEach(([key, value]) => {
        formData.append(key, value)
      })

      if (imagenFile) {
        formData.append("imagen", imagenFile)
      }

      const url = `${import.meta.env.VITE_BACKEND_URL}/proyecto/${id}`

      await fetchDataBackend(url, formData, "PUT", {
        Authorization: `Bearer ${token}`
      })
      
      setTimeout(() => {
          navigate('/dashboard/list')
      }, 1500)

    } catch (error) {
      console.error(error)
    }
  }

  // 3️⃣ ELIMINAR
  const handleEliminar = async () => {
    const result = await Swal.fire({
        title: '¿Estás seguro?',
        text: "No podrás revertir esta acción.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
    })

    if (result.isConfirmed) {
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/proyecto/${id}`
            const response = await fetchDataBackend(url, null, "DELETE", {
                Authorization: `Bearer ${token}`
            })
            
            if (response) {
                Swal.fire('Eliminado!', 'El proyecto ha sido eliminado.', 'success')
                navigate('/dashboard/list')
            }
        } catch (error) {
            console.error(error)
            toast.error("Error al eliminar el proyecto")
        }
    }
  }

  const inputClass = "block w-full rounded-xl border border-gray-300 bg-gray-50 focus:bg-white focus:border-[#17243D] focus:outline-none focus:ring-1 focus:ring-[#17243D] py-2.5 px-4 text-gray-700 transition-all duration-200"
  const labelClass = "mb-1.5 block text-sm font-bold text-[#17243D]"

  return (
    <div className="relative w-full min-h-[calc(100vh-4rem)] flex justify-center items-center py-10 px-4 overflow-hidden">
      <ToastContainer />

      {/* ✅ FONDOS CORREGIDOS: Sin '/public' y usando style para mayor seguridad */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-20 pointer-events-none"
        style={{ backgroundImage: "url('/images/esfot.jpg')" }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-br from-gray-100/80 to-blue-900/10 pointer-events-none"></div>

      {/* CARD PRINCIPAL */}
      <div className="relative z-10 w-full max-w-3xl bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/50">
        
        <button onClick={() => navigate(-1)} className="mb-4 flex items-center text-gray-500 hover:text-[#17243D] transition-colors">
            <FaArrowLeft className="mr-2" /> Volver
        </button>

        <div className="text-center mb-8">
            <h1 className="text-3xl font-black text-[#17243D] tracking-tight">
              EDITAR <span className="text-[#F5BD45]">PROYECTO</span>
            </h1>
            <div className="h-1 w-20 bg-[#F5BD45] mx-auto mt-2 rounded-full"></div>
        </div>

        <form onSubmit={handleSubmit(actualizarProyecto)} className="space-y-5">
          
          <div>
            <label className={labelClass}>Título del Proyecto</label>
            <input type="text" className={inputClass} {...register("titulo", { required: "El título es obligatorio" })} />
            {errors.titulo && <p className="text-red-500 text-xs mt-1">{errors.titulo.message}</p>}
          </div>

          <div>
            <label className={labelClass}>Descripción</label>
            <textarea className={`${inputClass} h-24 resize-none`} {...register("descripcion", { required: "Obligatorio" })} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div><label className={labelClass}>Fecha</label><input type="date" className={inputClass} {...register("fecha_realizacion")} /></div>
            <div><label className={labelClass}>GitHub</label><input type="text" className={inputClass} {...register("github_url")} /></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div><label className={labelClass}>Video URL</label><input type="text" className={inputClass} {...register("video_url")} /></div>
             <div><label className={labelClass}>Tecnologías</label><input type="text" className={inputClass} {...register("tecnologias")} /></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div><label className={labelClass}>Estudiante</label><input type="text" className={inputClass} {...register("estudiante")} /></div>
            
            {/* ✅ SELECT DE CARRERAS (Igual que en Create) */}
            <div>
              <label className={labelClass}>Carrera</label>
              <select className={inputClass} {...register("carrera", { required: "Carrera requerida" })}>
                <option value="">-- Seleccione una Carrera --</option>
                <option value="Desarrollo de Software">Desarrollo de Software</option>
                <option value="Redes y Telecomunicaciones">Redes y Telecomunicaciones</option>
                <option value="Aguas y Saneamiento">Aguas y Saneamiento</option>
                <option value="Electromecánica">Electromecánica</option>
                <option value="Procesamiento de Maderas">Procesamiento de Maderas</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            <div><label className={labelClass}>Periodo</label><input type="text" className={inputClass} {...register("periodo_academico")} /></div>
            
            <div>
              <label className={labelClass}>Imagen (Opcional)</label>
              {imagenPreview && (
                  <div className="mb-2 relative w-full h-32 rounded-lg overflow-hidden border border-gray-200 group">
                      <img src={imagenPreview} alt="Preview" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-white text-xs">Cambiar</div>
                  </div>
              )}
              <label className="flex flex-col items-center justify-center w-full h-12 border-2 border-gray-300 border-dashed rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100">
                  <div className="flex items-center space-x-2 pt-1">
                      <FaImage className="text-gray-400" />
                      <span className="text-sm text-gray-500">{imagenFile ? imagenFile.name : "Cambiar imagen..."}</span>
                  </div>
                  <input type="file" className="hidden" accept="image/*" onChange={(e) => {
                        const file = e.target.files[0];
                        if(file) { setImagenFile(file); setImagenPreview(URL.createObjectURL(file)); }
                    }} />
              </label>
            </div>
          </div>

          <hr className="border-gray-200 my-8" />
          <div className="flex flex-col md:flex-row gap-4">
            <button type="button" onClick={handleEliminar} className="flex-1 bg-red-50 text-red-600 hover:bg-red-100 font-bold py-3.5 px-4 rounded-xl shadow-sm flex items-center justify-center gap-2 border border-red-200">
                <FaTrash /> Eliminar
            </button>
            <button type="submit" className="flex-[2] bg-[#17243D] hover:bg-[#1F3059] text-white font-bold py-3.5 px-4 rounded-xl shadow-lg flex items-center justify-center gap-2">
                <FaSave /> Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Update