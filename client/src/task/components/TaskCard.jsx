
import { useDrag } from 'react-dnd';

export const TaskCard = ({ task }) => {
    const [{ isDragging }, connectDrag] = useDrag({
        type: 'TASK',
        item: { id: task.id },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    return connectDrag(
        <div className={`bg-white p-2 mb-2 rounded shadow ${isDragging ? 'opacity-50' : ''}`}>
            <h3 className="font-semibold">{task.title}</h3>
            <p>{task.description}</p>
        </div>
    );
};

