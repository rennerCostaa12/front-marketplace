import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Entypo, AntDesign, FontAwesome5 } from "@expo/vector-icons";

import { Home } from "../Screens/Home";
import { Doubt } from "../Screens/Doubt";
import { ConfigUser } from "../Screens/ConfigUser";
import { HistoryRequests } from "../Screens/HistoryRequests";

const { Navigator, Screen } = createBottomTabNavigator();

export const TabsRoutes = () => {
  return (
    <Navigator
      initialRouteName="home"
      screenOptions={{
        tabBarActiveTintColor: "#FF1493",
        headerShown: false,
      }}
    >
      <Screen
        name="home"
        component={Home}
        options={{
          tabBarLabel: "Home",
          tabBarLabelStyle: {
            fontSize: 14,
            fontFamily: "Lato_700Bold",
          },
          tabBarIcon: ({ color, size }) => (
            <Entypo name="home" size={size} color={color} />
          ),
        }}
      />
      <Screen
        name="requestsProducts"
        component={HistoryRequests}
        options={{
          headerShown: true,
          title: "Pedidos",
          headerStyle: {
            backgroundColor: "#FF1493",
          },
          headerTitleStyle: {
            width: "100%",
            color: "#FFFFFF",
          },
          headerTitleAlign: "center",
          tabBarLabel: "Pedidos",
          tabBarLabelStyle: {
            fontSize: 14,
            fontFamily: "Lato_700Bold",
          },
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="box-open" size={size} color={color} />
          ),
        }}
      />
      <Screen
        name="doubt"
        component={Doubt}
        options={{
          tabBarLabel: "Dúvidas",
          tabBarLabelStyle: {
            fontSize: 14,
            fontFamily: "Lato_700Bold",
          },
          tabBarIcon: ({ color, size }) => (
            <Entypo name="help" size={size} color={color} />
          ),
        }}
      />
      <Screen
        name="configUser"
        component={ConfigUser}
        options={{
          tabBarLabel: "Conta",
          tabBarLabelStyle: {
            fontSize: 14,
            fontFamily: "Lato_700Bold",
          },
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="user" size={size} color={color} />
          ),
        }}
      />
    </Navigator>
  );
};
