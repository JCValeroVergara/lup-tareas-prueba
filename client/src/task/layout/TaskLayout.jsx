import { useState } from 'react';
import { Navbar } from '../../ui';
import { TaskAddForm } from '../components';


export const TaskLayout = ({ children }) => {
    const [showAddTask, setShowAddTask] = useState(false);

    const handleAddTask = () => {
        setShowAddTask(true);
    };

    const handleCloseAddTask = () => {
        setShowAddTask(false);
    };


    return (
        <>
            {showAddTask && <TaskAddForm formTitle='Añadir Tarea' onClose={handleCloseAddTask} />}
            <div className="w-full h-screen flex flex-col justify-center">
                <Navbar />

                <div className='flex flex-col justify-center items-center h-screen w-full'>
                    <button 
                        onClick={handleAddTask}
                        title='Añadir Tarea'
                        className="absolute top-15 right-4 bg-blue-500  rounded-full hover:bg-green-500 shadow-lg w-14 h-14 flex items-center justify-center transition-all duration-200 cursor-pointer"
                    >
                        <span className='flex justify-center items-center text-white text-center text-4xl transform -translate-y-0.5'>+</span>
                    </button>
                    {children}
                </div>
            </div>
        </>
    );
};
