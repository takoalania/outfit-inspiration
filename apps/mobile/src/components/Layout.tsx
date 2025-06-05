import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from './Header';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <Header />
      {children}
    </SafeAreaView>
  );
}
