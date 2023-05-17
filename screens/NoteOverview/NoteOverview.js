import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useFonts } from "@expo-google-fonts/inter";

export default function NoteOverview({ route, navigation }) {
  const [fontsLoaded] = useFonts({
    "Inter-SemiBold": require("../../assets/fonts/Inter-SemiBold.ttf"),
    "Inter-Medium": require("../../assets/fonts//Inter-Medium.ttf"),
    "Inter-Regular": require("../../assets/fonts//Inter-Regular.ttf"),
  });
  const { name, quote } = route.params;

  if (!fontsLoaded) {
    return null;
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.heading}>{name}</Text>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => navigation.goBack()}
          >
            <AntDesign name="close" size={30} color="#e39d0d" />
          </TouchableOpacity>
        </View>
        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionText}>{quote}</Text>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FBF8F3",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  header: {
    width: "100%",
    padding: 25,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  heading: {
    color: "#2F3230",
    fontFamily: "Inter-Regular",
    fontSize: 25,
  },

  descriptionContainer: {
    flex: 1,
    marginTop: 15,
    width: "100%",
    paddingHorizontal: 25,
  },
  descriptionText: {
    fontSize: 17,
    fontFamily: "Inter-Regular",
  },
});
