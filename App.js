// pour lancer l'appli react-native :
// react-native run-ios (plus long qu'avec expo)
// npm install -g react-devtools
import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { FontAwesome } from "@expo/vector-icons";

import Search from "./containers/Search";
import FilmDetails from "./containers/FilmDetails";
import Favorites from "./containers/Favorites";

// Pour utiliser Redux :
// npm install --save redux
// npm install --save react-redux
// npm install
import { Provider } from "react-redux";
import store from "./redux/store/configureStore";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            {/* Les screens retournent toujours des fonctions qui retourne un react-element ! */}
            <Stack.Screen
              name="Search"
              options={{
                title: "",
                animationEnabled: true,
                headerTintColor: "black",
              }}
            >
              {() => (
                <Tab.Navigator
                  tabBarOptions={{
                    activeTintColor: "blue",
                    showLabel: false,
                    activeBackgroundColor: "#DDDDDD",
                    inactiveBackgroundColor: "#FFF",
                  }}
                >
                  <Tab.Screen
                    name="Search"
                    options={{
                      tabBarIcon: ({ size, color }) => (
                        <FontAwesome name="search" size={24} color="black" />
                      ),
                    }}
                  >
                    {() => (
                      <Stack.Navigator>
                        <Stack.Screen
                          name="Search"
                          options={{
                            title: "s",
                            animationEnabled: true,
                          }}
                        >
                          {() => <Search />}
                        </Stack.Screen>
                        <Stack.Screen
                          name="Film Details"
                          options={{
                            title: "",
                            animationEnabled: true,
                            headerTintColor: "black",
                            headerBackTitleVisible: true,
                          }}
                        >
                          {(props) => <FilmDetails {...props} />}
                        </Stack.Screen>
                      </Stack.Navigator>
                    )}
                  </Tab.Screen>

                  <Tab.Screen
                    name="Favorites"
                    options={{
                      tabBarIcon: ({ size, color }) => (
                        <FontAwesome name="heart" size={24} color="black" />
                      ),
                    }}
                  >
                    {() => (
                      <Stack.Navigator>
                        <Stack.Screen name="Favorites">
                          {() => <Favorites />}
                        </Stack.Screen>
                      </Stack.Navigator>
                    )}
                  </Tab.Screen>
                </Tab.Navigator>
              )}
            </Stack.Screen>
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }
}