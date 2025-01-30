import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AlertMessage } from '../../ui';
import { useForm } from '../../hooks';
import { StartAddTask, StartUpdateTask } from '../../store/taks';


const taskData = {
    title: '',
    description: '',
};

const taskValidations = {
    title: [(value) => value.length > 0, 'El título no puede estar vacío'],
};

export const TaskAddForm = ({formTitle, onClose, taskId}) => {
    const dispatch = useDispatch();
    const { uid } = useSelector((state) => state.auth);
    const { loading, error, tasks } = useSelector((state) => state.task);
    const [isSubmitting, setIsSubmitting] = useState(false);


    const { title, description, onInputChange, isFormValid, titleValid } = useForm(taskData, taskValidations);

    const isLoading = useMemo(() => loading, [loading]);

    useEffect(() => {
        if (taskId) {
            const taskToEdit = tasks.find((task) => task.id === taskId);
            if (taskToEdit) {
                onInputChange({ target: { name: 'title', value: taskToEdit.title } });
                onInputChange({ target: { name: 'description', value: taskToEdit.description } });
            }
        }
    }, [taskId, tasks]);

    const handleSubmit = (event) => {
        event.preventDefault();
        setIsSubmitting(true);

        if (!isFormValid) return;

        if (taskId) {
            dispatch(StartUpdateTask( taskId, { title, description }));
        } else {
            dispatch(StartAddTask({ title, description, userId: uid }));
        }

        setIsSubmitting(false);
        onClose();
    };

    const buttonTitle = taskId ? 'Actualizar' : 'Crear';

    return (
        <section style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)' }} className="overflow-y-scroll flex flex-wrap fixed top-0 left-0 z-50 w-full h-full items-center justify-center">
            <div className="w-1/3 h-1/2 bg-white border-gray-700 rounded-lg shadow border p-5">
                <h2 className="mb-5 text-2xl font-semibold text-center">{formTitle}</h2>
                <form className="w-full h-full" onSubmit={handleSubmit}>
                    <div className="relative z-0 w-full mb-5 group">
                        <input
                            type="text"
                            name="title"
                            className="block py-2.5 px-0 w-full text- text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=""
                            required
                            onChange={onInputChange}
                            value={title}
                            />
                        <label
                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Título
                        </label>
                        {/* Mensaje de error para el titulo */}
                        {titleValid !== null && isSubmitting && <AlertMessage errorMsg={titleValid} />}
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                        <textarea
                            type="text"
                            name="description"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer h-60 max-h-60 overflow-y-auto resize-none"
                            placeholder=" "
                            required
                            onChange={onInputChange}
                            value={description}
                        />
                        <label
                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Descripción
                        </label>
                        {/* Mensaje de error del servidor */}
                        {error && <AlertMessage errorMsg={error} />}
                    </div>
                    <div className="relative z-0 w-full mb-5 group flex items-center justify-between">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="text-white bg-blue-700 hover:bg-green-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-32 px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-green-500 dark:focus:ring-blue-800"
                        >
                            {isLoading ? 'Cargando...' : buttonTitle}
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            className="text-white bg-blue-700 hover:bg-red-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-32 px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-red-500 dark:focus:ring-blue-800"
                        >
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
};
