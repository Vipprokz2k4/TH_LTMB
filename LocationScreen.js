import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LocationScreen = ({ navigation }) => {
  const [zone, setZone] = useState('Banasree');
  const [area, setArea] = useState('');

  const handleSubmit = async () => {
    try {
      await AsyncStorage.setItem('userLocation', JSON.stringify({ zone, area }));
      navigation.navigate('Login');
    } catch (error) {
      console.error('Error saving location:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text>←</Text>
      </TouchableOpacity>
      
      <Image
        source={require('../assets/map-icon.png')}
        style={styles.mapIcon}
      />

      <Text style={styles.title}>Select Your Location</Text>
      <Text style={styles.subtitle}>
        Switch on your location to stay in tune with what's happening in your area
      </Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Your Zone</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={zone}
            onValueChange={(itemValue) => setZone(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Banasree" value="Banasree" />
            <Picker.Item label="Gulshan" value="Gulshan" />
            <Picker.Item label="Dhanmondi" value="Dhanmondi" />
          </Picker>
        </View>

        <Text style={styles.label}>Your Area</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={area}
            onValueChange={(itemValue) => setArea(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Select area" value="" />
            <Picker.Item label="Block A" value="Block A" />
            <Picker.Item label="Block B" value="Block B" />
            <Picker.Item label="Block C" value="Block C" />
          </Picker>
        </View>
      </View>

      <TouchableOpacity 
        style={styles.submitButton}
        onPress={handleSubmit}
      >
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1,
  },
  mapIcon: {
    width: 120,
    height: 120,
    alignSelf: 'center',
    marginTop: 60,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  inputContainer: {
    marginBottom: 30,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 20,
    backgroundColor: '#f8f8f8',
  },
  picker: {
    height: 50,
  },
  submitButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LocationScreen; 