import { useState } from "react";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { Link, useNavigate } from "react-router"; 
import { useForm } from "react-hook-form";
import { ToastContainer } from "react-toastify";
import { useFetch } from "../hooks/useFetch";
import storeAuth  from "../context/storeAuth"; 

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [rol, setRol] = useState("");
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm();
  const fetchDataBackend = useFetch();

  const { setToken, setRol: setRolGlobal } = storeAuth();

  const handleLogin = async (dataForm) => {
    if (!rol.trim()) {
      return alert("Por favor selecciona un rol");
    }

    const url = `${import.meta.env.VITE_BACKEND_URL}/administrador/login`;

    const dataToSend = {
      email: dataForm.email,
      password: dataForm.password,
      rol: rol,
    };

    const response = await fetchDataBackend(url, dataToSend, "POST");

    if (response) {
      setToken(response.token);         
      setRolGlobal(response.rol);       
      // ✅ CAMBIO 1: Redirigir a /dashboard/list
      navigate("/dashboard/list");
    }
  };

  const handleInvitado = () => {
    setToken("TOKEN_INVITADO"); 
    setRolGlobal("invitado");   
    // ✅ CAMBIO 2: Redirigir a /dashboard/list
    navigate("/dashboard/list"); 
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen py-8 overflow-y-auto bg-gray-100">
      <ToastContainer />

      {/* Fondo */}
      <div className="absolute inset-0 bg-[url('/public/images/esfot.jpg')] bg-no-repeat bg-cover bg-center opacity-40"></div>
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Header */}
      <div className="absolute top-0 left-0 right-0 h-16 bg-[#17243D] shadow-xl flex items-center justify-between px-6 z-20">
        <div className="w-15 h-15 flex items-center justify-center">
          <img src="images/logoPIC.png" alt="Escudo" className="h-full w-auto" />
        </div>
      </div>

      {/* Card */}
      <div className="relative z-10 w-full max-w-md bg-white rounded-3xl shadow-xl p-8 mx-4 my-8 mt-24 border border-gray-200">
        
        <h1 className="text-3xl font-bold text-center mb-0 mt-4">
          <span className="text-[#F5BD45]">BIENVENIDO(A)</span> <br />
          <span className="text-[#17243D] uppercase">DE NUEVO</span>
        </h1>

        <small className="text-gray-600 block mb-6 text-center text-sm">
          Por favor ingresa tus datos
        </small>

        <form className="space-y-4" onSubmit={handleSubmit(handleLogin)}>

          {/* Correo */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Correo Electrónico
            </label>
            <input
              type="email"
              placeholder="Ingresa tu correo"
              className="block w-full rounded-full border border-gray-300 focus:border-[#17243D] focus:outline-none focus:ring-1 focus:ring-[#17243D] py-2 px-4 text-gray-700"
              {...register("email", { required: "El correo es obligatorio" })}
            />
            {errors.email && <p className="text-red-600 text-sm">{errors.email.message}</p>}
          </div>

          {/* Contraseña */}
          <div className="relative">
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Contraseña
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="********************"
                className="block w-full rounded-full border border-gray-300 py-2 px-4 pr-10 text-gray-700 focus:border-[#17243D] focus:ring-1 focus:ring-[#17243D]"
                {...register("password", {
                  required: "La contraseña es obligatoria",
                })}
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-1/2 -translate-y-1/2 right-3 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <MdVisibilityOff size={20} /> : <MdVisibility size={20} />}
              </button>
            </div>

            {errors.password && <p className="text-red-600 text-sm">{errors.password.message}</p>}
          </div>

          {/* Rol */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Selecciona tu Rol
            </label>

            <div className="relative">
              <select
                value={rol}
                onChange={(e) => setRol(e.target.value)}
                className="block w-full rounded-full border border-gray-300 py-2 px-4 focus:border-[#17243D] focus:ring-1 focus:ring-[#17243D] text-gray-700"
              >
                <option value="">Selecciona un rol</option>
                <option value="administrador">Administrador</option>
              </select>

              <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-gray-600">
                ▼
              </div>
            </div>
          </div>

          {/* Botón login */}
          <button
            type="submit"
            className="py-2 w-full block text-center bg-[#17243D] text-white rounded-full hover:scale-105 duration-300 hover:bg-[#1F3059]"
          >
            Iniciar Sesión
          </button>

          {/* Botón invitado */}
          <button
            type="button"
            onClick={handleInvitado}
            className="py-2 w-full block text-center bg-gray-500 text-white rounded-full hover:scale-105 duration-300 hover:bg-gray-600"
          >
            Ingresar como Invitado
          </button>

        </form>

        {/* Separador */}
        <div className="mt-6 mb-6 grid grid-cols-3 items-center text-gray-500">
          <hr />
          <p className="text-center text-sm">O</p>
          <hr />
        </div>

      
        {/* Olvidaste tu contraseña */}
        <div className="mt-5 text-xs text-center">
          <Link to="/forgot/id" className="underline text-sm text-gray-600 hover:text-gray-900">
            ¿Olvidaste tu contraseña?
          </Link>
        </div>

        {/* Enlaces inferiores */}
        <div className="mt-6 flex justify-between text-sm">
          <Link to="/" className="text-gray-600 hover:text-gray-900 underline">
            
          </Link>
          <Link
            to="/register"
            className="py-2 px-5 bg-[#F5BD45] text-white rounded-full hover:scale-105 duration-300 hover:bg-[#d9a43d]"
          >
            Registrarse
          </Link>
        </div>

      </div>
    </div>
  );
};

export default Login;