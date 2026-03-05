'use client';

import SignupForm from 'components/sections/authentications/signup/SignupForm';
import { useAuth } from 'services/auth/auth.hooks';

export default function SignUpPage() {
  const { signupMutation } = useAuth();
  return <SignupForm signupMutation={signupMutation} />;
}
