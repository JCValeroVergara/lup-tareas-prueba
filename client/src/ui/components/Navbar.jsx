import { NavLink } from 'react-router-dom';

export const Navbar = () => {
    return (
        <>
            <div className="w-full h-14 bg-blue-600 text-white flex items-center justify-between">
                <div className="flex items-center ml-4 text-2xl font-semibold">
                    <h1>App Tareas de: Juan Perez</h1>
                </div>
                <div className="flex items-center mr-4">
                    <ul className='flex flex-row space-x-4 text-xl'>
                        <NavLink to='/dashboard' className={({ isActive }) => isActive ? 'font-bold opacity-50' : 'font-bold'}>DashBoard</NavLink>
                        <NavLink to='/tasks' className={({ isActive }) => isActive ? 'font-bold opacity-50' : 'font-bold'}>Tareas</NavLink>
                    </ul>
                    <div className='ml-4'>
                        <button className='mr-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-800'>Logout</button>
                    </div>
                </div>
            </div>
        </>
    );
};
