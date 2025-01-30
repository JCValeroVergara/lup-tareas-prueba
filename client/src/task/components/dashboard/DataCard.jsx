
export const DataCard = ({ title, value }) => {
    return (
        <div className="bg-slate-100 rounded-lg shadow p-4 flex flex-col items-start justify-center">
            <h2 className="text-xl font-semibold">{title}</h2>
            <hr className="w-full my-2 text-gray-300" />
            <div className="w-full flex items-center justify-center">
                <p className="text-xl font-bold">{value}</p>
            </div>
        </div>
    );
};
