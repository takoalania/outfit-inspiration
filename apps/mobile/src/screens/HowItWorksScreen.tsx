import React from 'react';
import { Text, ScrollView, StyleSheet, View } from 'react-native';
import Layout from '../components/Layout';

const HowItWorksScreen = () => {
  return (
    <Layout>
      <View style={styles.wrapper}>
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.heading}>How It Works</Text>

          <Text style={styles.paragraph}>
            1. Upload a photo of your outfit or yourself. We’ll analyze the clothing style and vibe.
          </Text>

          <Text style={styles.paragraph}>
            2. Alternatively, describe your mood, occasion, or what you’re looking for. For example:
            “I’m going to a beach wedding” or “I want to look elegant but comfy”.
          </Text>

          <Text style={styles.paragraph}>
            3. Our AI stylist will suggest three tailored outfit ideas, each with a keyword you can
            use to explore similar looks online.
          </Text>

          <Text style={styles.paragraph}>
            4. Enjoy exploring, saving, and trying your new styles!
          </Text>
        </ScrollView>
      </View>
    </Layout>
  );
};

export default HowItWorksScreen;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    padding: 24,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#222',
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 16,
    color: '#444',
  },
});
