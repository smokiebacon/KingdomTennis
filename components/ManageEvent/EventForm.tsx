import { TextInput, ToggleButton } from "react-native-paper"
import { View, Pressable, StyleSheet } from "react-native"
import { useState } from "react"
import Button from "../../UI/Button"
import { Picker } from "@react-native-picker/picker"

import { format, subDays } from "date-fns"
import { getFormattedDate } from "../../util/date"
import DateTimePickerModal from "react-native-modal-datetime-picker";

import DateTimePicker, { AndroidNativeProps, IOSNativeProps,  } from "@react-native-community/datetimepicker"
function EventForm({ onSubmit, isEditting, defaultValues }) {
  const [inputValues, setInputValues] = useState({
    notes: defaultValues ? defaultValues.notes : "",
    duration: defaultValues ? defaultValues.duration.toString() : "",
    date: defaultValues ? defaultValues.date : new Date(),
    court: defaultValues ? defaultValues.court : "",
    teammate: defaultValues ? defaultValues.teammate : "",
    opponent: defaultValues ? defaultValues.opponent : "",
    opponent2: defaultValues ? defaultValues.opponent2 : "",
    session: defaultValues ? defaultValues.session : "Rally",
  })

  const [showPicker, setShowPicker] = useState(false);
  const [mode, setMode] = useState<any>("date");
  const [date, setDate] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const showTimePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    // console.warn("A date has been picked: ", date);
    const minutes = date.getMinutes() + date.getHours() * 60;
    console.log(minutes);
    setInputValues({
      ...inputValues,
      duration: minutes,
    })

    hideDatePicker();
  };
  const showMode = (currentMode) => {
    setShowPicker(true)
    setMode(currentMode)
  }

  const showDatepicker = () => {
    showMode("date")
  }

  function changeDateToYesterday() {
    const yesterday = subDays(new Date(), 1);
    setDate(yesterday);
    // setInputValues(currentInputValues => ({
    //   ...currentInputValues,
    //   ['date'] : yesterday,
    // }))
    // setInputValues((currentInputValues) => {
    //   return {
    //     ...currentInputValues,
    //     ["date"]: date,
    //   }
    // })
  }

  // const onChange = (selectedDate) => {
  //   setInputValues((currentInputValues) => {
  //     return {
  //       ...currentInputValues,
  //       ["date"]: selectedDate,
  //     }
  //   })
  //   setShowPicker(false)
  // }

  const onDateChange = (event, selectedDate) => {
    setDate(selectedDate)
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
      duration: inputValues.duration,
      date: date.toLocaleDateString(), //should be an Object in DatePicker but Supabase wants as a string
      court: inputValues.court,
      teammate: inputValues.teammate,
      opponent: inputValues.opponent,
      opponent2: inputValues.opponent2,
      session: inputValues.session,
    }
    console.log(eventData);
    // const durationIsValid =
    //   !!isNaN(eventData.duration) && eventData.duration > 0
    // if (!durationIsValid) {
    //   return
    // }
    onSubmit(eventData)
  }
  return (
    <View>
      {showPicker ? (
        <DateTimePicker
          value={date} //needs to be an Object
          testID="dateTimePicker"
          mode={mode}
          onChange={onDateChange}
        />
      ) : null}
         <DateTimePickerModal
        isVisible={isDatePickerVisible}
        // mode="date"
        locale="en_GB"
        mode='time'
        date={new Date(new Date().setHours(0, 0, 0, 0))}
        is24Hour
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
      {/* <Text>{inputValues.date}</Text> */}
      <TextInput
        value={date.toLocaleDateString()}
        onChangeText={inputChange.bind(this, "date")}
        outlineColor="green"
        // disabled
        left={
          <TextInput.Icon
            icon="calendar"
            forceTextInputFocus={false}
            onPress={showDatepicker}
          />
        }
        right={
          <TextInput.Icon
            onPress={() => changeDateToYesterday()}
            icon="eye"
            forceTextInputFocus={false}
          />
        }
      />
      <TextInput
        label="Court Location"
        value={inputValues.court}
        placeholder="Court Location"
        onChangeText={inputChange.bind(this, "court")}
      />
      <TextInput
       left={
          <TextInput.Icon
            icon="calendar"
            forceTextInputFocus={false}
            onPress={showTimePicker}
          />
        }
        label="Duration"
        value={`${inputValues.duration}`}
        placeholder="Hours and Minutes"
        // keyboardType="decimal-pad"
        onChangeText={inputChange.bind(this, "duration")}
        
      />
      <Picker
        itemStyle={{
          color: "#008b8b",
        }}
        selectedValue={inputValues.session}
        onValueChange={inputChange.bind(this, "session")}
      >
        <Picker.Item label="Singles" value="Singles" />
        <Picker.Item label="Doubles" value="Doubles" />
        <Picker.Item label="Rally" value="Rally" />
        <Picker.Item label="Match" value="Match" />
      </Picker>
      {/* {inputValues.session === "Match" ?   <TextInput
            label="Set 1"
            value={inputValues.game_1_score}
            placeholder="Game 1 Score"
            onChangeText={inputChange.bind(this, "teammate")}
          />: ('')} */}

      {inputValues.session === "Doubles" ? (
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
      {inputValues.session === "Singles" || "Rally" ? (
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
