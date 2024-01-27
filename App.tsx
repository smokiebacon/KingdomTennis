import { StyleSheet, View, FlatList, Keyboard, Button } from "react-native"
import { useContext, useEffect, useState } from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import ManageMatch from "./screens/ManageMatch"
import History from "./screens/Timeline"
import Settings from "./screens/Settings"
import Login from "./screens/Login"
import Signup from "./screens/Signup"
import { AuthContext } from "./store/auth-context"
import { GlobalStyles, Colors } from "./constants/styles"
import { Ionicons } from "@expo/vector-icons"
import { Divider, FAB, IconButton } from "react-native-paper"
import * as SplashScreen from "expo-splash-screen"
import AuthContextProvider from "./store/auth-context"
import EventsContextProvider from "./store/events-context"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { Session } from "@supabase/supabase-js"
import supabase from "./supabaseClient"
import {GestureHandlerRootView } from 'react-native-gesture-handler';
// import GestureHandlerRootView from "react-native-gesture-handler"
const Stack = createNativeStackNavigator()
const BottomTabs = createBottomTabNavigator()

function AuthStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: Colors.primary500 },
          headerTintColor: "white",
          contentStyle: { backgroundColor: Colors.primary100 },
        }}
      >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

function KingdomTennis() {
  return (
    <EventsContextProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: GlobalStyles.colors.gray500 },
            headerTintColor: "white",
          }}
        >
          <Stack.Screen
            name="MatchesOverview"
            component={MatchesOverView}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Edit Event"
            component={ManageMatch}
            options={{
              presentation: "modal",
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </EventsContextProvider>
  )
}

function MatchesOverView() {
  return (
    <BottomTabs.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: { backgroundColor: GlobalStyles.colors.gray500 },
        headerTintColor: "white",
        tabBarStyle: { backgroundColor: GlobalStyles.colors.gray500 },
        tabBarActiveTintColor: GlobalStyles.colors.accent500,
        headerRight: () => (
          <FAB
            icon="plus"
            style={styles.fab}
            onPress={() => navigation.navigate("Edit Event")}
          />
        ),
      })}
    >
      <BottomTabs.Screen
        name="Timeline"
        component={History}
        options={{
          title: "Timeline",
          tabBarLabel: "Timeline",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar" size={size} color={color} />
          ),
        }}
      />
      <BottomTabs.Screen
        name="Settings"
        component={Settings}
        options={{
          title: "Settings",
          tabBarLabel: "Settings",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings" size={size} color={color} />
          ),
        }}
      />
    </BottomTabs.Navigator>
  )
}
function Navigation() {
  // const authCtx = useContext(AuthContext)
  const [session, setSession] = useState<Session | null>(null);
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      console.log("🚀 ~ supabase.auth.getSession ~ session:", session)
      SplashScreen.hideAsync();
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])
  return (
    <>
      {session && <KingdomTennis />}
      {!session && <AuthStack />}
    </>
  )
}

// function Root() {
//   const [isTryingLogin, setIsTryingLogin] = useState(false)
//   const authCtx = useContext(AuthContext)
//   // useEffect(() => {
//   //   async function fetchToken() {
//   //     const storedToken = await AsyncStorage.getItem("token")
//   //     if (storedToken) {
//   //       authCtx.authenticate(storedToken)
//   //     }
//   //     setIsTryingLogin(true)
//   //   }
//   //   fetchToken()
//   // }, [])

//   // if (isTryingLogin) {
//   //   SplashScreen.hideAsync()
//   // }
//   return 
// }

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }} >
    <Navigation />
      {/* <AuthContextProvider> */}
        {/* <Root /> */}
      {/* </AuthContextProvider> */}
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  fab: { position: "absolute", margin: 8, right: 5, top: 700 },
})
