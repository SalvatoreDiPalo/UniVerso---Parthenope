import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import { store } from "./src/store/store";
import { enableScreens } from "react-native-screens";
import StackNavigator from "./src/navigation/StackNavigator";
import "react-native-reanimated";
import "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import ErrorBoundary from "react-native-error-boundary";
import CustomErrorFallback from "./src/components/CustomErrorFallback";
import AuthProvider from "./src/context/AuthContext";

enableScreens();

export default function App() {
  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <AuthProvider>
          <ErrorBoundary FallbackComponent={CustomErrorFallback}>
            <NavigationContainer>
              <StackNavigator />
            </NavigationContainer>
          </ErrorBoundary>
        </AuthProvider>
      </GestureHandlerRootView>
    </Provider>
  );
}
