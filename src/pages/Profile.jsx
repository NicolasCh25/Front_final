import CardPassword from '../components/profile/CardPassword'
import { CardProfile } from '../components/profile/CardProfile'
import FormProfile from '../components/profile/FormProfile'

const Profile = () => {
    return (
        <>       
            {/* TÍTULO */}
            <div className="text-center mb-8">
                <h1 className='font-black text-4xl text-gray-600'>Perfil</h1>
                <hr className='my-4 border-gray-300'/>
                <p className='text-gray-500'>Este módulo te permite gestionar el perfil del usuario</p>
            </div>

            {/* CONTENEDOR EN COLUMNA Y CENTRADO */}
            <div className='flex flex-col gap-y-10 items-center'>

                

                {/* FORMULARIO DE ACTUALIZAR DATOS */}
                <div className='w-full max-w-2xl'>
                    <FormProfile />
                </div>

                {/* TARJETA PARA CAMBIAR CONTRASEÑA */}
                <div className='w-full max-w-2xl'>
                    <CardPassword />
                </div>

            </div>
        </>
    )
}

export default Profile
