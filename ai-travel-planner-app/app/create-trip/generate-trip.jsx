import { View, Text, StyleSheet, Image } from "react-native";
import React, { useContext } from "react";
import { Colors } from "../../constants/Colors";
import { CreateTripContext } from "../../context/CreateTripContext";

export default function GenerateTrip() {
  const { tripData, setTripData } = useContext(CreateTripContext);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Please wait...</Text>
      <Text style={styles.sub_title}>
        We are working to generate your dream destination
      </Text>

      <Image
        style={styles.image}
        source={require("./../../assets/images/plane.gif")}
      />
      <Text style={styles.last_text}>Do not Go back</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 25,
    paddingTop: 75,
    backgroundColor: Colors.WHITE,
    height: "100%",
  },
  title: {
    fontFamily: "outfit-bold",
    fontSize: 35,
    textAlign: "center",
  },
  sub_title: {
    fontFamily: "outfit-medium",
    fontSize: 20,
    textAlign: "center",
    marginTop: 40,
  },
  image: {
    width: "100%",
    height: 200,
    objectFit: "contain",
  },
  last_text: {
    fontFamily: "outfit",
    color: Colors.GRAY,
    fontSize: 20,
    textAlign: "center",
  },
});
