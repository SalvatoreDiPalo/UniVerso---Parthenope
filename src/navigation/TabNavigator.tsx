import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import DashboardScreen from "../screens/Dashboard/DashboardScreen";
import ProfileScreen from "../screens/Profile/ProfileScreen";
import AgendaScreen from "../screens/Agenda/AgendaScreen";
import { FontAwesome5 } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  const insets = useSafeAreaInsets();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: {
          height: 60 + insets.bottom,
          paddingBottom: insets.bottom + 8,
        },
        tabBarIcon: ({ color, size }) => {
          let iconName: keyof typeof FontAwesome5.glyphMap = "home";

          if (route.name === "Agenda") {
            iconName = "calendar";
          } else if (route.name === "Profilo") {
            iconName = "user";
          }
          return <FontAwesome5 name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen name="Agenda" component={AgendaScreen} />
      <Tab.Screen
        name="Profilo"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}
