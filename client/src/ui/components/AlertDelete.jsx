import { useDispatch, useSelector } from 'react-redux';
import { Info } from '../icons/Info';
import { StartDeleteTask } from '../../store/taks';

export const AlertDelete = ({ alertMessage, onClose, taskId }) => {
    const dispatch = useDispatch();
    const { loading, error, tasks } = useSelector((state) => state.task);

    const handleCloseDelete = () => {
        onClose();
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(StartDeleteTask(taskId));
        onClose();
    };

    return (
        <section style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)' }} className="overflow-y-scroll flex flex-wrap fixed top-0 left-0 z-50 w-full h-full items-center justify-center">
            <div id="alert-additional-content-2" className="p-4 mb-4 text-red-800 border border-red-300 rounded-lg bg-red-50 dark:text-red-400 dark:border-red-800" role="alert">
                <div className="flex items-center">
                    <Info className="w-6 h-6 me-2" />
                </div>
                <div className="mt-2 mb-4 text-sm">
                    {alertMessage}
                </div>
                <div className="flex items-center justify-center">
                    <button
                        type="button"
                        onClick={handleSubmit}
                        className="text-white bg-red-800 hover:bg-red-900 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-xs px-3 py-1.5 me-2 text-center inline-flex items-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
                    Continuar
                    </button>
                    <button
                        type="button"
                        onClick={handleCloseDelete}
                        className="text-red-800 bg-transparent border border-red-800 hover:bg-red-900 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-xs px-3 py-1.5 text-center dark:hover:bg-red-600 dark:border-red-600 dark:text-red-500 dark:hover:text-white dark:focus:ring-red-800">
                    Cancelar
                    </button>
                </div>
            </div>
        </section>
    );
};
