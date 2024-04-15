import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Constants } from "@/src/constants/Constant";
import Bookable from "./components/bookable/Bookable";
import Booked from "./components/booked/Booked";

const Tab = createMaterialTopTabNavigator();

export default function ExamsViewer() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: {
          fontSize: 12,
        },
        tabBarStyle: {
          borderRadius: 12,
          marginHorizontal: 16,
        },
        tabBarIndicatorStyle: {
          width: Constants.totalWidth / 4 - 8,
          left: Constants.totalWidth / 8 - 8,
        },
        lazy: true,
      }}
    >
      <Tab.Screen name="Prenotabili" component={Bookable} />
      <Tab.Screen name="Prenotati" component={Booked} />
    </Tab.Navigator>
  );
}
