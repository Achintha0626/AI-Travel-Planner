import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Colors } from "../../constants/Colors";
import { useRouter } from "expo-router";

export default function StartNewTripCard() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Ionicons name="location-sharp" size={30} color="black" />
      <Text style={styles.title}>No trips planned yet</Text>
      <Text style={styles.subTitle}>
        Looks like its time to plan a new experience! Get started below
      </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/create-trip/search-place")}
      >
        <Text style={styles.text_color}>Start a new trip</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 50,
    marginTop: 50,
    display: "flex",
    alignItems: "center",
    gap: 25,
  },
  title: {
    fontSize: 25,
    fontFamily: "outfit-medium",
    marginTop: 10,
  },
  subTitle: {
    fontSize: 20,
    fontFamily: "outfit",
    textAlign: "center",
    color: Colors.GRAY,
  },
  button: {
    padding: 15,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 15,
    paddingHorizontal: 30,
  },
  text_color: {
    color: Colors.WHITE,
    fontFamily: "outfit-medium",
    fontSize: 17,
  },
});
