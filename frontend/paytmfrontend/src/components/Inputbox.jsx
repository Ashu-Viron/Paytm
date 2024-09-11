export function InputBox({placeholder,label,OnChange}){
    return(
    <div>
        <div className="font-medium text-left py-2 text-sm">{label}</div>
        <input onChange={OnChange} className="font-thin w-full px-2 py-1" placeholder={placeholder}></input>
    </div>
    )
}