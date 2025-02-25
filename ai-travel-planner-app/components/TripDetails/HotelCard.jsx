import { View, Text, StyleSheet, Image, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { GetPhotoRef } from "../../service/GooglePlaceApi";

export default function HotelCard({ item }) {
  const [photoRef, setPhotoRef] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    GetGooglePhotoRef();
  }, []);

  const GetGooglePhotoRef = async () => {
    const result = await GetPhotoRef(item.hotelName || "Las Vegas, USA");
    setPhotoRef(result);
    setLoading(false);
  };

  return (
    <View style={styles.image_view}>
      
      {loading ? (
        <ActivityIndicator size="large" color="blue" />
      ) : photoRef ? (
        <Image
          style={styles.image}
          source={{
            uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${photoRef}&key=${process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY}`,
          }}
        />
      ) : (
        <Text>No Image Available</Text>
      )}

      <View>
        <Text style={styles.hotel_name_text}>{item.hotelName} </Text>
        <View style={styles.view}>
          <Text style={styles.rating_text}>⭐ {item.rating} </Text>
          <Text style={styles.rating_text}>💰 {item.price} </Text>
        </View>
      </View>
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
