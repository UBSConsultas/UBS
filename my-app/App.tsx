import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Login from "./Telas/Login/Login";
import Cadastro from "./Telas/Cadastro/Cadastro";

const Stack = createStackNavigator();

const CustomHeader = () => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <Image
        source={require("./assets/UbsLog.png.png")}
        style={{ width: 130, height: 40 }}
      />
    </View>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="">
        <Stack.Screen
          name="Cadastro"
          component={Cadastro}
          options={{
            headerTitle: (props) => <CustomHeader {...props} />, // Define o cabeçalho customizado
          }}
        />
        <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
