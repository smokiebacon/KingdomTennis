import { StyleSheet, View, FlatList, Keyboard, Button } from "react-native"
import { useContext, useEffect, useState } from "react"
import { NavigationContainer,  } from "@react-navigation/native"

import { createNativeStackNavigator,  } from "@react-navigation/native-stack"
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
import EventFormProvider from "./store/eventForm-context"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { Session } from "@supabase/supabase-js"
import supabase from "./supabaseClient"
import {GestureHandlerRootView } from 'react-native-gesture-handler';
import { NativeBaseProvider } from "native-base"
// import GestureHandlerRootView from "react-native-gesture-handler"
const Stack = createNativeStackNavigator()
const BottomTabs = createBottomTabNavigator()
import i18next from "i18next"
import { initReactI18next, useTranslation } from 'react-i18next'
import { languages, defaultLanguage } from "./languages"
import { LanguageProvider, useLanguage } from "./languages/LanguageContext"
import ChangeLanguage from "./components/Setting/ChangeLanguage"
import SelectPlayer from "./screens/SelectPlayer"
import AddPlayerForm from "./components/ManageEvent/AddPlayerForm"
import SelectCourtForm from "./components/ManageEvent/SelectCourtLocation"
import AddCourtForm from "./components/ManageEvent/AddNewCourt"
import AllCourts from "./screens/AllCourts"
import SelectPlayerModal from "./components/ManageEvent/SelectPlayerModal"
import AddNewCategoryForm from "./components/ManageEvent/AddNewCategory"
function AuthStack() {
  const { t } = useTranslation()
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: Colors.primary500 },
          headerTintColor: "white",
          contentStyle: { backgroundColor: Colors.primary100 },
        }}
      >
        <Stack.Screen name="Login" options={{
          title: t("login")
        }} component={Login} />
        <Stack.Screen name="Signup" options={{
          title: t('signup')
        }} component={Signup} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

function KingdomTennis() {
  const { t } = useTranslation();
  return (
    <EventsContextProvider>
      <EventFormProvider>
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
          <Stack.Screen
            name="SelectPlayer"
            component={SelectPlayer}
            options={{
              title  : t('select_player')
            }}
          />
           <Stack.Screen
            name="AllCourts"
            component={AllCourts}
            options={{
              title  : t('all_courts')
            }}
          />
           <Stack.Screen name='ChangeLanguage' component={ChangeLanguage} 
          options={{
            presentation: 'transparentModal',
            headerShown: false,
            contentStyle: {
              backgroundColor: 'rgba(0, 0, 0, 0.5)'
            }

          }}
      />
       <Stack.Screen name='AddPlayerForm' component={AddPlayerForm} 
          options={{
            presentation: 'transparentModal',
            headerShown: false,
            contentStyle: {
              backgroundColor: 'rgba(0, 0, 0, 0.5)'
            }

          }}
      />

<Stack.Screen name='AddNewCategory' component={AddNewCategoryForm} 
          options={{
            presentation: 'transparentModal',
            headerShown: false,
            contentStyle: {
              backgroundColor: 'rgba(0, 0, 0, 0.5)'
            }

          }}
      />
      
      
      
      
        <Stack.Screen name='SelectCourtForm' component={SelectCourtForm} 
          options={{
            presentation: 'transparentModal',
            headerShown: false,
            contentStyle: {
              backgroundColor: 'rgba(0, 0, 0, 0.5)'
            }

          }}
      />
      <Stack.Screen name='AddCourtForm' component={AddCourtForm} 
          options={{
            presentation: 'transparentModal',
            headerShown: false,
            contentStyle: {
              backgroundColor: 'rgba(0, 0, 0, 0.5)'
            }

          }}
      />
       <Stack.Screen name='SelectPlayerModal' component={SelectPlayerModal} 
          options={{
            presentation: 'transparentModal',
            headerShown: false,
            contentStyle: {
              backgroundColor: 'rgba(0, 0, 0, 0.5)'
            }

          }}
      />
        </Stack.Navigator>
      </NavigationContainer>
      </EventFormProvider>
    </EventsContextProvider>
  )
}

function MatchesOverView() {
  const { t } = useTranslation()
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
          title: t("timeline"),
          tabBarLabel:t("timeline"),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar" size={size} color={color} />
          ),
        }}
      />
      <BottomTabs.Screen
        name="Settings"
        component={Settings}
        options={{
          title: t("settings"),
          tabBarLabel: t("settings"),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings" size={size} color={color} />
          ),
        }}
      />
    </BottomTabs.Navigator>
  )
}
i18next.use(initReactI18next).init({
  resources : languages,
  lng : defaultLanguage,
  fallbackLng : defaultLanguage,
  compatibilityJSON : 'v3',
});
function Navigation() {
  const languageCtx = useLanguage();
  // useEffect(() => {

  // },[]);
  // const authCtx = useContext(AuthContext)
  const [session, setSession] = useState<Session | null>(null)
  useEffect(() => {
   
    supabase.auth.getSession().then(({ data: { session } }) => {

      setSession(session)
      console.log("🚀 ~ supabase.auth.getSession ~ session:", session)
      SplashScreen.hideAsync()
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])


  useEffect(() => {
    i18next.changeLanguage(languageCtx.language);
  },[languageCtx.language]);
  return (
    <NativeBaseProvider>
    {/* <LanguageProvider> */}
      {session && <KingdomTennis />}
      {!session && <AuthStack />}
    {/* </LanguageProvider> */}
    </NativeBaseProvider>
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
      <LanguageProvider>
      <Navigation />
      {/* <AuthContextProvider> */}
      {/* <Root /> */}
      {/* </AuthContextProvider> */}
      </LanguageProvider>
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  fab: { position: "absolute", margin: 8, right: 5, top: 700 },
})
