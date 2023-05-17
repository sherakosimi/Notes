import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useFormik } from "formik";
import { AntDesign } from "@expo/vector-icons";
import { useFonts } from "@expo-google-fonts/inter";
import { addNoteDB } from "../../redux/requests";
import * as yup from "yup";

const LoginSchema = yup.object().shape({
  character: yup.string().required("Required"),
  quote: yup.string().required("Required"),
});

export default function AddNoteModal(props) {
  const [fontsLoaded] = useFonts({
    "Inter-SemiBold": require("../../assets/fonts/Inter-SemiBold.ttf"),
    "Inter-Medium": require("../../assets/fonts//Inter-Medium.ttf"),
    "Inter-Regular": require("../../assets/fonts//Inter-Regular.ttf"),
  });

  const { handleChange, handleSubmit, values, errors } = useFormik({
    initialValues: { character: "", quote: "" },
    validationSchema: LoginSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (values) => {
      addNoteDB(props.dispatch, [values]);
      props.setModalVisible(false);
    },
  });

  if (!fontsLoaded) {
  } else {
    return (
      <Modal visible={props.visible} transparent={true} animationType="slide">
        <SafeAreaView style={styles.wrapper}>
          <View style={styles.header}>
            <Text style={styles.heading}>Добавить Заметку</Text>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => props.setModalVisible(false)}
            >
              <AntDesign name="close" size={30} color="#e39d0d" />
            </TouchableOpacity>
          </View>

          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.container}>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Название</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Введите название"
                  placeholderTextColor={"rgba(107, 107, 107, 0.5)"}
                  onChangeText={handleChange("character")}
                  value={values.character}
                />
                <Text style={styles.inputError}>{errors.character}</Text>
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Описание</Text>
                <TextInput
                  style={[styles.input, { height: 150, paddingTop: 15 }]}
                  multiline={true}
                  placeholder="Введите описание"
                  placeholderTextColor={"rgba(107, 107, 107, 0.5)"}
                  numberOfLines={5}
                  onChangeText={handleChange("quote")}
                  value={values.quote}
                />
                <Text style={styles.inputError}>{errors.quote}</Text>
              </View>

              <TouchableOpacity style={styles.btnSubmit} onPress={handleSubmit}>
                <Text style={styles.btnText}> Добавить</Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </SafeAreaView>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    height: "100%",
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

  container: {
    flex: 1,
    width: "100%",
    paddingHorizontal: 25,
    paddingVertical: 10,
  },

  inputContainer: {
    width: "100%",
    justifyContent: "space-between",
    marginVertical: 5,
  },
  inputLabel: {
    fontSize: 15,
    color: "#2F3230",
    fontFamily: "Inter-SemiBold",
  },
  input: {
    marginTop: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "rgba(107, 107, 107, 0.5)",
    width: "100%",
    height: 60,
    paddingHorizontal: 15,

    backgroundColor: "transparent",
    fontSize: 18,
    fontFamily: "Inter-Regular",
  },

  inputError: {
    height: 20,
    marginTop: 5,
    color: "red",
  },

  btnSubmit: {
    height: 70,
    borderRadius: 10,
    width: "100%",
    backgroundColor: "#e39d0d",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
  },

  btnText: {
    color: "#fdfbe3",
    fontSize: 20,
    textAlign: "center",
    fontFamily: "Inter-SemiBold",
  },
});
