import { lazy, Suspense, useContext } from "react";
import { Route, Routes } from "react-router-dom";

const Login = lazy(() => import("../pages/Login"));
const Register = lazy(() => import("../pages/Register"));
const Home = lazy(() => import("../pages/Home"));
const Loader = lazy(() => import("../components/loader/Loader"));
const PrivateRoutes = lazy(() => import("../routes/PrivateRoutes"));

import GlobalContextProvider from "../context/GlobalContext";

const AllRoutes = () => {
    return (
        <Suspense fallback={<Loader/>}>
            <Routes>
                {/* public routes */}
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>

                {/* private routes */}
                <Route element={<PrivateRoutes/>}>
                    <Route path="/" element={
                        <GlobalContextProvider>
                            <Home/>
                        </GlobalContextProvider>
                    }/>
                </Route>
            </Routes>
        </Suspense>
    );
}

export default AllRoutes;
