'use client';

import ForgotPasswordForm from 'components/sections/authentications/forgot-password/ForgotPasswordForm';
import { useSendPasswordResetLink } from 'services/auth/auth.hooks';

export default function ForgotPasswordPage() {
  const sendResetLink = useSendPasswordResetLink();
  return (
    <ForgotPasswordForm
      handleSendResetLink={async ({ email }) => {
        return sendResetLink.mutateAsync({ email });
      }}
    />
  );
}
