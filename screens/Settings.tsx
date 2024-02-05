import Timeline from "../components/Timeline/Timeline"
import { EventsContext } from "../store/events-context"
import { AuthContext } from "../store/auth-context"

import { useContext, useEffect, useState } from "react"
import { View,  StyleSheet, Switch, FlatList, TouchableOpacity } from "react-native"
import { Text, } from 'native-base'
import { getDateMinusDays } from "../util/date"
// import { getAllEvents } from "../util/http"
import Button from "../UI/Button"
import supabase from "../supabaseClient"
import { useTranslation } from "react-i18next"
function Settings({ navigation }) {
  const eventsCtx = useContext(EventsContext)
  const authCtx = useContext(AuthContext)
  const { t } = useTranslation()
  const [value, setValue] = useState(false)
  const [theme, setTheme] = useState(false)

  const notes = eventsCtx.events.map((item) => item.notes)

  const onValueChange = (value) => {
    setValue(value)
  }

  const onThemeChange = (theme) => {
    setTheme(theme)
  }

  // useEffect(() => {
  //   async function fetchEvents() {
  //     const events = await getAllEvents()
  //     eventsCtx.setEvents(events)
  //   }
  //   fetchEvents()
  // }, [])

  // const recentEvents = eventsCtx.events.filter((event) => {
  //   const today = new Date()
  //   const date7DaysAgo = getDateMinusDays(today, 7)
  //   return event.date >= date7DaysAgo && event.date <= today
  // })
  
  return (
    <>
      <View style={styles.container}>
        <View style={styles.switchContainer}>
          <View style={styles.container}>
            <View style={styles.switchContainer}>
              <Text>
                {value
                  ? t('showing_notes_in_timeline')
                  : t('not_showing_notes_in_timeline')}
              </Text>
              <Switch
                style={styles.switch}
                onValueChange={onValueChange}
                value={value}
              />
              <Text>{theme ? t('light_mode') : t('dark_mode')}</Text>
              <Switch
                style={styles.switch}
                onValueChange={onThemeChange}
                value={theme}
              />
            </View>
          </View>
        </View>
      </View>
      <Button onPress={() => { 
        supabase.auth.signOut()
      }}>{t('logout')}</Button>
      <TouchableOpacity onPress={() => navigation.navigate('ChangeLanguage')} style={styles.languageList}>
        <Text fontSize="lg">{t('change_language')}</Text>
      </TouchableOpacity>
      {/* <FlatList
      data={languageArray}
      renderItem={({ item, index })=> {
        return (
          <TouchableOpacity style={styles.languageList}>
            <Text fontSize={"xl"} >
              {item.name}
            </Text>
          </TouchableOpacity>
        )
      }}
       /> */}
      {/* <Timeline events={recentEvents} eventPeriod="Last 7 Days" /> */}
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  switch: {
    marginLeft: 10,
  },
  languageList : {
    paddingHorizontal: 20,
    paddingVertical: 10,
  }
})

export default Settings
