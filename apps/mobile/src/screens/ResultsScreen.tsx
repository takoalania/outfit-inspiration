import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  Linking
} from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import type { RootStackParamList } from '../navigation/AppNavigator';
import { getOutfitSuggestions } from '../services/ai';
import Layout from '../components/Layout';

const ResultsScreen = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'Results'>>();
  const { image, prompt } = route.params || {};

  const [suggestions, setSuggestions] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const result = await getOutfitSuggestions(image, prompt);
        setSuggestions(result);
      } catch (err) {
        setSuggestions('Something went wrong fetching suggestions.');
      } finally {
        setLoading(false);
      }
    };

    fetchSuggestions();
  }, []);

  if (loading) {
    return (
      <Layout>
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.loadingText}>Generating outfit ideas...</Text>
        </View>
      </Layout>
    );
  }

  return (
    <Layout>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Outfit Suggestions</Text>
        <View style={styles.card}>
    {suggestions?.split('\n').map((line, index) => {
      const match = line.match(/\[(.*?)\]/); // find [keywords]
      const keyword = match?.[1];
      const queryUrl = keyword
        ? `https://www.google.com/search?tbm=isch&q=${encodeURIComponent(keyword)}`
        : null;

      return (
        <View key={index} style={{ marginBottom: 12 }}>
          <Text style={styles.outfitText}>{line.replace(/\[.*?\]/, '').trim()}</Text>
          {queryUrl && (
            <Text
              style={{ color: '#007AFF', marginTop: 4 }}
              onPress={() => {
              Linking.openURL(queryUrl);
              }}>
              View outfit ideas
            </Text>
          )}
        </View>
              );
          })}
          </View>
      </ScrollView>
    </Layout>
  );
};

export default ResultsScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 60,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#333',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    elevation: 1,
  },
  outfitText: {
    fontSize: 16,
    lineHeight: 24,
  },
});
