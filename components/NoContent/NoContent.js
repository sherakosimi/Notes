import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useFonts } from "@expo-google-fonts/inter";
import { fetchNotesAPI } from "../../redux/requests";

export default function NoContent(props) {
  const [fontsLoaded] = useFonts({
    "Inter-SemiBold": require("../../assets/fonts/Inter-SemiBold.ttf"),
    "Inter-Medium": require("../../assets/fonts//Inter-Medium.ttf"),
    "Inter-Regular": require("../../assets/fonts//Inter-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  } else {
    return (
      <View style={styles.noContent}>
        <Text style={styles.noContentText}>У Вас пока нет заметок.</Text>
        <TouchableOpacity style={styles.noContentLink}>
          <Text
            style={styles.noContentLinkText}
            onPress={() => props.setModalVisible(true)}
          >
            Создать
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.noContentLink}>
          <Text
            style={styles.noContentLinkText}
            onPress={() => fetchNotesAPI(props.dispatch)}
          >
            Загрузить с API
          </Text>
        </TouchableOpacity>
      </View>
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
    width: "90%",
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

  noContent: {
    paddingHorizontal: 30,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Inter-SemiBold",
  },
  noContentText: {
    marginVertical: 8,
    fontSize: 18,
    textAlign: "center",
    fontFamily: "Inter-Regular",
  },
  noContentLink: {
    marginVertical: 8,
    fontFamily: "Inter-SemiBold",
  },
  noContentLinkText: {
    fontSize: 18,
    color: "#e39d0d",
    fontFamily: "Inter-SemiBold",
  },
});
