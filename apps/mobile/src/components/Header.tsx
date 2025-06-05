import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  useWindowDimensions,
  Modal,
  TouchableOpacity,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type NavigationProps = NativeStackNavigationProp<RootStackParamList>;

const navLinks = [
  { route: 'Home', label: 'Home' },
  { route: 'About', label: 'About' },
  { route: 'HowItWorks', label: 'How it works' },
  { route: 'SignIn', label: 'Sign in' },
];

export default function Header() {
  const navigation = useNavigation<NavigationProps>();
  const { width } = useWindowDimensions();
  const isMobile = width < 640;
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNavigate = (routeName: string) => {
    navigation.navigate(routeName as any);
    setMenuOpen(false);
  };

  return (
    <>
      <View style={styles.header}>
        <Image
          source={require('../assets/logo.jpg')}
          style={{ width: 32, height: 32 }}
          resizeMode="contain"
        />
        {!isMobile ? (
          <View style={styles.linksRow}>
            {navLinks.map(link => (
              <Pressable key={link.route} onPress={() => handleNavigate(link.route)}>
                <Text style={styles.linkText}>{link.label}</Text>
              </Pressable>
            ))}
          </View>
        ) : (
          <Pressable onPress={() => setMenuOpen(true)}>
            <Text style={{ fontSize: 22 }}>☰</Text>
          </Pressable>
        )}
      </View>

      {/* Fullscreen Menu */}
      <Modal visible={menuOpen} animationType="slide" transparent>
        <View style={styles.fullscreenMenu}>
          <View style={styles.menuInner}>
            {navLinks.map(link => (
              <TouchableOpacity
                key={link.route}
                onPress={() => handleNavigate(link.route)}
                style={styles.fullLink}
              >
                <Text style={styles.fullLinkText}>{link.label}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity onPress={() => setMenuOpen(false)} style={styles.closeButton}>
              <Text style={styles.closeText}>Close ✕</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  linksRow: {
    flexDirection: 'row',
    gap: 16,
  },
  linkText: {
    fontSize: 16,
  },
  fullscreenMenu: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  menuInner: {
    width: '100%',
    alignItems: 'center',
  },
  fullLink: {
    paddingVertical: 24,
    width: '100%',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  fullLinkText: {
    fontSize: 20,
    fontWeight: '500',
  },
  closeButton: {
    marginTop: 40,
  },
  closeText: {
    fontSize: 16,
    color: '#888',
  },
});
