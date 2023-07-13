import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { RecoilRoot } from 'recoil';
import { styled } from 'styled-components';
import Header from './components/header/Header';
import Nav from './components/nav/Nav';
// import Footer from './components/footer/Footer';
import Main from './pages/Main';
import SignupSelect from './pages/SignupSelect';
import UserSignup from './pages/UserSignup';
import OwnerSignup from './pages/OwnerSignup';
import OwnerMyPage from './pages/OwnerMyPage';
import UserMyPage from './pages/UserMyPage';
import OtherUserMyPage from './pages/OtherUserMyPage';
import EditInformationCafe from './pages/EditInformationCafe';
import EditMenuCafePage from './pages/EditMenuCafePage';
import EditOwnerMyPage from './pages/EditOwnerMyPage';
import EditPostPage from './pages/EditPostPage';
import EditUserMyPage from './pages/EditUserMyPage';
import PostPage from './pages/PostPage';
import CafePage from './pages/CafePage';
import CreatePostPage from './pages/CreatePostPage';
import AllPostPage from './pages/AllPostPage';
import Login from './pages/Login';
import AddCafeInfoPage from './pages/AddCafeInfoPage';
import AddCafeMenuPage from './pages/AddCafeMenuPage';
const queryClient = new QueryClient();
const Container = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 auto;
  width: 100%;
  min-width: 320px;
  max-width: 768px;
`;

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <Header />
        <Container>
          <Routes>
            <Route path='/' element={<Main />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signupselect' element={<SignupSelect />} />
            <Route path='/usersignup' element={<UserSignup />} />
            <Route path='/ownersignup' element={<OwnerSignup />} />
            <Route path='/usermypage/' element={<UserMyPage />} />
            <Route path='/ownermypage/' element={<OwnerMyPage />} />
            <Route path='/otherusermypage/:id' element={<OtherUserMyPage />} />
            <Route path='/usermypage/edit/:id' element={<EditUserMyPage />} />
            <Route path='/ownermypage/edit/:id' element={<EditOwnerMyPage />} />
            <Route path='/cafepage/:id' element={<CafePage />} />
            <Route
              path='/cafepage/create/information'
              element={<AddCafeInfoPage />}
            />
            <Route path='/cafepage/create/menu' element={<AddCafeMenuPage />} />
            <Route
              path='/cafepage/edit/information/:id'
              element={<EditInformationCafe />}
            />
            <Route
              path='/cafepage/edit/menu/:id'
              element={<EditMenuCafePage />}
            />
            <Route path='/postpage/:id' element={<PostPage />} />
            <Route path='/postpage/create' element={<CreatePostPage />} />
            <Route path='/postpage/edit/:id' element={<EditPostPage />} />
            <Route path='/allpostpage' element={<AllPostPage />} />
          </Routes>
        </Container>
        <Nav />
      </RecoilRoot>
    </QueryClientProvider>
  );
}

export default App;
