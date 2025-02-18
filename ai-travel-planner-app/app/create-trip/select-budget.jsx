import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { SelectBudgetOptions } from "../../constants/Options";
import OptionCard from "./../../components/CreateTrip/OptionCard";
import { Colors } from "../../constants/Colors";
import { CreateTripContext } from "../../context/CreateTripContext";
import { Alert, Platform } from "react-native";

export default function SelectBudget() {
  const router = useRouter();

  const [selectedOption, setSelectedOption] = useState();
  const { tripData, setTripData } = useContext(CreateTripContext);

  const onClickContinue = () => {
    if (!selectedOption) {
      const message = "Please Select Your Budget";
      if (Platform.OS === "android") {
        ToastAndroid.show(message, ToastAndroid.LONG);
      } else {
        Alert.alert("Alert", message);
      }

      return;
    }

    router.push("");
  };

  useEffect(() => {
    selectedOption &&
      setTripData({
        ...tripData,
        budget: selectedOption?.title,
      });
  }, [selectedOption]);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.back()}>
        <Ionicons name="arrow-back-outline" size={24} color="black" />
      </TouchableOpacity>
      <Text style={styles.title}>Budget</Text>
      <View style={{ marginTop: 20 }}>
        <Text style={styles.sub_title}>
          Choose spending habits for your trip
        </Text>

        <FlatList
          data={SelectBudgetOptions}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              style={styles.flatList}
              onPress={() => setSelectedOption(item)}
            >
              <OptionCard option={item} selectedOption={selectedOption} />
            </TouchableOpacity>
          )}
        ></FlatList>
      </View>
      <TouchableOpacity
        style={styles.opacity}
        onPress={() => onClickContinue()}
      >
        <Text style={styles.button}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 65,
    padding: 25,
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
  flatList: {
    marginVertical: 10,
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
