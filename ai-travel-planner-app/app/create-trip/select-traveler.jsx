import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigation, useRouter } from "expo-router";
import { Colors } from "../../constants/Colors";
import { SelectTravelsList } from "../../constants/Options";
import Ionicons from "@expo/vector-icons/Ionicons";
import OptionCard from "../../components/CreateTrip/OptionCard";
import { CreateTripContext } from "../../context/CreateTripContext";

export default function SelectTraveler() {
  const navigation = useNavigation();
  const router = useRouter();

  const [selectedTraveler, setSelectedTraveler] = useState();
  const { tripData, setTripData } = useContext(CreateTripContext);

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
      headerTransparent: true,
      headerTitle: "",
    });
  }, []);

  useEffect(() => {
    setTripData({ ...tripData, traveler: selectedTraveler });
  }, [selectedTraveler]);

  useEffect(() => {
    console.log(tripData);
  }, [tripData]);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.back()}>
        <Ionicons name="arrow-back-outline" size={24} color="black" />
      </TouchableOpacity>

      <Text style={styles.title}>Who's Traveling</Text>
      <View style={{ marginTop: 20 }}>
        <Text style={styles.sub_title}>Choose your travelers</Text>

        <FlatList
          data={SelectTravelsList}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              onPress={() => setSelectedTraveler(item)}
              style={{
                marginVertical: 10,
              }}
            >
              <OptionCard option={item} selectedTraveler={selectedTraveler} />
            </TouchableOpacity>
          )}
        />
      </View>
      <TouchableOpacity
        style={styles.opacity}
        onPress={() => router.push("/create-trip/select-dates")}
      >
        <Text style={styles.button}>Continue</Text>
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
    fontSize: 35,
    fontFamily: "outfit-bold",
    marginTop: 20,
  },
  sub_title: {
    fontFamily: "outfit-bold",
    fontSize: 23,
  },
  opacity: {
    padding: 15,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 15,
    marginTop: 25,
  },
  button: {
    textAlign: "center",
    color: Colors.WHITE,
    fontFamily: "outfit-medium",
    fontSize: 20,
  },
});
