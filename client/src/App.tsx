import { QueryClient, QueryClientProvider } from 'react-query';
import './App.css';
import { RecoilRoot } from 'recoil';
import AddCafeInfoPage from './pages/AddCafeInfoPage';
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <AddCafeInfoPage />
      </RecoilRoot>
    </QueryClientProvider>
  );
}

export default App;
