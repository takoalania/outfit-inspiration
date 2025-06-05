import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Layout from '../components/Layout';

const AboutScreen = () => {
  return (
    <Layout>
      <View style={styles.wrapper}>
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.heading}>About Outfit Inspiration</Text>
          <Text style={styles.paragraph}>
            Outfit Inspiration is your smart stylist — helping you discover outfit ideas effortlessly.
            Whether you upload a photo or describe your vibe, our AI suggests curated looks tailored
            to your mood or occasion.
          </Text>

          <Text style={styles.paragraph}>
            This app was created for fashion lovers who want fresh ideas on the go. Get inspired,
            refine your search, and express your style with confidence.
          </Text>

          <Text style={styles.paragraph}>
            Powered by OpenAI and built with Expo, this tool is part of our mission to blend technology
            and fashion in ways that are accessible, helpful, and fun.
          </Text>
        </ScrollView>
      </View>
    </Layout>
  );
};

export default AboutScreen;

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
