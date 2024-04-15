import {
  NativeStackNavigationOptions,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import HomeScreen from "../screens/Home/HomeScreen";
import LoginScreen from "../screens/Login/LoginScreen";
import LibrettoScreen from "../screens/Libretto/LibrettoScreen";
import { RootStackParamList } from "./RootStackParamList";
import TaxesScreen from "@/src/screens/Taxes/TaxesScreen";
import ExamsViewer from "@/src/screens/ExamsViewer";
import StatisticsScreen from "../screens/Statistics/StatisticsScreen";
import { useAuth } from "../context/AuthContext";
import SplashScreen from "../screens/SplashScreen";
import AnnualTaxesScreen from "../screens/Taxes/AnnualTaxes/AnnualTaxesScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function StackNavigator() {
  const { isAuthenticated, isDataLoading, isPageLoading } = useAuth();

  return (
    <Stack.Navigator>
      {isPageLoading ? (
        <>
          <Stack.Screen
            name="Splash"
            component={SplashScreen}
            options={{
              animation: "slide_from_right",
              animationDuration: 2000,
              headerShown: false,
            }}
          />
        </>
      ) : isAuthenticated && !isDataLoading ? (
        <>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{
              animation: "fade",
              animationDuration: 1000,
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Libretto"
            component={LibrettoScreen}
            options={headerOptions("Libretto")}
          />
          <Stack.Screen
            name="CalendarioAppelli"
            component={ExamsViewer}
            options={headerOptions("Calendario appelli")}
          />

          <Stack.Screen
            name="Tasse"
            component={TaxesScreen}
            options={headerOptions("Tasse")}
          />
          <Stack.Screen
            name="TasseAnnuali"
            component={AnnualTaxesScreen}
            initialParams={{ item: undefined }}
            options={headerOptions("Tasse annuali")}
          />
          <Stack.Screen
            name="Statistics"
            component={StatisticsScreen}
            options={headerOptions("Statistiche")}
          />
        </>
      ) : (
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
      )}
    </Stack.Navigator>
  );
}

function headerOptions(title: string): NativeStackNavigationOptions {
  return {
    headerShown: true,
    headerShadowVisible: false,
    title: title,
    headerTitleAlign: "center",
    headerStyle: {
      backgroundColor: "whitesmoke",
    },
  };
}
