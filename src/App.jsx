import { MecaContextProvider } from './context/MecaContext';
import { RouterApp } from './router/RouterApp';

const App = () => {

  return (
    <MecaContextProvider>
      <RouterApp />
    </MecaContextProvider>
  );
};
export default App;