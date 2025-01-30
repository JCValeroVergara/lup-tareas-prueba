
import { TaskBoard } from '../components/dashboard';
import { TaskLayout } from '../layout';

export const DashBoardPage = () => {
    return (
        <>
            <TaskLayout>
                <TaskBoard/>
            </TaskLayout>
        </>
    );
};
