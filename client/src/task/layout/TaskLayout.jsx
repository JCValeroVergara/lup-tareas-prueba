import { Navbar } from '../../ui';


export const TaskLayout = ({children}) => {
    return (
        <>
            <div className="w-full h-screen flex flex-col justify-center">
                <Navbar />
                <div className='flex flex-col justify-center items-center h-screen w-full'>
                    {children}
                </div>
            </div>
        </>
    );
};
