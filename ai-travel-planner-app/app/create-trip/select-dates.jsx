import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { useNavigation, useRouter } from "expo-router";
import { Colors } from "../../constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import CalendarPicker from "react-native-calendar-picker";

export default function SelectDates() {
  const navigation = useNavigation();
  const router = useRouter();

  // Add state to store the selected date
  const [selectedDate, setSelectedDate] = useState(null);

  // Define the onDateChange function
  const onDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.back()}>
        <Ionicons name="arrow-back-outline" size={24} color="black" />
      </TouchableOpacity>
      <Text style={styles.title}>Travel Dates</Text>
      <View style={styles.calender}>
        <CalendarPicker
          onDateChange={onDateChange}
          allowRangeSelection={true}
          minDate={new Date()}
          maxRangeDuration={5}
          selectedRangeStyle={{
            backgroundColor: Colors.PRIMARY,
          }}
          selectedDayTextStyle={{
            color: Colors.WHITE,
          }}
        />{" "}
      </View>
      {selectedDate && (
        <Text style={styles.selectedDate}>
          Selected Date: {selectedDate.toString()}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 25,
    paddingTop: 75,
    backgroundColor: Colors.WHITE,
    height: "100%",
  },
  title: {
    fontFamily: "outfit-bold",
    fontSize: 35,
    marginTop: 20,
  },
  calender: {
    marginTop: 30,
  },
  selectedDate: {
    marginTop: 20,
    fontSize: 18,
    fontFamily: "outfit-medium",
    color: Colors.PRIMARY,
  },
});
