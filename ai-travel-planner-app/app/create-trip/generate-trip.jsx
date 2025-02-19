import { View, Text, StyleSheet, Image } from "react-native";
import React, { useContext, useState } from "react";
import { Colors } from "../../constants/Colors";
import { CreateTripContext } from "../../context/CreateTripContext";
import { AI_PROMPT } from "../../constants/Options";
import { useEffect } from "react";
import { chatSession } from "../../configs/AiModel";
import { useRouter } from "expo-router";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../configs/FirebaseConfig";

export default function GenerateTrip() {
  const { tripData, setTripData } = useContext(CreateTripContext);
  const [loading, setLoading] = useState(false);
  const user = auth.currentUser;

  const router = useRouter();

  useEffect(() => {
    tripData && GenerateAiTrip();
  }, []);

  const GenerateAiTrip = async () => {
    setLoading(true);
    const FINAL_PROMPT = AI_PROMPT.replace(
      "{location}",
      tripData?.locationInfo?.name
    )
      .replace("{totalDays}", tripData.totalNoOfDays)
      .replace("{totalNight}", tripData.totalNoOfDays - 1)
      .replace("{traveler}", tripData?.traveler?.title)
      .replace("{budget}", tripData?.budget)
      .replace("{totalDays}", tripData.totalNoOfDays)
      .replace("{totalNight}", tripData.totalNoOfDays - 1);

    console.log(FINAL_PROMPT);

    const result = await chatSession.sendMessage(FINAL_PROMPT);
    console.log(result.response.text());
    const tripResp = JSON.parse(result.response.text());
    setLoading(false);

    const docId = Date.now().toString();

    const result_ = await setDoc(doc(db, "UserTrips", docId), {
      userEmail: user.email,
      tripPlan: tripResp, // AI Result
      tripData: JSON.stringify(tripData), //User selection data
      docId: docId,
    });

    router.push("(tabs)/mytrip");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Please wait...</Text>
      <Text style={styles.sub_title}>
        We are working to generate your dream destination
      </Text>

      <Image
        style={styles.image}
        source={require("./../../assets/images/plane.gif")}
      />
      <Text style={styles.last_text}>Do not Go back</Text>
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
    textAlign: "center",
  },
  sub_title: {
    fontFamily: "outfit-medium",
    fontSize: 20,
    textAlign: "center",
    marginTop: 40,
  },
  image: {
    width: "100%",
    height: 200,
    objectFit: "contain",
  },
  last_text: {
    fontFamily: "outfit",
    color: Colors.GRAY,
    fontSize: 20,
    textAlign: "center",
  },
});
