import { useState, useEffect } from "react"
import { useFetch } from "../hooks/useFetch"
import { useNavigate } from "react-router"
import storeAuth from "../context/storeAuth"
import { useForm } from "react-hook-form" 
import { FaGithub, FaYoutube, FaCalendarAlt, FaEdit, FaSearch, FaFilter, FaTimes } from "react-icons/fa"

const Listar = () => {
  const [proyectos, setProyectos] = useState([])
  const [cargando, setCargando] = useState(true)
  const [mostrarFiltros, setMostrarFiltros] = useState(false)
  const navigate = useNavigate()
  const fetchDataBackend = useFetch()
  
  const { token, rol } = storeAuth()
  const { register, handleSubmit, reset } = useForm()

  const obtenerProyectos = async (filtros = {}) => {
    try {
      setCargando(true)
      let url = `${import.meta.env.VITE_BACKEND_URL}/proyectos` 

      if (filtros.carrera && filtros.carrera.trim() !== "") {
          url = `${import.meta.env.VITE_BACKEND_URL}/proyectos/carrera/${encodeURIComponent(filtros.carrera)}`
      } else {
          const params = new URLSearchParams()
          if (filtros.titulo?.trim()) params.append("titulo", filtros.titulo)
          if (filtros.estudiante?.trim()) params.append("estudiante", filtros.estudiante)
          if (filtros.tecnologia?.trim()) params.append("tecnologia", filtros.tecnologia)
          if (filtros.periodo_academico?.trim()) params.append("periodo_academico", filtros.periodo_academico)

          if (params.toString()) {
              url = `${import.meta.env.VITE_BACKEND_URL}/buscar?${params.toString()}`
          }
      }

      const response = await fetchDataBackend(url, null, "GET", {
        Authorization: `Bearer ${token}`
      })

      if (response) {
        setProyectos(response)
      } else {
        setProyectos([]) 
      }

    } catch (error) {
      console.error("Error al cargar proyectos:", error)
      setProyectos([])
    } finally {
      setCargando(false)
    }
  }

  useEffect(() => {
    obtenerProyectos()
  }, [])

  const onSearch = (data) => {
    obtenerProyectos(data)
  }

  const limpiarFiltros = () => {
      reset() 
      obtenerProyectos() 
  }

  // Helpers
  const formatearFecha = (fecha) => {
    if (!fecha) return "Fecha no disponible"
    const fechaObj = new Date(fecha)
    return new Intl.DateTimeFormat('es-ES', { dateStyle: 'medium' }).format(fechaObj)
  }

  const obtenerTecnologias = (techs) => {
    if (!techs) return [];
    if (Array.isArray(techs)) return techs;
    if (typeof techs === 'string') return techs.split(',');
    return [];
  }

  // ✅ NUEVA FUNCIÓN PARA OBTENER LA IMAGEN SEGURA
  const obtenerImagen = (img) => {
      // 1. Si es un objeto de Cloudinary con secure_url
      if (img?.secure_url) return img.secure_url;
      
      // 2. Si es un string (URL directa)
      if (typeof img === 'string' && img.length > 10) return img;
      
      // 3. Fallback: Placeholder
      return "https://placehold.co/600x400?text=Sin+Imagen";
  }

  return (
    <div className="w-full p-6 md:p-10 min-h-screen">
      
      {/* Encabezado */}
      <div className="flex flex-col items-center justify-center mb-8">
          <h1 className="text-3xl md:text-4xl font-black text-[#17243D] uppercase tracking-wide text-center">
            Portafolio de <span className="text-[#F5BD45]">Proyectos</span>
          </h1>
          <div className="h-1.5 w-24 bg-[#17243D] mt-3 rounded-full"></div>
      </div>

      {/* BARRA DE FILTROS */}
      <div className="max-w-6xl mx-auto mb-10">
          <div className="flex justify-between items-center mb-4">
              <button 
                  onClick={() => setMostrarFiltros(!mostrarFiltros)}
                  className="flex items-center gap-2 text-[#17243D] font-bold hover:text-[#F5BD45] transition-colors"
              >
                  <FaFilter /> {mostrarFiltros ? "Ocultar Filtros" : "Filtrar Proyectos"}
              </button>
              
              <button onClick={limpiarFiltros} className="text-sm text-gray-500 hover:text-red-500 underline">
                  Restablecer lista
              </button>
          </div>

          {mostrarFiltros && (
              <form onSubmit={handleSubmit(onSearch)} className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 grid grid-cols-1 md:grid-cols-4 gap-4 animate-fadeIn">
                  
                  <div className="md:col-span-4">
                      <label className="text-xs font-bold text-[#F5BD45] uppercase">Buscar por Carrera (Prioridad)</label>
                      <select 
                          {...register("carrera")}
                          className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F5BD45] focus:outline-none bg-gray-50"
                      >
                          <option value="">-- Todas las Carreras --</option>
                          <option value="Desarrollo de Software">Desarrollo de Software</option>
                          <option value="Redes y Telecomunicaciones">Redes y Telecomunicaciones</option>
                          <option value="Aguas y Saneamiento">Aguas y Saneamiento</option>
                          <option value="Electromecánica">Electromecánica</option>
                          <option value="Procesamiento de Maderas">Procesamiento de Maderas</option>
                      </select>
                      <p className="text-[10px] text-gray-400 mt-1">* Si seleccionas una carrera, los otros filtros se ignorarán.</p>
                  </div>

                  <div>
                      <label className="text-xs font-bold text-gray-500 uppercase">Título</label>
                      <input {...register("titulo")} type="text" placeholder="Título..." className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#17243D] outline-none" />
                  </div>

                  <div>
                      <label className="text-xs font-bold text-gray-500 uppercase">Estudiante</label>
                      <input {...register("estudiante")} type="text" placeholder="Nombre..." className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#17243D] outline-none" />
                  </div>

                  <div>
                      <label className="text-xs font-bold text-gray-500 uppercase">Tecnología</label>
                      <input {...register("tecnologia")} type="text" placeholder="React, Java..." className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#17243D] outline-none" />
                  </div>

                   <div>
                      <label className="text-xs font-bold text-gray-500 uppercase">Periodo</label>
                      <input {...register("periodo_academico")} type="text" placeholder="Ej. 2024-A" className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#17243D] outline-none" />
                  </div>

                  <div className="md:col-span-4 flex justify-end gap-3 mt-2">
                      <button type="button" onClick={limpiarFiltros} className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2">
                          <FaTimes /> Limpiar
                      </button>
                      <button type="submit" className="px-6 py-2 bg-[#17243D] text-white rounded-lg hover:bg-[#1F3059] transition-colors flex items-center gap-2 shadow-md">
                          <FaSearch /> Buscar
                      </button>
                  </div>
              </form>
          )}
      </div>

      {/* RESULTADOS */}
      {cargando ? (
        <div className="flex justify-center items-center h-64">
           <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#17243D]"></div>
        </div>
      ) : proyectos.length === 0 ? (
        <div className="flex flex-col items-center justify-center bg-white rounded-3xl shadow-lg border border-gray-200 p-12 max-w-2xl mx-auto">
          <FaSearch className="text-6xl text-gray-300 mb-4" />
          <h3 className="text-xl font-bold text-gray-600">No se encontraron resultados.</h3>
          <p className="text-gray-400 mb-6 text-center">Intenta limpiar los filtros o buscar con otros términos.</p>
          <button onClick={limpiarFiltros} className="px-6 py-2 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition-transform mb-4">
              Ver todos los proyectos
          </button>
          {rol !== "invitado" && (
            <button onClick={() => navigate('/dashboard/create')} className="px-6 py-2 bg-[#17243D] text-white rounded-full hover:bg-[#1F3059] transition-transform hover:scale-105">
                Crear nuevo proyecto
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
          {proyectos.map((proyecto) => (
            <div key={proyecto._id} className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-100 flex flex-col h-full overflow-hidden">
              <div className="relative h-48 overflow-hidden bg-gray-100">
                
                {/* ✅ USAMOS LA NUEVA FUNCIÓN DE IMAGEN */}
                <img 
                  src={obtenerImagen(proyecto.imagen)} 
                  alt={proyecto.titulo}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/600x400?text=No+Disponible"; }}
                />

                <div className="absolute top-3 right-3">
                   <span className="text-xs font-bold uppercase bg-[#F5BD45] text-[#17243D] px-3 py-1 rounded-full shadow-sm">
                      {proyecto.carrera || "Software"}
                   </span>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col">
                <h2 className="text-lg font-bold text-[#17243D] mb-2 leading-tight line-clamp-2" title={proyecto.titulo}>
                  {proyecto.titulo}
                </h2>

                <div className="flex items-center text-gray-500 text-xs mb-3">
                  <FaCalendarAlt className="mr-1.5" />
                  {formatearFecha(proyecto.fecha_realizacion)}
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">{proyecto.descripcion}</p>

                <div className="flex flex-wrap gap-2 mb-5">
                  {obtenerTecnologias(proyecto.tecnologias).slice(0, 3).map((tech, i) => (
                      <span key={i} className="px-2 py-1 bg-gray-50 text-gray-600 text-xs rounded border border-gray-200">
                          {tech && typeof tech === 'string' ? tech.trim() : tech}
                      </span>
                  ))}
                </div>

                <hr className="border-gray-100 mb-4" />

                <div className="mt-auto">
                    <p className="text-xs text-gray-400 font-semibold mb-1 uppercase">Estudiante:</p>
                    <p className="text-sm font-bold text-[#17243D] mb-4 truncate">{proyecto.estudiante}</p>
                    
                    <div className="flex gap-2">
                      {rol !== "invitado" && (
                        <button onClick={() => navigate(`/dashboard/update/${proyecto._id}`)} className="flex items-center justify-center p-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors" title="Editar Proyecto">
                            <FaEdit />
                        </button>
                      )}
                      {proyecto.github_url && (
                          <a href={proyecto.github_url} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-[#24292e] text-white hover:bg-black transition-colors text-xs font-bold">
                             <FaGithub /> Repo
                          </a>
                      )}
                      {proyecto.video_url && (
                          <a href={proyecto.video_url} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-[#c4302b] text-white hover:bg-[#aa201b] transition-colors text-xs font-bold">
                             <FaYoutube /> Video
                          </a>
                      )}
                    </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Listar