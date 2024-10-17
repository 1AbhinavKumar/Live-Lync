import getUsers from "../actions/getUser"
import Sidebar from "../components/sidebar/Sidebar"
import UserList from "./components/UserList"

// layout after the login page i.e chat page 
export default async function UsersLayout({
    children 
}: {
    children : React.ReactNode
}) {
    const users = await getUsers()   // fetches the array of users 
    return (
        <Sidebar>
        <div className=" h-full"> 
            <UserList items={users} />
            {children}
        </div>
        </Sidebar>
    )
}