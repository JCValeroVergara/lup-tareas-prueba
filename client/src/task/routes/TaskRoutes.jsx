import { Navigate, Route, Routes } from 'react-router-dom';
import { TaskPage } from '../pages';

export const TaskRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<TaskPage />} />

            <Route path="/*" element={<Navigate to="/" />} />
        </Routes>
    );
};
