import { useEffect } from "react";
import { useAuth } from '@clerk/clerk-react';
import { attachAuthInterceptor } from './Services/Api';
import AppLayout from './Layout/AppLayout';
import Dashboard from "./Pages/Dashboard";

const App = () => {
  const { getToken } = useAuth();

  useEffect(() => {
    attachAuthInterceptor(getToken);
  }, [getToken]);

  return (
    <div>
      <AppLayout>
        <Dashboard />
      </AppLayout>
    </div>
  )
}

export default App;