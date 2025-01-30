import { checkingCredentials, login, logout } from './';

const URL = import.meta.env.VITE_API_URL;

export const checkingAuthentication = () => {
    return async (dispatch) => {
        dispatch(checkingCredentials());
    };
}

export const validateLocalStorage = () => {
    return async (dispatch) => {
        const token = localStorage.getItem('token');
        if (token) {
            dispatch((login({
                uid: localStorage.getItem('uid'),
                email: localStorage.getItem('email'),
                name: localStorage.getItem('name'),
                token,
            })));
        } else {
            dispatch(logout({}));
        }
    };
}

export const starLoginWithEmailAndPassword = (email, password) => {
    return async (dispatch) => {
        dispatch(checkingCredentials());
        try {
            const response = await fetch(`${URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                const { error } = await response.json();
                dispatch(logout({ errorMessage: error }));
                return;
            }

            const data = await response.json();
            
            localStorage.setItem('token', data.token);
            localStorage.setItem('uid', data.user.id);
            localStorage.setItem('email', data.user.email);
            localStorage.setItem('name', data.user.name);

            dispatch(login({ uid: data.user.id, email: data.user.email, name: data.user.name, token: data.token }));

        } catch (error) {
            console.error(error);
            dispatch(logout({ errorMessage: 'Error al iniciar sesión' }));
        }
    };
}

export const startRegisterWithEmailAndPassword = (email, password, name) => {
    return async (dispatch) => {
        dispatch(checkingCredentials());
        try {
            const response = await fetch(`${URL}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password, name }),
            });

            if (!response.ok) {
                const { error } = await response.json();
                dispatch(logout({ errorMessage: error }));
                return;
            }

            const data = await response.json();
            
            localStorage.setItem('token', data.token);
            localStorage.setItem('uid', data.user.id);
            localStorage.setItem('email', data.user.email);
            localStorage.setItem('name', data.user.name);

            dispatch(login({ uid: data.user.id, email: data.user.email, name: data.user.name, token: data.token }));
        } catch (error) {
            console.error(error);
            dispatch(logout({ errorMessage: 'Error al registrar usuario' }));
        }
    };
}

export const startLogout = () => {
    return async (dispatch) => {

        localStorage.removeItem('token');
        localStorage.removeItem('uid');
        localStorage.removeItem('email');
        localStorage.removeItem('name');

        dispatch(logout({}));
    };
}