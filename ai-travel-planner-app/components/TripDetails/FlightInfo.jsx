import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Colors } from "../../constants/Colors";

export default function FlightInfo({ flightData }) {
  if (!flightData) {
    return <Text>No flight details available</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.container_top}>
        <Text style={styles.title}>✈️ Flights </Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.button_text}>Book Here</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.text}>
        Estimated Price: ${flightData.estimatedPrice}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    padding: 10,
    borderWidth: 3,
    borderColor: Colors.DARK_GRAY,
    borderRadius: 15,
  },
  title: {
    fontFamily: "outfit-bold",
    fontSize: 20,
  },
  button: {
    backgroundColor: Colors.PRIMARY,
    padding: 5,
    width: 100,
    borderRadius: 7,
    marginTop: 7,
  },
  button_text: {
    textAlign: "center",
    color: Colors.WHITE,
    fontFamily: "outfit",
  },
  text: {
    fontFamily: "outfit",
    fontSize: 17,
    marginTop: 7,
  },
  container_top: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
