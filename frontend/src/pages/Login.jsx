import { lazy, Suspense } from 'react';

const AuthForm = lazy(() => import('../components/AuthForm'));
const Loader = lazy(() => import('../components/loader/Loader'));

const Login = () => {

    document.title = "Iniciar Sesión | Encontrar la ruta mas corta  ";

    return (
        <Suspense fallback={<Loader/>}>
            <div className='bg-authBg w-full h-screen bg-no-repeat bg-cover'>
                <div className='w-[40%] h-full bg-white flex p-20 items-center'>
                    <AuthForm isRegisterForm={false}/>
                </div>
            </div>
        </Suspense>
    );
}

export default Login;
