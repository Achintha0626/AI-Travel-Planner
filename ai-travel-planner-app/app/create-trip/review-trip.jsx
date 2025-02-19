import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React, { useContext } from "react";
import { useRouter } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Colors } from "../../constants/Colors";
import { CreateTripContext } from "../../context/CreateTripContext";
import moment from "moment";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function ReviewTrip() {
  const router = useRouter();
  const { tripData, setTripData } = useContext(CreateTripContext);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.back()}>
        <Ionicons name="arrow-back-outline" size={24} color="black" />
      </TouchableOpacity>
      <Text style={styles.title}>Review your trip</Text>
      <View style={{ marginTop: 25 }}>
        <Text style={styles.sub_title}>
          Before generating your trip, please review your selection
        </Text>

        {/* Destination Info */}

        <View style={styles.view_icon}>
          <Ionicons name="location-sharp" size={34} color="black" />
          <View>
            <Text style={styles.icon_text}>Destination</Text>
            <Text style={styles.icon_desc}>{tripData?.locationInfo?.name}</Text>
          </View>
        </View>

        {/* Date Selected Info */}
        <View style={styles.view_icon}>
          <AntDesign name="calendar" size={34} color="black" />
          <View>
            <Text style={styles.icon_text}>Travel Date</Text>
            <Text style={styles.icon_desc}>
              {moment(tripData?.startDate).format("DD MMM") +
                " To " +
                moment(tripData.endDate).format("DD MMM") +
                "   "}
              ({tripData.totalNoOfDays} days)
            </Text>
          </View>
        </View>

        {/* Traveler Info */}
        <View style={styles.view_icon}>
          <AntDesign name="addusergroup" size={34} color="black" />
          <View>
            <Text style={styles.icon_text}>Who is traveling </Text>
            <Text style={styles.icon_desc}>{tripData?.traveler?.title}</Text>
          </View>
        </View>

        {/* Budget Info */}
        <View style={styles.view_icon}>
          <MaterialIcons name="attach-money" size={34} color="black" />
          <View>
            <Text style={styles.icon_text}>Budget </Text>
            <Text style={styles.icon_desc}>{tripData?.budget}</Text>
          </View>
        </View>
      </View>

      <TouchableOpacity style={styles.opacity}>
        <Text style={styles.button}>Build My trip</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 25,
    paddingTop: 55,
    backgroundColor: Colors.WHITE,
    height: "100%",
  },
  title: {
    fontFamily: "outfit-bold",
    fontSize: 35,
    marginTop: 20,
  },
  sub_title: {
    fontFamily: "outfit-bold",
    fontSize: 20,
  },
  view_icon: {
    marginTop: 40,
    display: "flex",
    flexDirection: "row",
    gap: 20,
  },
  icon_text: {
    fontFamily: "outfit",
    fontSize: 20,
    color: Colors.GRAY,
  },
  icon_desc: {
    fontFamily: "outfit-medium",
    fontStyle: 20,
  },
  opacity: {
    padding: 15,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 15,
    marginTop: 80,
  },
  button: {
    textAlign: "center",
    color: Colors.WHITE,
    fontFamily: "outfit-medium",
    fontSize: 20,
  },
});
