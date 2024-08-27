import { Suspense, lazy, useContext } from "react";

const SideBar = lazy(() => import("../components/SideBar"));
const Loader = lazy(() => import("../components/loader/Loader"));

import { AuthContext } from "../context/AuthContext";

const DashboardLayout = ({ children }) => {

    const { user } = useContext(AuthContext);

    return (
        <Suspense fallback={<Loader/>}>
            <section className="flex bg-graySoft p-8 gap-4 relative h-screen overflow-hidden">
                <SideBar/>
                <main className="w-full rounded-xl h-full flex flex-col gap-4">
                    <div className="bg-white rounded-xl p-4 shadow-lg">
                        <p className="text-xl">Bienvenido, <span className="font-bold">{ user.name || user.data.name }!</span></p>
                    </div>
                    <div className="bg-white shadow-md rounded-lg h-full overflow-y-scroll p-8">
                        { children }
                    </div>
                </main>
            </section>
        </Suspense>
    );
}

export default DashboardLayout;
