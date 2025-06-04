import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  Button,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/AppNavigator';

const HomeScreen = () => {
  const [image, setImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const pickImage = async () => {
    const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!granted) {
      Alert.alert('Permission required', 'Please allow access to your photo library.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        base64: true,
    });


    if (!result.canceled) {
        const base64 = result.assets[0].base64;
        if (base64) {
            setImage(`data:image/jpeg;base64,${base64}`);
        }
    }
  };

  const handleSubmit = () => {
    if (!image && !prompt.trim()) {
      Alert.alert('Input Required', 'Please upload an image or write a prompt.');
      return;
    }

    console.log('Prompt:', prompt);
    console.log('Image:', image);

    navigation.navigate('Results', {
        image: image ?? undefined,
        prompt: prompt || undefined,
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Find Outfit Inspiration</Text>

        <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
        <Text style={styles.imagePickerText}>Pick an image</Text>
        </TouchableOpacity>

        {image && (
        <Image
            source={{ uri: image }}
            style={styles.previewImage}
            resizeMode="cover"
        />
        )}

        <TextInput
        placeholder="Describe your outfit idea..."
        value={prompt}
        onChangeText={setPrompt}
        style={styles.input}
        multiline
        />

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Get Outfit Suggestions</Text>
        </TouchableOpacity>
    </ScrollView>
 );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    padding: 24,
    alignItems: 'center',
    backgroundColor: '#f4f4f4',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  imagePicker: {
    backgroundColor: '#e0e0e0',
    padding: 12,
    borderRadius: 6,
    marginBottom: 16,
    width: 280,
    alignItems: 'center',
  },
  imagePickerText: {
    color: '#333',
  },
  previewImage: {
    width: 280,
    height: 160,
    borderRadius: 8,
    marginBottom: 16,
    backgroundColor: '#ccc',
  },
  input: {
    width: 280,
    minHeight: 60,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 16,
    textAlignVertical: 'top',
  },
  button: {
    width: 280,
    backgroundColor: '#2196f3',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
});
