import { useState } from 'react';
import { useForm } from '../../hooks';
import { AuthLayout } from '../layout';
import { AlertMessage } from '../../ui';
import { Link } from 'react-router-dom';

const formData = {
    email: '',
    password: '',
    name: '',
};

const formValidations = {
    email: [(value) => value.includes('@'), 'El correo debe contener un @'],
    password: [(value) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/.test(value), 'La contraseña debe tener al menos 6 caracteres, incluyendo una mayúscula, una minúscula y un número.'],
    name: [(value) => value.length >= 3, 'El nombre debe tener al menos 3 caracteres'],
};

export const RegisterPage = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { email, password, name, onInputChange, isFormValid, emailValid, passwordValid, nameValid } = useForm(formData, formValidations);
    
    const handleSubmit = (event) => {
        event.preventDefault();
        setIsSubmitting(true);
        if (!isFormValid) return;
        console.log({ email, password, name });
    };

    return (
            <AuthLayout title="Registro">
                <form className="mx-auto w-1/3" onSubmit={handleSubmit}>
                    <div className="relative z-0 w-full mb-5 group">
                        <input
                            type="email"
                            name="email"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray-500 dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            required
                            onChange={onInputChange}
                            value={email}
                            />
                        <label
                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Email
                        </label>
                        {/* Mensaje de error para el email */}
                        {emailValid !== null && isSubmitting && <AlertMessage errorMsg={emailValid} />}
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                        <input
                            type="password"
                            name="password"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray-500 dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            required
                            onChange={onInputChange}
                            value={password}
                        />
                        <label
                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Password
                        </label>
                        {/* Mensaje de error para el password */}
                        {passwordValid !== null && isSubmitting && <AlertMessage errorMsg={passwordValid} />}
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                        <input
                            type="text"
                            name="name"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray-500 dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            required
                            onChange={onInputChange}
                            value={name}
                        />
                        <label
                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Nombre
                        </label>
                        {/* Mensaje de error para el nombre */}
                        {nameValid !== null && isSubmitting && <AlertMessage errorMsg={nameValid} />}
                    </div>
                    <div className="relative z-0 w-full mb-5 group flex items-center justify-between">
                        <button
                            type="submit"
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-32 px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                            Registro
                        </button>
                        <div className='text-center mt-5'>
                            <Link className='text-blue-700 underline' to='/auth/login'>
                                Tienes una cuenta? Inicia sesión
                            </Link>
                        </div>
                    </div>
                </form>
            </AuthLayout>
        );
};
