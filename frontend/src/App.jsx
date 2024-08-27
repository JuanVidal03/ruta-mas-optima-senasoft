import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import AllRoutes from './routes/AllRoutes';

import AuthContextProvider from './context/AuthContext';

const App = () => {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <AllRoutes/>
        <ToastContainer stacked/>
      </BrowserRouter>
    </AuthContextProvider>
  )
}

export default App
