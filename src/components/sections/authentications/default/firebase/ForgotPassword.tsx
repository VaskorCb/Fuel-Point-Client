'use client';

import React from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { firebaseAuth } from 'services/firebase/firebase';
import ForgotPasswordForm from 'components/sections/authentications/common/ForgotPasswordForm';

const page = () => {
  const handleSendResetLink = async ({ email }: { email: string }) => {
    if (!firebaseAuth) {
      throw new Error('Firebase is not configured. Add valid Firebase credentials to .env');
    }
    return await sendPasswordResetEmail(firebaseAuth, email).catch((error) => {
      throw new Error(error.message);
    });
  };
  return <ForgotPasswordForm handleSendResetLink={handleSendResetLink} />;
};

export default page;
