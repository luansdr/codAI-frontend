'use client'

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import React from 'react';
import { NextUIProvider } from '@nextui-org/react';

export function Providers({ children }) {
  return (
    <NextUIProvider>
      {children}
      <ToastContainer />
    </NextUIProvider>
  );
}
