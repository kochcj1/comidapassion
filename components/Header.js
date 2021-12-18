import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Header() {
  return (
      <View style={styles.header}>
          <Text style={styles.headerText}>Recipes</Text>
      </View>
  );
}

const styles = StyleSheet.create({
    header: {
        width: "100%",
        height: "100%",
        backgroundColor: "#275cb2",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    headerText: {
        color: "white",
        fontSize: 16
    }
});
