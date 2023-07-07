import { useState } from 'react'
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
      <div>
        카페인 테스트 메세지입니다.
      </div>
    </RecoilRoot>
    </QueryClientProvider>
  )
}

export default App
