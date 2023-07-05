import { QueryClient, QueryClientProvider } from 'react-query';
import './App.css';
import { RecoilRoot } from 'recoil';
import AddCafeInfoPage from './pages/AddCafeInfoPage';
import AddCafeMenuPage from './pages/AddCafeMenuPage';
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <AddCafeMenuPage />
      </RecoilRoot>
    </QueryClientProvider>
  );
}

export default App;
