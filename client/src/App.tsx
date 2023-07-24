import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import { RecoilRoot } from "recoil";
import { styled } from "styled-components";
import Header from "./components/header/Header";
import Nav from "./components/nav/Nav";
import StartPage from "./pages/StartPage";
import Main from "./pages/Main";
import SignupSelect from "./pages/SignupSelect";
import SignupAgreement from "./pages/SignupAgreement";
import UserSignup from "./pages/UserSignup";
import OwnerSignup from "./pages/OwnerSignup";
import OwnerMyPage from "./pages/OwnerMyPage";
import UserMyPage from "./pages/UserMyPage";
import OtherUserMyPage from "./pages/OtherUserMyPage";
import EditInformationCafePage from "./pages/EditInformationCafePage";
import EditMenuCafePage from "./pages/EditMenuCafePage";
import EditOwnerMyPage from "./pages/EditOwnerMyPage";
import EditPostPage from "./pages/EditPostPage";
import EditUserMyPage from "./pages/EditUserMyPage";
import PostPage from "./pages/PostPage";
import CafePage from "./pages/CafePage";
import CreatePostPage from "./pages/CreatePostPage";
import AllPostsPage from "./pages/AllPostsPage";
import Login from "./pages/Login";
import AddCafeInfoPage from "./pages/AddCafeInfoPage";
import AddCafeMenuPage from "./pages/AddCafeMenuPage";
import EditMenuCafe from "./pages/EditMenuCafePage";
import OauthLoading from "./pages/OauthLoading";
import ScrollToTop from "./components/ScrollToTop";

const queryClient = new QueryClient();
const Container = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 auto;
  width: 100%;
  min-width: 320px;
  max-width: 768px;
  background-color: white;
  padding: 30px; //여기 바꾸는거 여백봐주세요 !
`;

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <Header />
        <Container>
          <ScrollToTop />
          <Routes>
            <Route path='/' element={<StartPage />} />
            <Route path='/main' element={<Main />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signupselect' element={<SignupSelect />} />
            <Route path='/signupagreement' element={<SignupAgreement />} />
            <Route path='/usersignup' element={<UserSignup />} />
            <Route path='/ownersignup' element={<OwnerSignup />} />
            <Route path='/usermy/' element={<UserMyPage />} />
            <Route path='/ownermy/' element={<OwnerMyPage />} />
            <Route path='/otherusermy/:id' element={<OtherUserMyPage />} />
            <Route path='/usermy/edit/:id' element={<EditUserMyPage />} />
            <Route path='/ownermy/edit/:id' element={<EditOwnerMyPage />} />
            <Route path='/cafes/:id' element={<CafePage />} />
            <Route path='/cafes/add' element={<AddCafeInfoPage />} />
            <Route path='/menus/:id/add' element={<AddCafeMenuPage />} />
            <Route
              path='/cafe/edit/information/:id'
              element={<EditInformationCafePage />}
            />
            <Route path='/cafe/edit/menu/:id' element={<EditMenuCafe />} />
            <Route path='/postpage/:postId' element={<PostPage />} />
            <Route
              path='/cafepage/edit/menu/:id'
              element={<EditMenuCafePage />}
            />
            <Route path='/postpage/create' element={<CreatePostPage />} />
            <Route path='/postpage/edit/:postId' element={<EditPostPage />} />
            <Route path='/allposts' element={<AllPostsPage />} />
            <Route path='/loading' element={<OauthLoading />} />
          </Routes>
        </Container>
        <Nav />
      </RecoilRoot>
    </QueryClientProvider>
  );
}

export default App;
