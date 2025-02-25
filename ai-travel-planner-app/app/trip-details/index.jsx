import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { Colors } from "../../constants/Colors";
import moment from "moment";
import FlightInfo from "../../components/TripDetails/FlightInfo";
import HotelList from "../../components/TripDetails/HotelList";
import PlanTrip from "../../components/TripDetails/PlanTrip";

export default function TripDetails() {
  const navigation = useNavigation();
  const router = useRouter();
  const { trip } = useLocalSearchParams();

  const [tripDetails, setTripDetails] = useState(null); // Start with null to handle loading

  useEffect(() => {
    console.log("Received trip data:", trip);
    try {
      let parsedTrip = typeof trip === "string" ? JSON.parse(trip) : trip;
      parsedTrip.tripData = JSON.parse(parsedTrip.tripData); 
      console.log("Final parsed trip:", parsedTrip);
      setTripDetails(parsedTrip);
    } catch (error) {
      console.error("JSON parsing error:", error, trip);
      setTripDetails(null);
    }
  }, []);

  // If tripDetails is null (loading state), show a loader
  if (!tripDetails || !tripDetails.tripData) {
    return (
      <View style={styles.container}>
        <Text>Loading trip details...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back-outline" size={24} color="black" />
        </TouchableOpacity>

        {/* Display Image */}
        {tripDetails.tripData?.locationInfo?.photoRef ? (
          <Image
            source={{
              uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${tripDetails.tripData.locationInfo.photoRef}&key=${process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY}`,
            }}
            style={styles.image}
          />
        ) : (
          <Text>No Image Available</Text>
        )}

        {/* Trip Information */}
        <View style={styles.location}>
          <Text style={styles.location_text}>
            {tripDetails?.tripPlan?.location || "No Location"}
          </Text>

          {/* Display Start & End Date */}
          <Text style={styles.date}>
            {moment(tripDetails.tripData.startDate).format("DD MMM yyyy")} -{" "}
            {moment(tripDetails.tripData.endDate).format("DD MMM yyyy")}
          </Text>

          {/* Display Traveler Title */}
          <Text style={styles.date}>
            Traveling: {tripDetails.tripData.traveler?.title || "Unknown"}
          </Text>

          {/* Flight Info */}

          <FlightInfo flightData={tripDetails?.tripPlan?.flightDetails} />

          {/* HotelList */}
          <HotelList hotelList={tripDetails?.tripPlan?.hotelOptions} />

          {/* Trip Day Planner */}
          <PlanTrip details={tripDetails?.tripPlan?.itinerary} />
        </View>
      </View>

      {/* <View>

      </View> */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: Colors.WHITE, 
  },
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE, 
  },
  backButton: {
    padding: 10,
    position: "absolute",
    top: 50,
    left: 20,
    zIndex: 1,
  },
  image: {
    width: "100%",
    height: 330,
  },
  location: {
    padding: 15,
    backgroundColor: Colors.WHITE,
    marginTop: -30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  location_text: {
    fontSize: 25,
    fontFamily: "outfit-bold",
    marginTop: 5,
  },
  date: {
    fontFamily: "outfit",
    fontSize: 14,
    color: Colors.GRAY,
    marginTop: 5,
  },
});
