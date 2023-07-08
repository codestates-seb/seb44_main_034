import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

const GoogleLoginButton: React.FC = () => {
  return (
    <GoogleOAuthProvider clientId='668048382423-t9ksgi5lv9urphnrv4dm428gc01bh32o.apps.googleusercontent.com'>
      <GoogleLogin
        shape='circle'
        type='icon'
        onSuccess={(credentailRespones) => {
          console.log(credentailRespones);
        }}
        onError={() => {
          console.log('Login Failed');
        }}
      />
    </GoogleOAuthProvider>
  );
};

export default GoogleLoginButton;
