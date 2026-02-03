import { useState } from "react";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { Link } from "react-router";
import { useForm } from "react-hook-form";
import { ToastContainer } from "react-toastify";
import { useFetch } from "../hooks/useFetch";

export const Register = () => {
  const [showPassword, setShowPassword] = useState(false);

  const fetchDataBackend = useFetch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const registerUser = async (dataForm) => {
    const url = `${import.meta.env.VITE_BACKEND_URL}/registro`;
    await fetchDataBackend(url, dataForm, "POST");
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
          <span className="text-[#F5BD45]">REGISTRARSE</span>
        </h1>

        <small className="text-gray-600 block mb-6 text-center text-sm">
          Por favor completa tus datos
        </small>

        <form className="space-y-4" onSubmit={handleSubmit(registerUser)}>

          {/* Nombre */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Nombre
            </label>
            <input
              type="text"
              placeholder="Ingresa tu nombre"
              className="block w-full rounded-full border border-gray-300 py-2 px-4 text-gray-700"
              {...register("nombre", { required: "El nombre es obligatorio" })}
            />
            {errors.nombre && (
              <p className="text-red-700 text-sm mt-1">{errors.nombre.message}</p>
            )}
          </div>

          {/* Apellido */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Apellido
            </label>
            <input
              type="text"
              placeholder="Ingresa tu apellido"
              className="block w-full rounded-full border border-gray-300 py-2 px-4 text-gray-700"
              {...register("apellido", { required: "El apellido es obligatorio" })}
            />
            {errors.apellido && (
              <p className="text-red-700 text-sm mt-1">{errors.apellido.message}</p>
            )}
          </div>


          

          {/* Correo */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Correo Electrónico
            </label>
            <input
              type="email"
              placeholder="Ingresa tu correo"
              className="block w-full rounded-full border border-gray-300 py-2 px-4 text-gray-700"
              {...register("email", { required: "El correo electrónico es obligatorio" })}
            />
            {errors.email && (
              <p className="text-red-700 text-sm mt-1">{errors.email.message}</p>
            )}
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
                className="block w-full rounded-full border border-gray-300 py-2 px-4 pr-10 text-gray-700"
                {...register("password", { required: "La contraseña es obligatoria" })}
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-1/2 -translate-y-1/2 right-3 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <MdVisibilityOff size={20} /> : <MdVisibility size={20} />}
              </button>
            </div>

            {errors.password && (
              <p className="text-red-700 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Botón Registro */}
          <button
            type="submit"
            className="py-2 w-full text-center bg-[#17243D] text-white rounded-full hover:scale-105 duration-300 hover:bg-[#1F3059]"
          >
            Registrarse
          </button>
        </form>

        {/* Enlace a Login */}
        <div className="mt-6 flex justify-between text-sm">
          <Link to="/" className="text-gray-600 hover:text-gray-900 underline">
            Regresar
          </Link>
          <Link
            to="/login"
            className="py-2 px-5 bg-[#F5BD45] text-white rounded-full hover:scale-105 duration-300 hover:bg-[#d9a43d]"
          >
            Iniciar Sesión
          </Link>
        </div>

      </div>
    </div>
  );
};

export default Register;
