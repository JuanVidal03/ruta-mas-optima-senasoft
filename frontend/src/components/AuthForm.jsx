import { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import eye from "../assets/eye.svg";
import eyeSlash from "../assets/eye-slash.svg"

import { loginService } from "../services/auth.services";

import { AuthContext } from "../context/AuthContext";

const AuthForm = ({ isRegisterForm }) => {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const [isPasswordHidden, setIsPasswordHidden] = useState(true);

    const { setUser, setIsAuthenticated, isAuthenticated } = useContext(AuthContext);

    const navigate = useNavigate();

    const authEvent = handleSubmit(async(data) => {
        
        const login = await loginService(data);

        if(login.status && login.status === 200){
            setUser(login.data.data);
            setIsAuthenticated(true);
            navigate("/");
        }

    });


    return (
        <div className=" w-full">
            <div className="mb-8">
                <h1 className="text-4xl font-semibold">¡Bienvenido de vuelta!</h1>
                <p className="text-lg">Te estabamos esperando.</p>
            </div>
            <form
                className="space-y-3"
                onSubmit={(e) => {
                    e.preventDefault();
                    authEvent();
            }}>

                {
                    isRegisterForm && (
                        <div className="w-full">
                            <label className="mb-1 block">Nombre completo*</label>
                            <input
                                autoComplete="off"
                                className="border-gray-300 border w-full p-3 rounded-lg outline-none transition-all focus:bg-gray-100"
                                type="text"
                                placeholder="Carlos Pérez"
                                {
                                    ...register("name", {
                                        required: {
                                            value: true,
                                            message: "Este campo es obligatorio."
                                        },
                                    })
                                }
                            />
                            { errors.name && <span className="text-red-500 block">{errors.name.message}</span> }
                        </div>
                    )
                }

                <div className="w-full">
                    <label className="mb-1 block">Correo eléctronico*</label>
                    <input
                        className="border-gray-300 border w-full p-3 rounded-lg outline-none transition-all focus:bg-gray-100"
                        type="email"
                        placeholder="carlosperez@gmail.com"
                        {
                            ...register("email", {
                                required: {
                                    value: true,
                                    message: "Este campo es obligatorio."
                                },
                                pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                    message: 'El formato del email no es válido',
                                },
                            })
                        }
                    />
                    { errors.email && <span className="text-red-500 block">{errors.email.message}</span> }
                </div>

                {
                    isRegisterForm && (
                        <div className="w-full">
                            <label className="mb-1 block">Dirección*</label>
                            <input
                                className="border-gray-300 border w-full p-3 rounded-lg outline-none transition-all focus:bg-gray-100"
                                type="text"
                                placeholder="Calle 5 # 44-80"
                                {
                                    ...register("direccion", {
                                        required: {
                                            value: true,
                                            message: "Este campo es obligatorio."
                                        }
                                    })
                                }
                            />
                            { errors.direccion && <span className="text-red-500 block">{errors.direccion.message}</span> }
                        </div>
                    )
                }

                <div className="w-full relative">
                    <label className="mb-1 block">Contraseña*</label>
                    <input
                        className="border-gray-300 border w-full p-3 rounded-lg outline-none transition-all focus:bg-gray-100"
                        type={ isPasswordHidden ? "password" : "text" }
                        placeholder="••••••••••••"
                        {
                            ...register("password", {
                                required: {
                                    value: true,
                                    message: "Este campo es obligatorio."
                                },
                                minLength: {
                                    value: 6,
                                    message: "Debe tener minimo 6 valores."
                                }
                            })
                        }
                    />
                    { errors.password && <span className="text-red-500 block">{errors.password.message}</span> }
                    <div className="absolute w-7 top-[55%] right-5">
                        <img
                            className="text-gray-500 cursor-pointer"
                            onClick={() => isPasswordHidden ? setIsPasswordHidden(false) : setIsPasswordHidden(true)}
                            src={ isPasswordHidden ? eyeSlash : eye }
                        />
                    </div>
                </div>

                <div className="pt-4">
                    <button className="transition-all hover:tracking-wider hover:shadow-xl w-full bg-dark text-white font-semibold py-3 rounded-lg">Ingresar</button>
                </div>
            </form>
        </div>
    );
}

export default AuthForm;
