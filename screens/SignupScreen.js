import { useContext, useState } from 'react';
import { Alert } from 'react-native';

import AuthContent from '../components/Auth/AuthContent';
import {createUser} from "../util/auth.js";
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { AuthContext } from '../store/auth-context';

function SignupScreen() {

  const authCtx = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(false);

  async function signupHandler({email, password}) {
    setIsLoading(true);
    try {
      const token = await createUser(email, password);
      authCtx.authenticate(token);
    } catch(error) {
      Alert.alert("Could not create user", "Please check your inputs or try again later.")
    }
    setIsLoading(false);
  }

  if (isLoading) {
    return <LoadingOverlay
      message="Creating User..."
    />
  }

  return <AuthContent
    onAuthenticate={signupHandler}
  />;
}

export default SignupScreen;
