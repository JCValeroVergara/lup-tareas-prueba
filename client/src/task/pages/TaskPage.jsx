import { TasksKanban } from '../components';
import { TaskLayout } from '../layout/TaskLayout';

export const TaskPage = () => {
    return (
        <>
            <TaskLayout>
                <TasksKanban />
            </TaskLayout>
        </>
    );
};
