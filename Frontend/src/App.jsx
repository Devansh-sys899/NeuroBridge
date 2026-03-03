import { useEffect } from "react";
import { useAuth } from '@clerk/clerk-react';
import { attachAuthInterceptor } from './Services/Api';
import { Routes, Route } from 'react-router-dom';
import AppLayout from './Layout/AppLayout';
import Session from "./Pages/Session";
import Analytics from "./Pages/Analytics";
import Dashboard from "./Pages/Dashboard";
import SignInPage from "./Pages/SignInPage";

const App = () => {
  const { getToken } = useAuth();

  useEffect(() => {
    attachAuthInterceptor(getToken);
  }, [getToken]);

  return (
    <div>
      <AppLayout>
        <Routes>
          <Route path='/' element={<SignInPage />} />
          <Route path='/dashboard' element={<Dashboard />}/>
          <Route path='/session' element={<Session />}/>
          <Route path='/analytics' element={<Analytics />}/>
          <Route path='/sign-in' element={<SignInPage />} />
        </Routes>
      </AppLayout>
    </div>

  )
}

export default App;