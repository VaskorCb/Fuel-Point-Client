'use client';

import SetPassworForm from 'components/sections/authentications/set-password/SetPassworForm';
import { resetPasswordApi } from 'services/auth/auth.api';

export default function SetPasswordPage() {
  return <SetPassworForm handleSetPassword={resetPasswordApi} />;
}
