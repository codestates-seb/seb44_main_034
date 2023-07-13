import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';

const GoogleLoginButton: React.FC = () => {
  const replace = useNavigate();
  return (
    <GoogleOAuthProvider clientId='16595871342-4qu56vpa8d182pej76ch07s9fohf7tpp.apps.googleusercontent.com'>
      <GoogleLogin
        shape='circle'
        type='icon'
        onSuccess={(header) => {
          console.log(header);
          replace('/');
        }}
        onError={() => {
          console.log('Login Failed');
        }}
      />
    </GoogleOAuthProvider>
  );
};

export default GoogleLoginButton;
