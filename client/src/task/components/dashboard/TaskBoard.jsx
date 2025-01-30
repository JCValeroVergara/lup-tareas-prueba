import { useSelector } from 'react-redux';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { DataCard } from './DataCard';

Chart.register(...registerables);


export const TaskBoard = () => {
    const { tasks } = useSelector((state) => state.task);

    const totalTasksActive = tasks.filter((task) => task.active).length;
    const totalTasksCompleted = tasks.filter((task) => task.status === 'Completada').length;
    const totalTasksProcessing = tasks.filter((task) => task.status === 'En Proceso').length;
    const totalTasksNotStarted = tasks.filter((task) => task.status === 'Sin Iniciar').length;
    const totalTasksDeleted = tasks.filter((task) => !task.active && task.status !== 'Completada').length;
    
    //Porcentaje de tareas completadas vs pendientes
    const percentageCompleted = ((totalTasksCompleted / totalTasksActive) * 100).toFixed(2) || 0;
    const percentagePending = (100 - percentageCompleted).toFixed(2);

    //Tiempo promedio de tareas completadas
    const completedTasks = tasks.filter((task) => task.status === 'Completada' && task.createdAt && task.updatedAt);
    const avgCompletionTime = completedTasks.length > 0
        ? (completedTasks.reduce((acc, task) => acc + (new Date(task.updatedAt) - new Date(task.createdAt)), 0) / completedTasks.length / 1000 / 60 / 60).toFixed(2)
        : 0;
    
    //Días de mayor productividad
    const completedTasksByDay = completedTasks.reduce((acc, task) => {
        const day = new Date(task.updatedAt).toLocaleDateString('es-ES', { weekday: 'long' });
        acc[day] = (acc[day] || 0) + 1;
        return acc;
    }, {});
    
    const sortedDays = Object.entries(completedTasksByDay).sort((a, b) => b[1] - a[1]);
    const mostProductiveDay = sortedDays.length > 0 ? sortedDays[0][0] : 'No hay datos';

    //Tasas de abandonos
    const abandonmentRate = totalTasksActive
        ? ((totalTasksDeleted / totalTasksActive) * 100).toFixed(2)
        : 0;



        // Datos para el gráfico de barras
    const barChartData = {
        labels: ['Completadas', 'En Proceso', 'Sin Iniciar', 'Eliminadas'],
        datasets: [
            {
                label: 'Número de Tareas',
                data: [totalTasksCompleted, totalTasksProcessing, totalTasksNotStarted, totalTasksDeleted],
                backgroundColor: ['#2ECC71', '#F8C471', '#C39BD3', '#F44336'],
            },
        ],
    };

    // Datos para el gráfico de pastel
    const pieChartData = {
        labels: ['Completadas', 'Pendientes'],
        datasets: [
            {
                label: 'Tareas',
                data: [totalTasksCompleted, totalTasksActive - totalTasksCompleted],
                backgroundColor: ['#7FB3D5', '#F0B27A'],
            },
        ],
    };

    return (
        <div className="w-full h-[90vh] p-6 flex flex-col">
            <div className='mb-4 w-full justify-center'>
                <h1 className="text-2xl font-semibold mb-4">Dashboard Analítico</h1>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8" >
                <DataCard title="Total de tareas activas" value={totalTasksActive} />
                <DataCard title="Tareas completadas" value={totalTasksCompleted} />
                <DataCard title="Tareas en proceso" value={totalTasksProcessing} />
                <DataCard title="Tareas sin iniciar" value={totalTasksNotStarted} />
                <DataCard title="Porcentaje de tareas completadas" value={`${percentageCompleted}%`} />
                <DataCard title="Porcentaje de tareas pendientes" value={`${percentagePending}%`} />
                <DataCard title="Tiempo promedio de tareas completadas" value={`${avgCompletionTime} horas`} />
                <DataCard title="Día más productivo" value={mostProductiveDay} />
                <DataCard title="Tareas eliminadas" value={totalTasksDeleted} />
                <DataCard title="Tasa de abandono" value={`${abandonmentRate}%`} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                <div className="bg-white rounded-lg shadow p-4">
                    <h2 className="text-xl font-semibold">Gráfico de Tareas</h2>
                    <Bar data={barChartData} />
                </div>

                <div className="bg-white rounded-lg shadow p-4 flex flex-col items-center">
                    <h2 className="text-xl font-semibold">Porcentaje de Tareas Completadas</h2>
                    <div className="w-[65%] h-[65%] flex justify-center items-center">
                        <Pie
                            data={pieChartData}
                            options={{
                                responsive: true,
                                maintainAspectRatio: true,
                            }}
                        />

                    </div>
                </div>
            </div>
        </div>
    );
};
