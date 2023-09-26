import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const mainRoot = document.documentElement;
mainRoot.style.setProperty("--sideNavColor", "#193389");
mainRoot.style.setProperty("--applicationTheme", "#f1f1f1");
mainRoot.style.setProperty("--primaryColor", "green");

const theme = createTheme({
  typography: {
    allVariants: {
      fontFamily: ['Work Sans', 'sans-serif'].join(','),
      textTransform: 'none',
    },
  },
});

export function Themes({ children }: { children: React.ReactNode }) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}