import { useContext, useState } from 'react';
import { Alert } from 'react-native';

import AuthContent from '../components/Auth/AuthContent';
import {signin} from "../util/auth.js";
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { AuthContext } from '../store/auth-context';

function LoginScreen() {

  const authCtx = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(false);

  async function loginHandler ({email, password}) {
    setIsLoading(true);
    try {
      const token = await signin(email, password);
      authCtx.authenticate(token);
    } catch(error) {
      Alert.alert("Authentication failed", "Could not log you in, please check your credentials.");
      setIsLoading(false);
    }
  }

  if (isLoading) {
    return <LoadingOverlay
      message="Loggin In..."
    />
  }

  return <AuthContent
    isLogin
    onAuthenticate={loginHandler}
  />;
}

export default LoginScreen;
