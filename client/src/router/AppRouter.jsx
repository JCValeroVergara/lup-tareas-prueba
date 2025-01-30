import { Navigate, Route, Routes } from 'react-router-dom';
import { TaskRoutes } from '../task/routes';
import { AuthRoutes } from '../auth/routes';


export const AppRouter = () => {

    const status = 'authenticated'; // 'authenticated' or 'not-authenticated'

    return (
        <Routes>
            {
                (status === 'authenticated')
                    ? <Route path="/*" element={<TaskRoutes />} />
                    : <Route path="/auth/*" element={<AuthRoutes />} />
            }
            <Route path="/*" element={<Navigate to="/auth/login" />} />
        </Routes>
    );
};
