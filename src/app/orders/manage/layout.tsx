import { ReactNode } from "react";

export default function ManageOrderLayout ({children , dashboard, manage} : 
    {children:ReactNode, dashboard:ReactNode, manage:ReactNode}) {
    return (
        <div className="flex-col w-full">
            { children }
            { dashboard }
            { manage }
        </div>
    )
}