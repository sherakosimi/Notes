import { useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Home from "./Home/Home";
import NoteOverview from "./NoteOverview/NoteOverview";
import { useSelector, useDispatch } from "react-redux";
import { fetchNotesDB } from "../redux/requests";

const Stack = createStackNavigator();

export default function Root() {
  const { database } = useSelector((state) => state.quotes);
  const dispatch = useDispatch();

  useEffect(() => {
    if (database == null) {
      fetchNotesDB(dispatch);
    }
  }, [database]);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="NoteOverview"
          component={NoteOverview}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
