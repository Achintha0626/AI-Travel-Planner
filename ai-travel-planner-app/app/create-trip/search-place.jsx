import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useContext, useEffect } from "react";
import { useNavigation, useRouter } from "expo-router";
import { Colors } from "../../constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import "react-native-get-random-values";
import { CreateTripContext } from "./../../context/CreateTripContext";

export default function SearchPlace() {
  const navigation = useNavigation();
  const router = useRouter();

  
  const { tripData, setTripData } = useContext(CreateTripContext);

  useEffect(() => {
    navigation.setOptions({
      headerShown: false, // Hide default header
    });
  }, []);

  useEffect(()=>{
    console.log(tripData);
    
  },[tripData])

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back-outline" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Search Place</Text>
      </View>

      
        <GooglePlacesAutocomplete
          placeholder="Search Place"
          fetchDetails={true}
          onPress={(data, details = null) => {
            // console.log(data.description);
            // console.log(details?.geometry.location);

            setTripData((prev) => ({
              ...prev,
              locationInfo: {
                name: data.description,
                coordinates: details?.geometry.location,
                photoRef: details?.photos?.[0]?.photo_reference,
                url: details?.url,
              },
            }));

            router.push("/create-trip/select-traveler");
          }}
          query={{
            key: process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY,
            language: "en",
          }}

          styles={{
            textInputContainer:{
              borderWidth:1,
              borderRadius:5,
              marginTop:25
            }
          }}
        />
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 15,
  },
});
