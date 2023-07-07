import { QueryClient, QueryClientProvider } from 'react-query';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { RecoilRoot } from 'recoil';
import Styled, { styled } from 'styled-components';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Main from './pages/Main';
import SignupSelect from './pages/SignupSelect';
import UserSignup from './pages/UserSignup';
import OwnerSignup from './pages/OwnerSignup';
import OwnerMyPage from './pages/OwnerMyPage';
import UserMyPage from './pages/UserMyPage';
import OtherUserMyPage from './pages/OtherUserMyPage';
import EditInformationCafe from './pages/EditInformationCafe';
import EditMenuCafe from './pages/EditMenuCafe';
import EditOwnerMyPage from './pages/EditOwnerMyPage';
import EditPostPage from './pages/EditPostPage';
import EditUserMyPage from './pages/EditUserMyPage';
import PostPage from './pages/PostPage';
import CafePage from './pages/CafePage';
import CreatePostPage from './pages/CreatePostPage';
import CreateInformationCafe from './pages/CreateInformationCafe';
import CreateMenuCafe from './pages/CreateMenuCafe';
import AllPostPage from './pages/AllPostPage';
import Login from './pages/Login';
import AddCafeInfoPage from './pages/AddCafeInfoPage';

import AddCafeMenuPage from './pages/AddCafeMenuPage';
const queryClient = new QueryClient();
const Container = styled.div`
  display: flex;
  justify-content: center;
  min-height: 700px;
  width: 100vw;
  @media screen and (max-width: 500px) {
    min-height: 400px;
    width: 100vw;
  }
`;
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <Header />
        <Container>
          <Routes>
            <Route path='/' element={<Main />} />
            <Route path='/Login' element={<Login />} />
            <Route path='/signupselect' element={<SignupSelect />} />
            <Route path='/usersignup' element={<UserSignup />} />
            <Route path='/ownersignup' element={<OwnerSignup />} />
            <Route path='/usermypage/:id' element={<UserMyPage />} />
            <Route path='/ownermypage/:id' element={<OwnerMyPage />} />
            <Route path='/otherusermypage/:id' element={<OtherUserMyPage />} />
            <Route path='/usermypage/edit/:id' element={<EditUserMyPage />} />
            <Route path='/ownermypage/edit/:id' element={<EditOwnerMyPage />} />
            <Route path='/cafepage/:id' element={<CafePage />} />
            <Route
              path='/cafepage/create/information'
              element={<CreateInformationCafe />}
            />
            <Route path='/cafepage/create/menu' element={<CreateMenuCafe />} />
            <Route
              path='/cafepage/edit/information/:id'
              element={<EditInformationCafe />}
            />
            <Route path='/cafepage/edit/menu/:id' element={<EditMenuCafe />} />
            <Route path='/postpage/:id' element={<PostPage />} />
            <Route path='/postpage/create' element={<CreatePostPage />} />
            <Route path='/postpage/edit/:id' element={<EditPostPage />} />
            <Route path='/allpostpage' element={<AllPostPage />} />
          </Routes>
        </Container>
        <Footer />
      </RecoilRoot>
    </QueryClientProvider>
  );
}

export default App;
