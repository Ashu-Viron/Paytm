const colorClasses = {
    green: {
      900: "bg-green-900 hover:bg-green-800",
      500: "bg-green-500 hover:bg-green-700",
    },
    red: {
      900: "bg-red-900 hover:bg-red-800",
      500: "bg-red-500 hover:bg-red-600",
    },
    gray: {
      900: "bg-gray-900 hover:bg-gray-800",
      500: "bg-gray-500 hover:bg-gray-800",
    },
    // Add more colors and shades as needed
  };
export function Button({label,onClick,color,number}){
    const colorClass = colorClasses[color]?.[number] || colorClasses["gray"]["500"];
    return(
            <button onClick={onClick} type="button" className={`w-full text-white ${colorClass} focus:outline-none h-11 rounded-lg`}>{label}</button>
    )
}