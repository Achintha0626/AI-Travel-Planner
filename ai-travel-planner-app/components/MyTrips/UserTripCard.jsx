import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import moment from "moment";
import { Colors } from "../../constants/Colors";

export default function UserTripCard({ trip }) {
  const formatData = (data) => {
    return JSON.parse(data);
  };

  return (
    <View style={styles.container}>
      {/* <Image
        style={styles.image}
        source={require("./../../assets/images/plane.gif")}
      /> */}
      <Image
        source={{
          uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${
            formatData(trip.tripData).locationInfo?.photoRef
          }&key=${process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY}`,
        }}
        style={{
          width: 100,
          height: 100,
          borderRadius: 15,
        }}
      />

      <View>
        <Text style={styles.location}>{trip.tripPlan?.location} </Text>
        <Text style={styles.date}>
          {moment(formatData(trip.tripData).startDate).format("DD MMM yyyy")}
        </Text>
        <Text style={styles.date}>
          Traveling: {formatData(trip.tripData).traveler.title}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
    borderRadius: 15,
  },
  container: {
    marginTop: 20,
    display: "flex",
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  location: {
    fontFamily: "outfit-medium",
    fontSize: 18,
  },
  date: {
    fontFamily: "outfit",
    fontSize: 14,
    color: Colors.GRAY,
  },
});
