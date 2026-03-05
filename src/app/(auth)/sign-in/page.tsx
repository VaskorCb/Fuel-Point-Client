'use client';

import LoginForm from 'components/sections/authentications/login/LoginForm';
import { useAuth } from 'services/auth/auth.hooks';
import paths from 'routes/paths';

export default function SignInPage() {
  const { loginMutation } = useAuth();
  return (
    <LoginForm
      loginMutation={loginMutation}
      signUpLink={paths.signup}
      forgotPasswordLink={paths.forgotPassword}
    />
  );
}
