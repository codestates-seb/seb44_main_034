import { useState } from 'react';
import { RecoilRoot } from 'recoil';
import {useQuery,useMutation,useQueryClient,QueryClient,QueryClientProvider,} from '@tanstack/react-query';
import './App.css';
import SignupSelect from './components/signupselect/SignupSelect';
const queryClient = new QueryClient();


function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <SignupSelect></SignupSelect>
      </RecoilRoot>
    </QueryClientProvider>
  );
}

export default App;
