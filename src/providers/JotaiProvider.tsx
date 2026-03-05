'use client';

import { Provider as JotaiProviderBase } from 'jotai';
import { type ReactNode } from 'react';

export default function JotaiAppProvider({ children }: { children: ReactNode }) {
  return <JotaiProviderBase>{children}</JotaiProviderBase>;
}
