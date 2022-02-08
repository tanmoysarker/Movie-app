import React, { Component } from "react";
import {
    StyleSheet,
    ActivityIndicator,
    SafeAreaView,
} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./Home/Home";
import Favorite from "./Favourite/Favourite";
import Genre from "./Genre/Genre";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { ThemeContext } from "../contexts/ThemeContext";
const Tab = createBottomTabNavigator();

class MainRoot extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            genres: [],
        };
    }


    render() {

        const HomeComponent = (props) => (
            <Home {...props} genres={this.state.genres} />
        );
        if (this.state.isLoading) {
            <SafeAreaView
                style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
            >
                <ActivityIndicator />
            </SafeAreaView>;
        }

        return (
            <ThemeContext.Consumer>
                {(context) => {
                    const { isDarkMode, light, dark } = context;
                    return (
                        <Tab.Navigator
                            screenOptions={{
                                tabBarActiveTintColor: isDarkMode ? "#E50914" : "#FFF",
                                tabBarInactiveTintColor: "#999",
                                keyboardHidesTabBar: true,
                                labelStyle: { fontFamily: "poppins-r" },
                                tabBarActiveLabelStyle: {
                                    color: isDarkMode ? "#FFF" : "#333"
                                },
                                tabBarIconStyle: {
                                    color: isDarkMode ? "#FFF" : "#333"
                                },
                                tabBarHideOnKeyboard: true,
                                tabBarStyle: {
                                    backgroundColor: isDarkMode ? dark.bg : light.bg,
                                    borderTopWidth: 0,
                                    shadowColor: "#000",
                                    shadowOffset: {
                                        width: 0,
                                        height: 4,
                                    },
                                    shadowOpacity: 0.25,
                                    shadowRadius: 8,
                                },
                            }}
                            initialRouteName="Home"
                        >
                            <Tab.Screen
                                options={{
                                    headerShown: false,
                                    tabBarLabel: "Home",
                                    tabBarIcon: ({ color, size }) => (
                                        <MaterialCommunityIcons
                                            name="home"
                                            color={color}
                                            size={22}
                                        />
                                    ),
                                }}
                                name={"Home"}
                                component={HomeComponent}
                            />
                            <Tab.Screen
                                options={{
                                    headerShown: false,
                                    tabBarLabel: "Favorite",
                                    tabBarIcon: ({ color, size }) => (
                                        <MaterialCommunityIcons
                                            name="heart"
                                            color={color}
                                            size={22}
                                        />
                                    ),
                                }}
                                name={"Favorite"}
                                component={Favorite}
                            />

                        </Tab.Navigator>
                    );
                }}
            </ThemeContext.Consumer>
        );
    }
}

export default MainRoot;


