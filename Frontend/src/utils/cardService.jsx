import UseTheme from "../hooks/UseTheme";

const CardService = ({children, title, description})=>{

    const { theme } = UseTheme();

    return(
        <div className={`${theme ==='dark' ? 'bg-black/25' : 'bg-gray-50'} flex shadow-2xl p-4 rounded-lg max-w-52 lg:max-w-64 gap-5 flex-col my-4`}>
            <div className="rounded-lg rounded-2xl shadow-xl hover:scale-105 transition bg-gradient-to-br from-cyan-500 via-transparent to-indigo-400 p-4 flex flex-col justify-center items-center gap-3">
                {children}
                <h3 className="text-sm md:text-lg font-bold">{title}</h3>
            </div>
            <p className="text-sm md:text-lg">{description}</p>
        </div>
    )
};

export default CardService;