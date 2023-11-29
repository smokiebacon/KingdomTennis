import { View, StyleSheet, TextInput } from "react-native"
import { GlobalStyles } from "../constants/styles"
import { useContext, useLayoutEffect, useState } from "react"
import { Ionicons } from "@expo/vector-icons"
import { EventsContext } from "../store/events-context"
import EventForm from "../components/ManageEvent/EventForm"
import Button from "../UI/Button"

import {
  Modal,
  Portal,
  PaperProvider,
  Divider,
  SegmentedButtons,
} from "react-native-paper"
import { storeEvent, updateEvent, deleteEventBackend } from "../util/http"
import LoadingOverlay from "../UI/LoadingOverlay"
import ErrorOverlay from "../UI/ErrorOverlay"

function ManageMatch({ route, navigation }) {
  const eventCtx = useContext(EventsContext)
  const editedMatchId = route.params?.eventId
  const isEditting = !!editedMatchId //true or false if edit match id exists; !!trasnfer into a boolean
  const [visible, setVisible] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState()
  const containerStyle = { backgroundColor: "white", padding: 20 }

  const showModal = () => setVisible(true)
  const hideModal = () => setVisible(false)
  const [event, setEvent] = useState("Rally")

  async function deleteEvent() {
    setIsLoading(true)
    try {
      eventCtx.deleteEvent(editedMatchId)
      await deleteEventBackend(editedMatchId)
      console.log(editedMatchId, "from ManageMatch frontend edit")
      navigation.goBack()
    } catch (error) {
      setError("Could not delete event.")
      setIsLoading(true)
    }
  }

  const selectedEvent = eventCtx.events.find(
    (event) => event.id === editedMatchId
  )

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditting ? "Edit Event" : "Add Event",
      headerRight: () =>
        isEditting ? (
          <Ionicons
            name="trash-bin-outline"
            size={40}
            color={GlobalStyles.colors.error500}
            onPress={deleteEvent}
          />
        ) : (
          ""
        ),
    })
  }, [navigation, isEditting])

  if (error && !isLoading) {
    return <ErrorOverlay message={error} />
  }

  if (isLoading) {
    return <LoadingOverlay />
  }

  async function confirmHandler(eventData) {
    setIsLoading(true)
    try {
      if (isEditting) {
        eventCtx.editEvent(editedMatchId, eventData)
        await updateEvent(editedMatchId, eventData)
      } else {
        const id = await storeEvent(eventData)
        eventCtx.addEvent({ ...eventData, id: id })
      }
      navigation.goBack()
    } catch (error) {
      setError("Could not save data - please try again")
      setIsLoading(false)
    }
  }

  return (
    <View style={styles.container}>
      <Divider />
      <EventForm
        onSubmit={confirmHandler}
        event={event}
        isEditting={isEditting}
        defaultValues={selectedEvent}
      />
      <PaperProvider>
        <Portal>
          <Modal
            visible={visible}
            onDismiss={hideModal}
            contentContainerStyle={containerStyle}
          >
            <SegmentedButtons
              value={event}
              onValueChange={setEvent}
              buttons={[
                {
                  value: "Singles",
                  label: "Singles",
                },
                {
                  value: "Doubles",
                  label: "Doubles",
                },
                { value: "Rally", label: "Rally" },
              ]}
            />
          </Modal>
        </Portal>
        <Button style={{ marginTop: 30 }} onPress={showModal}>
          Change Event Type
        </Button>
      </PaperProvider>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.gray500,
  },
})
export default ManageMatch
