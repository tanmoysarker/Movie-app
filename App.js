import React, { useState } from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import MainRoot from "./src/pages/MainRoot";
import MovieDetail from "./src/pages/MovieDetail/MovieDetail";
import ThemeContextProvider from "./src/contexts/ThemeContext";


const Stack = createStackNavigator();

export default function App() {

  const [initialPage, setInitialPage] = useState("MainRoot");

  return (
    <ThemeContextProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={initialPage}
          screenOptions={{
            headerShown: false
          }}
        >
          <Stack.Screen
            name="MainRoot"
            component={MainRoot}
            options={{
              title: "MainRoot",
            }}
          />
          <Stack.Screen
            name="MovieDetail"
            component={MovieDetail}
            options={{ title: "MovieDetail" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeContextProvider>
  );
}
