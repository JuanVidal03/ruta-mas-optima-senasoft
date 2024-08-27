import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../services/auth.services";
import { toast } from "react-toastify";

import Loader from "./loader/Loader";

const SideBar = () => {

    const [loading, setLoading] = useState(false);

    const menuItems = [
        { id:1, title: 'Inicio', path: "/", icon: "" },
        { id:2, title: 'Ubicaciones', path: "/locations", icon: "" },
        { id:3, title: 'Usuarios', path: "/users", icon: "" },
    ]

    const navigate = useNavigate();

    const closeSession = async() => {

        setLoading(true)

        try {
            
            const logoutResponse = await logout();
            navigate("/login");
            setLoading(false)
            
            if (logoutResponse.status === 200) return toast.success("Sesion cerrada correctamente.");
            
            toast.error("Error al cerrar sesion.");

        } catch (error) {
            console.log(error);
            setLoading(false);
        }


    }


    return (
        <aside className=' bg-gray-600 h-ful w-[25%] rounded-xl p-6 py-8 text-white'>
            <nav className="flex flex-col gap-4">
                {
                    menuItems.map(menuItem => (
                        <li key={menuItem.id} className="list-none">
                            { menuItem.icon }
                            <NavLink
                                className="text-xl rounded-lg p-3 font-semibold block bg-gray-500 transition-all hover:bg-gray-700" 
                                to={menuItem.path}
                                >
                                { menuItem.title }
                            </NavLink>
                        </li>
                    ))
                }
                <li className="list-none flex">
                    <button
                        onClick={closeSession}
                        className="block p-3 rounded-lg w-full font-semibold text-xl bg-red-500 transition-all text-start hover:bg-red-600"
                    >
                        Cerrar Sesion
                    </button>
                </li>
            </nav>
        </aside>
    );
}

export default SideBar;
