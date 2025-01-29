
import { useDrop } from 'react-dnd';

export const KanbanColumn = ({ status, children, moveTask }) => {
    const [{ canDrop, isOver }, connectDropTarget] = useDrop({
        accept: 'TASK',
        drop: (item) => {
            moveTask(item.id, status);
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    });

    return connectDropTarget(
        <div className={`bg-gray-300 p-4 rounded-lg w-1/3 ${isOver && canDrop ? 'bg-blue-200' : ''}`}>
            <h2 className="font-bold text-lg text-center">{status}</h2>
            <div>{children}</div>
        </div>
    );
};

