import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import { useFonts } from "@expo-google-fonts/inter";
import { AntDesign } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import NoteList from "../../components/NoteList/NoteList";
import AddNoteModal from "../../components/AddNoteModal/AddNoteModal";
import NoContent from "../../components/NoContent/NoContent";

export default function Home({ navigation }) {
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const { database } = useSelector((state) => state.quotes);

  const [fontsLoaded] = useFonts({
    "Inter-SemiBold": require("../../assets/fonts/Inter-SemiBold.ttf"),
    "Inter-Medium": require("../../assets/fonts//Inter-Medium.ttf"),
    "Inter-Regular": require("../../assets/fonts//Inter-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <AddNoteModal
          visible={modalVisible}
          setModalVisible={setModalVisible}
          dispatch={dispatch}
        />
        <View style={styles.header}>
          <Text style={styles.heading}>Мои Заметки</Text>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => setModalVisible(true)}
          >
            <AntDesign name="pluscircleo" size={28} color="#e39d0d" />
          </TouchableOpacity>
        </View>
        {database?.length == 0 ? (
          <NoContent dispatch={dispatch} setModalVisible={setModalVisible} />
        ) : (
          <NoteList
            database={database}
            dispatch={dispatch}
            navigation={navigation}
          />
        )}
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
  btn: {
    alignItems: "center",
    justifyContent: "center",
  },
});
