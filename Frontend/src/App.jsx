import { useEffect } from "react";
import { useAuth } from '@clerk/clerk-react';
import { attachAuthInterceptor } from './Services/Api';
import { Routes, Route } from 'react-router-dom';
import AppLayout from './Layout/AppLayout';
import Dashboard from "./Pages/Dashboard";
import Session from "./Pages/Session";
import Analytics from "./Pages/Analytics";

const App = () => {
  const { getToken } = useAuth();

  useEffect(() => {
    attachAuthInterceptor(getToken);
  }, [getToken]);

  return (
    <div>
      <AppLayout>
        <Routes>
          <Route path='/dashboard' element={<Dashboard />}/>
          <Route path='/session' element={<Session />}/>
          <Route path='/analytics' element={<Analytics />}/>
        </Routes>
      </AppLayout>
    </div>

  )
}

export default App;