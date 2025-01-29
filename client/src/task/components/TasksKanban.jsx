
import { DndProvider } from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';
import {KanbanColumn} from './TaskColumn';
import {TaskCard} from './TaskCard';
import { useState } from 'react';

const statuses = ['Sin Iniciar', 'En Proceso', 'Completada'];

const initialTasks = [
    {
        id: '5fe37a7c-721b-499c-881a-68d06a194ae9',
        title: 'Tercera Tarea',
        description: '',
        status: 'Sin Iniciar',
    },
    {
        id: '51a129a7-2d6c-47f0-9e44-4f6bcdda9751',
        title: 'Cuarta Tarea',
        description: '',
        status: 'Sin Iniciar',
    },
    {
        id: 'aa121a0d-a36f-4976-934e-321814488912',
        title: 'Primera Tarea',
        description: '',
        status: 'Sin Iniciar',
    },
    {
        id: '5254c2e4-0592-4f58-95e8-a912a0ae322c',
        title: 'Segunda Tarea',
        description: '',
        status: 'Sin Iniciar',
    },
];

export const TasksKanban = () => {
    const [tasks, setTasks] = useState(initialTasks);

    const moveTask = (taskId, newStatus) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.id === taskId ? { ...task, status: newStatus } : task
            )
        );
        console.log(`Moving task ${taskId} to ${newStatus}`);
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="w-full h-[90vh] flex justify-center space-x-4 px-4">
                {statuses.map((status) => (
                    <KanbanColumn key={status} status={status} moveTask={moveTask}>
                        {tasks
                            .filter((task) => task.status === status)
                            .map((task) => (
                                <TaskCard key={task.id} task={task} />
                            ))}
                    </KanbanColumn>
                ))}
            </div>
        </DndProvider>
    );
};
