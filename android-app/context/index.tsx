import { ReactNode } from "react";
import { AuthProvider } from "./auth-context";
import React from 'react'


export const AppProvider = ({ children }: { children: ReactNode }) => {
  return <AuthProvider>{children}</AuthProvider>
}