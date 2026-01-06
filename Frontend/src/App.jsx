import { useSessionSocket } from './Hooks/useSessionSocket';
import { useSessionFlow } from './Hooks/useSessionFlow';
import { useHeartbeat } from './Hooks/useHeartbeat';
import { useSessionResync } from './Hooks/useSessionResync';
import { useMetrics } from './Hooks/useMetrics';
import { attachAuthInterceptor } from './Services/Api';
import { useAuth } from '@clerk/clerk-react';
import { useEffect } from 'react';

const App = () => {

  const { getToken, isSignedIn } = useAuth();
  const { data } = useMetrics();

  console.log('Metrics Data:', data);
  
  useEffect(() => {
    if(!isSignedIn) return;

    attachAuthInterceptor(getToken);
  }, [isSignedIn, getToken]);
  
  const { startSession } = useSessionFlow();
  useSessionSocket();
  useHeartbeat();
  useSessionResync();
  useMetrics();

  return (
    <div>
      <button
        onClick={() => {
          startSession({
            topic: 'Kafka integration',
            difficulty: 3,
            intent: 'Learning'
          })
        }}
      >
        Start Session
      </button>
    </div>
  )
}

export default App;