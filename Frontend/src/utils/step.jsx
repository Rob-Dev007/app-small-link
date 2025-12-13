import UseTheme from "../hooks/UseTheme";

const Step = ({ title, description, icon: Icon }) => {

    const { theme } = UseTheme();

  return (
    <div className={`${theme === 'dark' ? 'bg-black/25' : 'bg-gray-50'} p-6 rounded-2xl shadow-md text-center hover:scale-105 transition`}>
      {Icon && <Icon className="text-4xl mx-auto mb-3 text-cyan-500" />}
      <h3 className="text-lg font-bold mb-2">{title}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
    </div>
  );
};


export default Step;