import { QueryClient, QueryClientProvider } from "react-query";
import './App.css'
import {
  RecoilRoot,
} from 'recoil';

const queryClient = new QueryClient();

function App() {

  return (
    <QueryClientProvider client={queryClient}>
    <RecoilRoot>
    </RecoilRoot>
    </QueryClientProvider>
  )
}

export default App
