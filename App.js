import "react-native-gesture-handler";
import { Provider } from "react-redux";
import Root from "./screens/Root";
import { store } from "./redux/store";

export default function App() {
  return (
    <Provider store={store}>
      <Root />
    </Provider>
  );
}
