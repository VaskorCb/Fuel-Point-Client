'use client';

import { PropsWithChildren } from 'react';
import DefaultAuthOnBoardLayout from 'components/sections/authentications/layouts/DefaultAuthOnBoardLayout';

export default function AuthLayout({ children }: PropsWithChildren) {
  return <DefaultAuthOnBoardLayout>{children}</DefaultAuthOnBoardLayout>;
}
