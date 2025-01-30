import { useDispatch } from 'react-redux';
import { AppRouter } from './router';
import { useEffect } from 'react';
import { validateLocalStorage } from './store/auth';


export function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(validateLocalStorage());
    }, [dispatch]);

    return (
        <>
            <AppRouter />
        </>
    )
}

