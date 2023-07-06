import { QueryClient, QueryClientProvider } from 'react-query';
import './App.css';
import { RecoilRoot } from 'recoil';
import AddCafeInfoPage from './pages/AddCafeInfoPage';
import AddPost from './pages/posting/AddPost';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        {/* <AddCafeInfoPage /> */}
        <AddPost cafeName={'이름 모르는 카페'}></AddPost>
      </RecoilRoot>
    </QueryClientProvider>
  );
}

export default App;