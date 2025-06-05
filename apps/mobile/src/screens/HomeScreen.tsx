import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList } from '../navigation/AppNavigator';
import Layout from '../components/Layout';

const samplePrompts = [
  'outdoor summer wedding guest',
  'elegant but',
];

export default function HomeScreen() {
  const [prompt, setPrompt] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const { width } = useWindowDimensions();
  const isMobile = width < 640;
  const styles = createStyles(isMobile);

  const pickImage = async () => {
    const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!granted) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      const base64 = result.assets[0].base64;
      if (base64) setImage(`data:image/jpeg;base64,${base64}`);
    }
  };

  const handleSubmit = () => {
    navigation.navigate('Results', {
      image: image ?? undefined,
      prompt: prompt || undefined,
    });
  };

  return (
    <Layout>
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.title}>Find Outfit Inspiration</Text>
          <Text style={styles.subtitle}>Upload a look or describe your vibe</Text>

          <View style={isMobile ? styles.stack : styles.row}>
            <TouchableOpacity style={styles.uploadBox} onPress={pickImage}>
              <View style={styles.uploadContent}>
                <Ionicons name="camera-outline" size={20} color="black" />
                <Text style={styles.uploadText}>Upload a photo</Text>
              </View>
            </TouchableOpacity>


            <TextInput
              placeholder="I'm going to a rooftop brunch..."
              value={prompt}
              onChangeText={setPrompt}
              style={styles.promptInput}
            />
          </View>

          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitText}>Get Outfit Suggestions</Text>
          </TouchableOpacity>

          <View style={styles.divider} />

          <Text style={styles.promptLabel}>Refine your search</Text>
          <View style={styles.chipWrap}>
            {samplePrompts.map((p, i) => (
              <TouchableOpacity
                key={i}
                style={styles.chip}
                onPress={() => navigation.navigate('Results', { prompt: p })}
              >
                <Text>{p}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </Layout>
  );
}

function createStyles(isMobile: boolean) {
  return StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: '#f4f4f4',
      paddingVertical: isMobile ? 0 : 48,
    },
    card: {
      width: '100%',
      maxWidth: 600,
      backgroundColor: '#fff',
      padding: 32,
      borderRadius: 8,
      shadowColor: '#000',
      shadowOpacity: 0.03,
      shadowRadius: 6,
      elevation: 1,
    },
    title: {
      fontSize: 22,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    subtitle: {
      fontSize: 16,
      textAlign: 'center',
      marginBottom: 24,
    },
    row: {
      flexDirection: 'row',
      gap: 10,
      marginBottom: 16,
    },
    stack: {
      gap: 10,
      marginBottom: 16,
    },
    uploadBox: {
      backgroundColor: '#fff',
      borderColor: '#ccc',
      borderWidth: 1,
      borderRadius: 8,
      paddingVertical: 14,
      paddingHorizontal: 16,
      flex: 1,
      justifyContent: 'center',
      height: 52,
    },
    uploadContent: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: isMobile ? 'flex-start' : 'center',
      paddingHorizontal: 8,
    },
    uploadText: {
      marginLeft: 8,
      fontSize: 16,
      fontWeight: '500',
      color: "#000",
    },
    promptInput: {
      flex: 1,
      height: 52,
      paddingHorizontal: 16,
      paddingVertical: 14,
      fontSize: 16,
      backgroundColor: '#fff',
      borderRadius: 6,
      borderWidth: 1,
      borderColor: '#ccc',
      justifyContent: 'center',
      color: "#000",
    },
    submitButton: {
      backgroundColor: '#2196f3',
      paddingVertical: 14,
      borderRadius: 6,
      alignItems: 'center',
      marginVertical: 12,
    },
    submitText: {
      color: '#fff',
      fontWeight: '600',
      fontSize: 16,
    },
    divider: {
      height: 1,
      backgroundColor: '#eee',
      marginVertical: 24,
    },
    promptLabel: {
      fontSize: 16,
      fontWeight: '600',
      textAlign: 'center',
      marginBottom: 16,
    },
    chipWrap: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      gap: 10,
    },
    chip: {
      borderColor: '#ddd',
      borderWidth: 1,
      backgroundColor: '#fff',
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderRadius: isMobile ? 8 : 20,
      width: isMobile ? '100%' : 'auto',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
}

