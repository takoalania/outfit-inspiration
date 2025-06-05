import React from 'react';
import { View } from 'react-native';
import Header from './Header';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <View style={{ flex: 1 }}>
      <Header />
      {children}
    </View>
  );
}
