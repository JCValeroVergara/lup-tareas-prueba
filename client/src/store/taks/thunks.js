import { addTask, removeTask, setError, setLoading, setTasks, updateTask } from '.';

const URL = import.meta.env.VITE_API_URL;

export const StartLoadingTasks = () => {
    return async (dispatch, getState) => {
        
        const { uid, token } = getState().auth;

        try {
            const response = await fetch(`${URL}/task/user/${uid}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (!response.ok) {
                throw new Error('Error al cargar las tareas');
            }
            const data = await response.json();
            dispatch(setTasks(data));
        } catch (error) {
            dispatch(setError(error));
        }
    };
}

export const StartAddTask = (taskData) => {
    return async (dispatch, getState) => {
        const { uid } = getState().auth;

        dispatch(setLoading());

        try {
            const response = await fetch(`${URL}/task`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${getState().auth.token}`,
                },
                body: JSON.stringify({ ...taskData, userId: uid }),
            });
            if (!response.ok) {
                throw new Error('Error al agregar la tarea');
            }
            const newTask = await response.json();
            dispatch(addTask(newTask));
        } catch (error) {
            dispatch(setError(error));
        }
    };
}

export const StartUpdateTask = (taskId, updatedData) => {
    return async (dispatch) => {
        
        dispatch(setLoading());
        try {
            const response = await fetch(`${URL}/task/${taskId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${getState().auth.token}`,
                },
                body: JSON.stringify(updatedData),
            });
            if (!response.ok) {
                throw new Error('Error al actualizar la tarea');
            }
            const updatedTask = await response.json();
            dispatch(updateTask(updatedTask));
        } catch (error) {
            dispatch(setError(error));
        }
    };
}

export const StartDeleteTask = (taskId) => {
    return async (dispatch) => {
        dispatch(setLoading());

        try {
            const response = await fetch(`${URL}/task/${taskId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${getState().auth.token}`,
                },
            });
            if (!response.ok) {
                throw new Error('Error al eliminar la tarea');
            }
            dispatch(removeTask(taskId));
        } catch (error) {
            dispatch(setError(error));
        }
    };
}
