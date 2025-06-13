import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { PaperProvider } from 'react-native-paper';
import Auth from './src/screens/Auth';

export default function App() {
  return (
    <PaperProvider>
      <StatusBar style="auto" />
      <Auth />
    </PaperProvider>
  );
}
