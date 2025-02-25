import { View, Text, StyleSheet, Image, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "../../constants/Colors";
import { GetPhotoRef } from "../../service/GooglePlaceApi";

export default function PlanTrip({ details }) {
  if (!details || Object.keys(details).length === 0) {
    return <Text>No plan details available.</Text>;
  }

  // Store photo references for each place
  const [photoRefs, setPhotoRefs] = useState({});

  useEffect(() => {
    fetchPhotoReferences();
  }, []);

  // Fetch photo reference for each place
  const fetchPhotoReferences = async () => {
    let photoData = {};
    for (const [day, activities] of Object.entries(details)) {
      for (const [timeSlot, activity] of Object.entries(activities)) {
        if (activity.placeName) {
          const result = await GetPhotoRef(activity.placeName);
          photoData[activity.placeName] = result; // Store photo reference
        }
      }
    }
    setPhotoRefs(photoData);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🌴 Plan Details</Text>
      {Object.entries(details)
        .sort(([dayA], [dayB]) => dayA.localeCompare(dayB)) // Ensures day1 comes before day2
        .map(([day, activities], dayIndex) => (
          <View key={dayIndex}>
            <Text style={styles.dayTitle}>
              {day.charAt(0).toUpperCase() + day.slice(1)}
            </Text>

            {/* Extract place names from different time slots */}
            {Object.entries(activities).map(([timeSlot, activity], index) =>
              activity.placeName ? (
                <View key={index} style={styles.imageView}>
                  {/* Show Loading Indicator While Fetching Image */}
                  {!photoRefs[activity.placeName] ? (
                    <ActivityIndicator size="large" color="blue" />
                  ) : (
                    <Image
                      style={styles.image}
                      source={{
                        uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${
                          photoRefs[activity.placeName]
                        }&key=${process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY}`,
                      }}
                    />
                  )}

                  <View style={{ marginTop: 5 }}>
                    <Text style={styles.placeName}>{activity.placeName}</Text>
                    <Text style={styles.placeDetails}>
                      {activity.placeDetails || "No details available."}
                    </Text>
                    <View style={styles.buttonLocation}>
                      <View>
                        <Text style={styles.ticket}>
                          🎟️ Ticket Price:{" "}
                          <Text style={styles.data}>
                            ${activity.ticketPricing || "Not available"}
                          </Text>
                        </Text>

                        <Text style={styles.ticket}>
                          ⏳ Travel Time:{" "}
                          <Text style={styles.data}>
                            {activity.travelTime || "Not available"}
                          </Text>
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              ) : null
            )}

            {/* Display message if no placeName exists */}
            {Object.values(activities).every(
              (activity) => !activity.placeName
            ) && <Text>No places planned for this day.</Text>}
          </View>
        ))}
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  container: {
    marginTop: 20,
    padding: 10,
  },
  dayTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
  },
  placeName: {
    fontSize: 20,
    fontFamily: "outfit-bold",
  },
  image: {
    width: "100%",
    height: 140,
    borderRadius: 15,
  },
  placeDetails: {
    fontFamily: "outfit",
    fontSize: 14,
    color: Colors.GRAY,
  },
  imageView: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 15,
    borderColor: Colors.GRAY,
    marginTop: 20,
    backgroundColor: Colors.LIGHT_BLUE,
  },
  ticket: {
    fontFamily: "outfit",
    fontSize: 17,
    marginTop: 5,
  },
  data: {
    fontFamily: "outfit-bold",
  },
  buttonLocation: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
