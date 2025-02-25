import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import React, { useEffect } from "react";
import { Colors } from "../../constants/Colors";
import { GetPhotoRef } from "../../service/GooglePlaceApi";
import HotelCard from "./HotelCard";

export default function HotelList({ hotelList }) {
 

 
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🏩 Hotel Recommendation</Text>

      <FlatList
        data={hotelList}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        renderItem={({ item, index }) => <HotelCard item={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    gap: 15,
  },
  title: {
    fontFamily: "outfit-bold",
    fontSize: 20,
  },
  image: {
    width: 180,
    height: 120,
    borderRadius: 15,
  },
  flatList: {
    marginTop: 8,
  },
  view: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  image_view: {
    marginRight: 20,
  },
  hotel_name_text: {
    fontFamily: "outfit-medium",
    fontSize: 17,
  },
  rating_text: {
    fontFamily: "outfit",
  },
});
