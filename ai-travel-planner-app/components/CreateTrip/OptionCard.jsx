import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Colors } from "../../constants/Colors";

export default function OptionCard({ option }) {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>{option?.title}</Text>
        <Text style={styles.desc}>{option?.desc}</Text>
      </View>
      <Text style={styles.icon}>{option.icon}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 25,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: Colors.LIGHT_GRAY,
    borderRadius: 15,
  },
  title: {
    fontSize: 20,
    fontFamily: "outfit-bold",
  },
  desc: {
    fontSize: 17,
    fontFamily: "outfit",
    color: Colors.GRAY,
  },
  icon: {
    fontSize: 35,
  },
});
