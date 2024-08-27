import { useEffect, useContext } from "react";
import { Suspense, lazy, useState } from "react";
import { toast } from "react-toastify";

const Map = lazy(() => import("../components/Map"));
const Loader = lazy(() => import("../components/loader/Loader"));
const DashboardLayout = lazy(() => import("../layout/Dashboard.layout"));

import { createLocationService } from "../services/location.services";

import { GlobalContext } from "../context/GlobalContext";

const Home = () => {

    document.title = "Inicio | Encuentra la ruta mas corta";

    const { setLocationData, setFormLocationState, formLocationState } = useContext(GlobalContext);

    const [latitudInicio, setLatitudInicio] = useState(2.4448);
    const [longitudInicio, setLongitudInicio] = useState(76.6147);
    const [inputLatitudInicio, setInputLatitudInicio] = useState(0);
    const [inputLongitudInicio, setInputLongitudInicio] = useState(0);
    const [tituloInicio, setTituloInicio] = useState("");

    const [latitudFin, setLatitudFin] = useState(0);
    const [longitudFin, setLongitudFin] = useState(0);
    const [inputLatitudFin, setInputLatitudFin] = useState(0);
    const [inputLongitudFin, setInputLongitudFin] = useState(0);
    const [tituloFin, setTituloFin] = useState("");


    const saveLocation = async() => {

        try {

            if(tituloInicio === "" || tituloFin === "") return toast.error("Debes tener ambos titulos.", { closeOnClick: true });

            const esquemaInicio = {
                name: tituloInicio,
                posY: latitudInicio,
                posX: -longitudInicio
            }

            const esquemaFin = {
                name: tituloFin,
                posY: latitudFin,
                posX: -longitudFin
            }

            setLocationData([esquemaInicio, esquemaFin]);
            formLocationState ? setFormLocationState(false) : setFormLocationState(true);

            const ubicacionInicio = await createLocationService(esquemaInicio);
            const ubicacionFin = await createLocationService(esquemaFin);

            if (ubicacionFin.status === 201 && ubicacionInicio.status === 201) return toast.success("Ubicaciones agregadas exitosamente!");

        } catch (error) {
            console.log(error);
            return error;
        }

    }

    useEffect(() => {

        const parsedLongitudInicio = parseFloat(inputLongitudInicio);
        const parsedLatitudInicio = parseFloat(inputLatitudInicio);

        const parsedLatitudFin = parseFloat(inputLatitudFin);
        const parsedLongitudFin = parseFloat(inputLongitudFin);

        setLatitudInicio(parsedLatitudInicio);
        setLongitudInicio(parsedLongitudInicio);
        
        setLatitudFin(parsedLatitudFin);
        setLongitudFin(parsedLongitudFin);

    }, [inputLatitudFin, inputLatitudInicio, inputLongitudInicio, inputLongitudFin]);

    return (
        <Suspense fallback={<Loader/>}>

            <DashboardLayout>
                <div className="w-full">
                    <div>
                        <h1 className="text-4xl font-bold uppercase">Encuentra la ruta mas corta para tu destino</h1>

                        <div className="flex pt-8">
                            <div className="w-full">
                                <h3 className="mb-3 font-semibold">Ingresa tu ruta de inicio:</h3>
                                <div className="flex flex-col gap-2">
                                    <input onChange={(e) => setTituloInicio(e.target.value)} className="border p-2 rounded-lg w-[80%] outline-none transition-all bg-gray-100 focus:shadow-md" type="text" placeholder="Nombre de la ubicacion"/>
                                    <input onChange={(e) => setInputLatitudInicio(e.target.value)} className="border p-2 rounded-lg w-[80%] outline-none transition-all bg-gray-100 focus:shadow-md" type="number" placeholder="Latitud"/>
                                    <input onChange={(e) => setInputLongitudInicio(e.target.value)} className="border p-2 rounded-lg w-[80%] outline-none transition-all bg-gray-100 focus:shadow-md" type="number" placeholder="Longitud"/>
                                </div>
                            </div>
                            <div className="w-full">
                                <h3 className="mb-3 font-semibold">Ingresa tu ruta de fin:</h3>
                                <div className="flex flex-col gap-2">
                                    <input onChange={(e) => setTituloFin(e.target.value)} className="border p-2 rounded-lg w-[80%] outline-none transition-all bg-gray-100 focus:shadow-md" type="text" placeholder="Nombre de la ubicacion"/>
                                    <input onChange={(e) => setInputLatitudFin(e.target.value)} className="border p-2 rounded-lg w-[80%] outline-none transition-all bg-gray-100 focus:shadow-md" type="number" placeholder="Latitud"/>
                                    <input onChange={(e) => setInputLongitudFin(e.target.value)} className="border p-2 rounded-lg w-[80%] outline-none transition-all bg-gray-100 focus:shadow-md" type="number" placeholder="Longitud"/>
                                </div>
                            </div>
                            <div className="flex justify-center items-center">
                                <button onClick={saveLocation} className="px-8 py-3 bg-black text-white border font-bold uppercase">Agregar</button>
                            </div>
                        </div>

                    </div>
                    
                    <div className="py-12 flex justify-center items-center">
                        <Map
                            longitud={longitudInicio}
                            latitud={latitudInicio}
                        />
                    </div>
                </div>

            </DashboardLayout>

        </Suspense>
    );
}

export default Home;
