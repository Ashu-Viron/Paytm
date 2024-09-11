import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";

export function Dashboard(){
    return (
        <div>
            <Appbar/>
            <div className="m-6">
            <Balance value={"10,000"}/>
            </div>
           <Users/>
        </div>
    )
}