'use client';

import TwoFAForm from 'components/sections/authentications/two-fa/TwoFAForm';
import { sendPasswordResetLinkApi } from 'services/auth/auth.api';

export default function TwoFAPage() {
  return (
    <TwoFAForm
      handleVerifyOtp={async () => {
        // OTP is validated when setting the new password
      }}
      handleResendOtp={async ({ email }) => sendPasswordResetLinkApi({ email })}
    />
  );
}
