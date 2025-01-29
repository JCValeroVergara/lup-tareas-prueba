
export const AuthLayout = ({ children, title }) => {
    return (
        <>
            <div className="container w-full h-screen mx-auto flex flex-col justify-center items-stretch">
                <h1 className='mt-20 text-3xl font-bold text-blue-700'>Bienvenido a Tareas App</h1>
                <div className=' flex flex-col justify-center items-center h-screen w-full'>
                    <div className='mb-10 text-3xl font-bold text-gray-600'>
                        <h1>{title}</h1>
                    </div>
                    {children}
                </div>
            </div>
        </>
    );
};
