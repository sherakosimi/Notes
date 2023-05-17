import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { useFonts } from "@expo-google-fonts/inter";
import { removeNoteDB } from "../../redux/requests";
import { AntDesign } from "@expo/vector-icons";

export default function NoteList(props) {
  const confirmDeleteAlert = (id) => {
    Alert.alert("Удалить?", "Вы точно хотите удалить заметку?", [
      {
        text: "Удалить",
        onPress: () => removeNoteDB(props.dispatch, id),
      },
      {
        text: "Отмена",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
    ]);
  };

  const [fontsLoaded] = useFonts({
    "Inter-SemiBold": require("../../assets/fonts/Inter-SemiBold.ttf"),
    "Inter-Medium": require("../../assets/fonts//Inter-Medium.ttf"),
    "Inter-Regular": require("../../assets/fonts//Inter-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  } else {
    return (
      <ScrollView style={styles.quotes}>
        {props.database &&
          props.database.map((quote) => (
            <TouchableOpacity
              style={styles.quoteContainer}
              key={quote.id}
              onPress={() =>
                props.navigation.navigate("NoteOverview", {
                  name: quote.character,
                  quote: quote.quote,
                })
              }
            >
              <View style={styles.quoteInfo}>
                <Text style={styles.quoteTitle} numberOfLines={1}>
                  {quote.character}
                </Text>
                <Text style={styles.quoteDescription} numberOfLines={1}>
                  {quote.quote}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.btn}
                onPress={() => confirmDeleteAlert(quote.id)}
              >
                <AntDesign name="delete" size={22} color="#9A3B37" />
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  quotes: {
    flex: 1,
    width: "100%",
    paddingVertical: 5,
    paddingHorizontal: 25,
    flexDirection: "column",
  },

  quoteContainer: {
    width: "100%",
    height: 80,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#dddddd",
    marginVertical: 7,
    paddingHorizontal: 20,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },

  quoteInfo: {
    justifyContent: "center",
    height: "100%",
    width: "85%",
  },

  quoteTitle: {
    color: "#2F3230",
    fontFamily: "Inter-SemiBold",
    fontSize: 17,
  },

  quoteDescription: {
    color: "#517773",
    fontFamily: "Inter-Regular",
    marginTop: 5,
    fontSize: 15,
  },
  btn: {
    alignItems: "center",
    justifyContent: "center",
  },
});
