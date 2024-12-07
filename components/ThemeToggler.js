import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, Appearance } from 'react-native';
import { DarkMode, LightMode } from './Icons';

const ThemeToggler = () => {
  const [colorScheme, setColorScheme] = useState(Appearance.getColorScheme());

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setColorScheme(colorScheme);
    });
    return () => subscription.remove();
  }, []);

  const toggleTheme = () => {
    const newScheme = colorScheme === 'light' ? 'dark' : 'light';
    setColorScheme(newScheme);
    Appearance.setColorScheme(newScheme);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleTheme} style={styles.button}>
        {colorScheme === 'dark' ? (
          <DarkMode fill="white" />
        ) : (
          <LightMode fill="black" />
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
});

export default ThemeToggler;
