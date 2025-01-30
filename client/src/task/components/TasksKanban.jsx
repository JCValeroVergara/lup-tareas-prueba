
import { useDispatch, useSelector } from 'react-redux';
import { DndProvider } from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';
import {KanbanColumn} from './TaskColumn';
import { TaskCard } from './TaskCard';
import { StartUpdateTask } from '../../store/taks';

const statuses = ['Sin Iniciar', 'En Proceso', 'Completada'];


export const TasksKanban = () => {
    const dispatch = useDispatch();
    const tasks = useSelector((state) => state.task.tasks) || [];

    const moveTask = (taskId, newStatus) => {
        
        const taskToUpdate = tasks.find((task) => task.id === taskId);
        if (taskToUpdate) {
            dispatch(StartUpdateTask(taskId, { status: newStatus }));
        }
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="w-full h-[90vh] flex justify-center space-x-4 px-4">
                {tasks.length === 0 ? (
                    <div className="flex items-stretch justify-center w-full h-full">
                        <p className="text-2xl text-gray-500">No hay tareas creadas. ¡Empieza a añadir algunas!</p>
                    </div>
                ) : (
                    statuses.map((status) => (
                        <KanbanColumn key={status} status={status} moveTask={moveTask}>
                            {tasks
                                .filter((task) => task.active === true)
                                .filter((task) => task.status === status)
                                .map((task) => (
                                    <TaskCard key={task.id} task={task} />
                                ))}
                        </KanbanColumn>
                    ))
                )}
            </div>
        </DndProvider>
    );
};
