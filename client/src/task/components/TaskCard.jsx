
import { useDrag } from 'react-dnd';
import { AlertDelete, Delete, PenEdit } from '../../ui';
import { calculateDays } from '../../helpers';
import { useState } from 'react';
import { TaskAddForm } from './TaskAddForm';

export const TaskCard = ({ task }) => {
    const [showAddTask, setShowAddTask] = useState(false);
    const [showDeleteTask, setShowDeleteTask] = useState(false);
    const [{ isDragging }, connectDrag] = useDrag({
        type: 'TASK',
        item: { id: task.id },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    let daysElapsed;
    if (task.status === 'Completada') {
        daysElapsed = calculateDays(task.createdAt, task.updatedAt);
    } else {
        daysElapsed = calculateDays(task.createdAt, new Date());
    }

    const handleUpdateTask = () => {
        setShowAddTask(true);
    };

    const handleCloseUpdate = () => {
        setShowAddTask(false);
    };

    const handleDeleteTask = () => {
        setShowDeleteTask(true);
    };

    const handleCloseDelete = () => {
        setShowDeleteTask(false);
    };

    return connectDrag(
        <div className={`bg-white p-2 mb-2 rounded shadow ${isDragging ? 'opacity-70' : ''}`}>
            <h3 className="font-semibold mb-1">{task.title}</h3>
            <hr className='text-gray-400' />
            <p className='mb-2'>{task.description}</p>
            <p className="text-sm text-gray-500">Creada el: {new Date(task.createdAt).toLocaleDateString()}</p>
            <p className="text-sm text-gray-500">Días en ejecución: {daysElapsed} días</p>
            {showAddTask && <TaskAddForm formTitle='Actualizar Tarea' onClose={handleCloseUpdate} taskId={task.id} />}
            {showDeleteTask && <AlertDelete alertMessage='¿Estás seguro de eliminar esta tarea?' onClose={handleCloseDelete} taskId={task.id} />}
            <div className='flex justify-end items-center mt-2'>
                <button 
                    onClick={handleUpdateTask} 
                    className="bg-blue-500 mr-2  rounded-full hover:bg-green-500 shadow-lg w-10 h-10 flex items-center justify-center transition-all duration-200 cursor-pointer"
                >
                    <PenEdit className='invert w-4 h-4' />
                </button>
                <button 
                    onClick={handleDeleteTask}
                    className="bg-blue-500  rounded-full hover:bg-red-400 shadow-lg w-10 h-10 flex items-center justify-center transition-all duration-200 cursor-pointer"
                >
                    <Delete className='invert w-4 h-4' />
                </button>
            </div>
        </div>
    );
};

