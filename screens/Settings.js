import Timeline from "../components/Timeline/Timeline"
import { EventsContext } from "../store/events-context"
import { AuthContext } from "../store/auth-context"

import { useContext, useEffect, useState } from "react"
import { View, Text, StyleSheet, Switch } from "react-native"

import { getDateMinusDays } from "../util/date"
import { getAllEvents } from "../util/http"
import Button from "../UI/Button"
import supabase from "../supabaseClient"

function Settings() {
  const eventsCtx = useContext(EventsContext)
  const authCtx = useContext(AuthContext)

  const [value, setValue] = useState(false)
  const notes = eventsCtx.events.map((item) => item.notes)

  const onValueChange = (value) => {
    setValue(value)
  }

  useEffect(() => {
    async function fetchEvents() {
      const events = await getAllEvents()
      eventsCtx.setEvents(events)
    }
    fetchEvents()
  }, [])

  const recentEvents = eventsCtx.events.filter((event) => {
    const today = new Date()
    const date7DaysAgo = getDateMinusDays(today, 7)
    return event.date >= date7DaysAgo && event.date <= today
  })

  return (
    <>
      <View style={styles.container}>
        <View style={styles.switchContainer}>
          <View style={styles.container}>
            <View style={styles.switchContainer}>
              <Text>{value ? notes[0] : "OFF"}</Text>
              <Switch
                style={styles.switch}
                onValueChange={onValueChange}
                value={value}
              />
            </View>
          </View>
        </View>
      </View>
      <Button onPress={() => { 
        supabase.auth.signOut()
      }}>Logout</Button>
      <Timeline events={recentEvents} eventPeriod="Last 7 Days" />
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
})

export default Settings
