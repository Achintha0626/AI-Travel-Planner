import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useEffect } from "react";
import { useNavigation, useRouter } from "expo-router";
import { Colors } from "../../constants/Colors";
import { SelectTravelsList } from "../../constants/Options";
import Ionicons from "@expo/vector-icons/Ionicons";
import OptionCard from "../../components/CreateTrip/OptionCard";

export default function SelectTraveler() {
  const navigation = useNavigation();
  const router = useRouter();

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
      headerTransparent: true,
      headerTitle: "",
    });
  });

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
            <View
              style={{
                marginVertical: 10,
              }}
            >
              <OptionCard option={item} />
            </View>
          )}
        />
      </View>
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
});
