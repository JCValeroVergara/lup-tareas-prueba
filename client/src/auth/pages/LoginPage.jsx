import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { useForm } from '../../hooks/useForm';
import { AuthLayout } from '../layout';
import { AlertMessage } from '../../ui/components/AlertMessage';
import { starLoginWithEmailAndPassword } from '../../store/auth';

const formData = {
    email: '',
    password: '',
};

const formValidations = {
    email: [(value) => value.includes('@'), 'El correo debe contener un @'],
    password: [(value) => value.length >= 6, 'La contraseña debe tener al menos 6 caracteres'],
};


export const LoginPage = () => {
    const dispatch = useDispatch();
    const { status, errorMessage } = useSelector((state) => state.auth);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { email, password, onInputChange, isFormValid, emailValid, passwordValid } = useForm(formData, formValidations);

    const isAuthenticating = useMemo(() => status === 'checking', [status]);
    
    const handleSubmit = (event) => {
        event.preventDefault();
        setIsSubmitting(true);
        if (!isFormValid) return;
        console.log({ email, password });
        dispatch(starLoginWithEmailAndPassword(email, password));
    };

    return (
        <AuthLayout title="Login">
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
                    {/* Mensaje de error del servidor */}
                    {errorMessage && <AlertMessage errorMsg={errorMessage} />}
                </div>
                <div className="relative z-0 w-full mb-5 group flex items-center justify-between">
                    <button
                        type="submit"
                        disabled={isAuthenticating}
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-32 px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        Login
                    </button>
                    <div className='text-center mt-5'>
                        <Link className='text-blue-700 underline' to='/auth/register'>
                            No tienes una cuenta? Regístrate
                        </Link>
                    </div>
                </div>
            </form>
        </AuthLayout>
    );
};
