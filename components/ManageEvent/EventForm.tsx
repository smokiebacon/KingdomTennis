import { TextInput, ToggleButton } from "react-native-paper"
import { View, Pressable, StyleSheet, TouchableOpacity } from "react-native"
import { useState } from "react"
import Button from "../../UI/Button"
import { Picker } from "@react-native-picker/picker"
import { FormControl, Icon, Input, InputGroup, InputLeftAddon, InputRightAddon, Text} from 'native-base'
import { useFormik } from 'formik'
import * as Yup from 'yup';
import { format, subDays } from "date-fns"
import { getFormattedDate } from "../../util/date"
import DateTimePickerModal from "react-native-modal-datetime-picker";
import supabase from "../../supabaseClient"
import DateTimePicker, { AndroidNativeProps, IOSNativeProps,  } from "@react-native-community/datetimepicker"
import Entypo from '@expo/vector-icons/Entypo'



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
  }


  const onDateChange = (event, selectedDate) => {
    setDate(selectedDate)
    setShowPicker(false)
  }

  function inputChange(inputIdentifier, enteredValue) {
    setInputValues((currentInputValues) => {
      return {
        ...currentInputValues,
        [inputIdentifier]: enteredValue,
      }
    })
  }
  async function submitHandler() {
    if(!inputValues.duration) {
      return;
    }
    const auth = (await supabase.auth.getSession()).data.session.user.id;
    const eventData = {
      notes: inputValues.notes,
      duration: inputValues.duration,
      date: format(date, 'yyy-MM-dd'), //should be an Object in DatePicker but Supabase wants as a string
      court: inputValues.court,
      teammate: inputValues.teammate,
      opponent: inputValues.opponent,
      opponent2: inputValues.opponent2,
      session: inputValues.session,
      user_id : auth
    }
    console.log(eventData);
  
  
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
      {/* <FormControl 
      margin={1}
       w={{
  base: '96',
}}>
<FormControl.Label   >
  <Text color={"white"}>
        Date
  </Text>
</FormControl.Label>
      <Input
      value={date.toLocaleDateString()}
       height={50}   leftElement={
        <TouchableOpacity onPress={showDatepicker} style={{ marginHorizontal: 10, }}>
      <Icon as={<Entypo name="calendar"   />} />
        </TouchableOpacity>
    } 
    InputRightElement={<TouchableOpacity onPress={changeDateToYesterday} style={{  marginRight: 10, }}><Text>Yesterday</Text></TouchableOpacity>}
    backgroundColor={"blueGray.100"}
    />
    
      </FormControl> */}
      
      
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
