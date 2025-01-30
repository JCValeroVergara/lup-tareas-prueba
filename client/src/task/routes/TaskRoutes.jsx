import { Navigate, Route, Routes } from 'react-router-dom';
import { DashBoardPage, TaskPage } from '../pages';

export const TaskRoutes = () => {
    return (
        <Routes>
            <Route path="/tasks" element={<TaskPage />} />
            <Route path="/dashboard" element={<DashBoardPage />} />

            <Route path="/*" element={<Navigate to="/tasks" />} />
        </Routes>
    );
};
