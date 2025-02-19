import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import moment from "moment";
import { Colors } from "../../constants/Colors";
import UserTripCard from "./UserTripCard";

export default function UserTripList({ userTrips }) {
  const LatestTrip = JSON.parse(userTrips[0].tripData);

  return (
    userTrips && (
      <View>
        <View style={{ marginTop: 20 }}>
          {LatestTrip?.locationInfo?.photoRef ? (
            <Image
              source={{
                uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${LatestTrip.locationInfo?.photoRef}&key=${process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY}`,
              }}
              style={{
                width: "100%",
                height: 240,
                resizeMode: "cover",
                borderRadius: 15,
              }}
            />
          ) : (
            <Image
              style={styles.image}
              source={require("./../../assets/images/plane.gif")}
            />
          )}
          <View style={{ marginTop: 10 }}>
            <Text style={styles.location}>
              {userTrips[0]?.tripPlan?.location}
            </Text>
            <View style={styles.container}>
              <Text style={styles.year}>
                {moment(LatestTrip.startDate).format("DD MMM yyyy")}
              </Text>
              <Text style={styles.year}>
                🚌
                {LatestTrip.traveler.title}{" "}
              </Text>
            </View>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.button_text}>See your plan</Text>
            </TouchableOpacity>
          </View>

          {userTrips.map((trip, index) => (
            <UserTripCard trip={trip} key={index} />
          ))}
        </View>
      </View>
    )
  );
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 240,
    objectFit: "cover",
    borderRadius: 15,
  },
  location: {
    fontFamily: "outfit-medium",
    fontSize: 20,
  },
  year: {
    fontFamily: "outfit",
    fontSize: 17,
    color: Colors.GRAY,
  },
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
  },
  button: {
    backgroundColor: Colors.PRIMARY,
    padding: 15,
    borderRadius: 15,
    marginTop: 10,
  },
  button_text: {
    color: Colors.WHITE,
    textAlign: "center",
    fontFamily: "outfit-medium",
    fontSize: 15,
  },
});
