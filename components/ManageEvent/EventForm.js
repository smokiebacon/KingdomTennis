import { TextInput, Text } from "react-native-paper"
import { View, Pressable } from "react-native"
import { useState } from "react"
import Button from "../../UI/Button"
import { format } from "date-fns"
import { getFormattedDate } from "../../util/date"

import DateTimePicker from "@react-native-community/datetimepicker"
function EventForm({ event, onSubmit, isEditting, defaultValues }) {
  const [inputValues, setInputValues] = useState({
    notes: defaultValues ? defaultValues.notes : "",
    duration: defaultValues ? defaultValues.duration.toString() : "",
    date: defaultValues ? defaultValues.date : new Date().toLocaleDateString(),
    court: defaultValues ? defaultValues.court : "",
    teammate: defaultValues ? defaultValues.teammate : "",
    opponent: defaultValues ? defaultValues.opponent : "",
    opponent2: defaultValues ? defaultValues.opponent2 : "",
  })

  const [showPicker, setShowPicker] = useState(false)
  const [mode, setMode] = useState("date")
  const [date, setDate] = useState(new Date())

  const showMode = (currentMode) => {
    setShowPicker(true)
    setMode(currentMode)
  }

  const showDatepicker = () => {
    showMode("date")
  }

  function changeDateToYesterday(date) {
    const yesterdaysDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate() - 1
    )
    setInputValues((currentInputValues) => {
      return {
        ...currentInputValues,
        ["date"]: yesterdaysDate,
      }
    })
  }

  const onChange = (selectedDate) => {
    setInputValues((currentInputValues) => {
      return {
        ...currentInputValues,
        ["date"]: selectedDate,
      }
    })
    setShowPicker(false)
  }

  //   setInputValues((currentInputValues) => {
  //     return {
  //       ...currentInputValues,
  //       ["date"]: yesterdaysDate,
  //     }
  //   })
  // }

  function inputChange(inputIdentifier, enteredValue) {
    setInputValues((currentInputValues) => {
      return {
        ...currentInputValues,
        [inputIdentifier]: enteredValue,
      }
    })
  }
  function submitHandler() {
    const eventData = {
      notes: inputValues.notes,
      duration: +inputValues.duration,
      date: inputValues.date,
      court: inputValues.court,
      teammate: inputValues.teammate,
      opponent: inputValues.opponent,
      opponent2: inputValues.opponent2,
    }

    // const durationIsValid =
    //   !!isNaN(eventData.duration) && eventData.duration > 0
    // if (!durationIsValid) {
    //   return
    // }
    onSubmit(eventData)
  }
  return (
    <View>
      {showPicker && (
        <DateTimePicker
          value={inputValues.date}
          testID="dateTimePicker"
          mode={mode}
          onChange={onChange}
        />
      )}
      <Text>{inputValues.date}</Text>
      {/* <TextInput
        value={getFormattedDate(inputValues.date)}
        onChangeText={inputChange.bind(this, "date")}
        outlineColor="green"
        left={
          <TextInput.Icon
            icon="calendar"
            forceTextInputFocus={false}
            onPress={showDatepicker}
          />
        }
        right={
          <TextInput.Icon
            onPress={() => changeDateToYesterday(new Date())}
            icon="eye"
            forceTextInputFocus={false}
          />
        }
      /> */}
      <TextInput
        label="Court Location"
        value={inputValues.court}
        placeholder="Court Location"
        onChangeText={inputChange.bind(this, "court")}
      />
      <TextInput
        label="Duration"
        value={inputValues.duration}
        placeholder="Hours and Minutes"
        keyboardType="decimal-pad"
        onChangeText={inputChange.bind(this, "duration")}
      />
      {event === "Doubles" ? (
        <>
          <TextInput
            label="Teammate"
            value={inputValues.teammate}
            placeholder="Teammate"
            onChangeText={inputChange.bind(this, "teammate")}
          />
          <TextInput
            label="Opponent 2"
            value={inputValues.opponent2}
            placeholder="Opponent 2"
            onChangeText={inputChange.bind(this, "opponent2")}
          />
        </>
      ) : (
        ""
      )}
      {event === "Singles" || "Rally" ? (
        <TextInput
          label="Opponent 1"
          value={inputValues.opponent}
          placeholder="Opponent"
          onChangeText={inputChange.bind(this, "opponent")}
        />
      ) : (
        ""
      )}
      <TextInput
        label="Notes"
        value={inputValues.notes}
        placeholder="Great forehands today!"
        multiline={true}
        onChangeText={inputChange.bind(this, "notes")}
      />
      <Button onPress={submitHandler}>
        {isEditting ? "Save Changes" : "Add Event"}
      </Button>
    </View>
  )
}
export default EventForm
