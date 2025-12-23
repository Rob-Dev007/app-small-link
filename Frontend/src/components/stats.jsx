import UseTheme from "../hooks/UseTheme";

const stats = [
  { label: "Enlaces acortados", value: "1000", suffix: "+" },
  { label: "Usuarios activos", value: "100", suffix: "+" },
  { label: "Tiempo de actividad", value: "99.9", suffix: "%" },
];

const Stats = () => {

    const {theme} = UseTheme();

    return(
        <div className="grid md:grid-cols-3 gap-8 my-6">
            {stats.map((stat, index) => (
            <div
                key={index}
                className={`${theme === 'dark' ? 'bg-black/25' : 'bg-gray-50'} text-center p-6 rounded-2xl shadow-xl`}
            >
                <p className="text-3xl font-bold text-cyan-600">{stat.value}<span>{stat.suffix}</span></p>
                <p className="text-sm text-gray-500 mt-2">{stat.label}</p>
            </div>
            ))}
        </div>
    )
};

export default Stats;
