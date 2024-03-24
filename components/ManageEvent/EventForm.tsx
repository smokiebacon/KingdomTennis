import { Avatar, TextInput, ToggleButton, useTheme } from "react-native-paper"
import { View, Pressable, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from "react-native"
import { useEffect, useState } from "react"
import Button from "../../UI/Button"
import { Picker } from "@react-native-picker/picker"
import { Box, FormControl, Icon, Input, InputGroup, InputLeftAddon, InputRightAddon, Text } from 'native-base'
import { useFormik } from 'formik'
// import * as Yup from 'yup';
import { format, subDays } from "date-fns"
import { getFormattedDate } from "../../util/date"
import DateTimePickerModal from "react-native-modal-datetime-picker";
import supabase from "../../supabaseClient"
import DateTimePicker, { AndroidNativeProps, IOSNativeProps, } from "@react-native-community/datetimepicker"
import Entypo from '@expo/vector-icons/Entypo'
import { useColorTheme } from "../../constants/theme"
import CustomTextInput from "./TextInput"
import CustomText from "../common/Text"
import * as Yup from 'yup';
import CustomIcon from "../common/Icon"
import { BaseColor, BaseStyle } from "../../constants/styles"
import { useEventForm } from "../../store/eventForm-context"
import { Actionsheet, useDisclose } from "native-base";
import { SelectCategory } from "./SelectCategory"
import ShowPlayer from "./ShowPlayer"
import { getSessions } from "../../util/http"


function EventForm({ onSubmit, isEditting, defaultValues, navigation }) {
  const initialValues = {
    date: null,

  }
  const validationSchema = Yup.object().shape({
    date: Yup.date().required('Date is Required'),
  })


  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (_values) => {
    }
  })


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
  // const theme = useTheme();
  const { colors } = useColorTheme()
  const [showPicker, setShowPicker] = useState(false);
  const [mode, setMode] = useState<any>("date");
  const [date, setDate] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedPLayerNo, setSelectedPlayerNo] = useState('Single')
  const eventFormCtx = useEventForm()
  const showTimePicker = () => {
    setDatePickerVisibility(true);
  };
  const [user, setUser ] = useState(null);
  const allTimeSessionTypes = [{ name: "Rally" }, { name: "Match" }, { name : "Practice" }];
  const [allCategories, setAllCategories] = useState(allTimeSessionTypes)

  useEffect(() => {
    supabase.auth.getSession().then(res => {
        // console.log("res", res.data.session.user.user_metadata);
        setUser(res?.data?.session?.user?.user_metadata);
    })
  },[])
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };


  useEffect(() => {
    getSessions().then(res => {
        console.log("res",res)
        const newArr = [...allTimeSessionTypes, ...res]
        setAllCategories(newArr);
    })
  }, [])

  const handleConfirm = (date) => {
    const minutes = date.getMinutes() + date.getHours() * 60;
    console.log(minutes);
    eventFormCtx.changeValue('duration', minutes);
    // setInputValues({
    //   ...inputValues,
    //   duration: minutes,
    // })

    hideDatePicker();
  };
  const showMode = (currentMode) => {
    setShowPicker(true)
    setMode(currentMode)
  }

  const {
    isOpen,
    onOpen,
    onClose
  } = useDisclose();
  const showDatepicker = () => {
    showMode("date")
  }

  function changeDateToYesterday() {
    const yesterday = subDays(new Date(), 1);
    setDate(yesterday);
  }


  const onDateChange = (event, selectedDate) => {

    setShowPicker(false)
    eventFormCtx.changeValue('date', selectedDate);
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
    if (!inputValues.duration) {
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
      user_id: auth
    }
    console.log(eventData);
    onSubmit(eventData)
  }
  return (
    <ScrollView>

    
    <View style={{ paddingHorizontal: 10, }}>
      {showPicker ? (
        <DateTimePicker
          value={eventFormCtx.formValue.date} //needs to be an Object
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
      <CustomTextInput
        label={"Date"}
        editable={false}
        iconLeft={
          <TouchableOpacity
            onPress={showDatepicker}
            style={{ marginRight: 10, }}>
            <CustomIcon Iconname="AntDesign" name="calendar" size={30} color={colors.text} />
          </TouchableOpacity>
        }
        placeholder={"Date"}
        value={format(eventFormCtx?.formValue.date, 'yyy-MM-dd')}
        selectionColor={colors.primary}
      />
      <View>
        <CustomText variant="titleMedium" style={{ marginBottom: 8 }} >Court Location</CustomText>
        <TouchableOpacity onPress={() => {
          navigation.navigate('SelectCourtForm')
        }} style={[BaseStyle.textInput, { height: 55, backgroundColor: colors.card }]}>
          <CustomText>{eventFormCtx?.formValue?.court?.name}</CustomText>
        </TouchableOpacity>
      </View>
      <CustomTextInput
        label={"Duration"}
        editable={false}
        iconLeft={
          <TouchableOpacity
            onPress={showTimePicker}
            style={{ marginRight: 10, }}>
            <CustomIcon Iconname="AntDesign" name="calendar" size={30} color={colors.text} />
          </TouchableOpacity>
        }
        value={`${eventFormCtx.formValue.duration}`}
        placeholder="Hours and Minutes"
        // value={}
        selectionColor={colors.primary}
      />
      <CustomTextInput
        value={eventFormCtx.formValue.notes}
        label="Notes"
        placeholder="Notes"
        onChangeText={(text: string) => {
          eventFormCtx.changeValue('notes', text);
        }}
        multiline
        numberOfLines={4}
        style={{
          height: 100,
        }}
        textAlignVertical={'top'}
      />
      <TouchableOpacity onPress={onOpen} style={[BaseStyle.textInput, { height: 55, backgroundColor: colors.card, width: 150, }]}>
        <CustomText>{eventFormCtx.formValue.session || "Select Category"}</CustomText>
      </TouchableOpacity>
      <Actionsheet isOpen={isOpen} onClose={onClose} >
        <Actionsheet.Content backgroundColor={colors.background}>
          <Box w="100%" h={60} px={4} justifyContent="center">
            <CustomText variant="titleMedium" >
              Select Category
            </CustomText>
          </Box>
          <Box w={"100%"} display={'flex'} flexDirection={"row"} flexWrap={"wrap"} >
            {
              allCategories?.map(category => {
                return (
                  <SelectCategory selected={eventFormCtx.formValue.session === category.name} label={category.name} onPress={() => {
                    
                    eventFormCtx.changeValue("session", category.name)
                  }} />  
                )
              })
            }


            <TouchableOpacity onPress={() => {
              navigation.navigate('AddNewCategory')
            }} style={style.addCustom}>
              <CustomIcon 
              Iconname="AntDesign"
              name='plus'
              size={20}
              color={colors.text}
              />
              <CustomText variant={"titleSmall"}>Add Custom</CustomText>
            </TouchableOpacity>
          </Box>
        </Actionsheet.Content>
      </Actionsheet>



      {/* Players */}
      <View style={[style.playerRow]}>
        <View>
          <CustomText variant={"titleMedium"}>Players</CustomText>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity onPress={() => { setSelectedPlayerNo('Single') }} style={[style.selectPlayerNo, { backgroundColor: selectedPLayerNo === 'Single' ? colors.primary : colors.card, borderRadius: selectedPLayerNo === 'Single' ? 5 : 0 }]}>
            <CustomText>Single</CustomText>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { setSelectedPlayerNo('Double') }} style={[style.selectPlayerNo, { backgroundColor: selectedPLayerNo === 'Double' ? colors.primary : colors.card, borderRadius: selectedPLayerNo === 'Double' ? 5 : 0 }]}>
            <CustomText>Double</CustomText>
          </TouchableOpacity>
        </View>
      </View>

      {/* Your Team */}

      <View>
      <CustomText variant={"titleMedium"}>Your Team</CustomText>
      <View style={[style.teamPlayersContainer]}>
        <ShowPlayer playerName={user?.name} />
        {
          selectedPLayerNo === 'Double' &&
        <ShowPlayer playerName={eventFormCtx.formValue.teammate} 
        onPressAddPlayer={() => {
          navigation.navigate('SelectPlayer', { fieldName : "teammate" })
        }}
        />
        }
      </View>
      </View>
      <View>
      <CustomText variant={"titleMedium"}>Opponent</CustomText>
      <View style={[style.teamPlayersContainer]}>
        <ShowPlayer playerName={eventFormCtx.formValue.opponent} onPressAddPlayer={() => {
          navigation.navigate('SelectPlayer', { fieldName : "opponent" })
        }} />
        {
            Boolean(selectedPLayerNo === 'Double') &&
        <ShowPlayer playerName={eventFormCtx.formValue.opponent2} 
        onPressAddPlayer={() => {
          navigation.navigate('SelectPlayer', { fieldName : "opponent2" })
        }}
         />
        }
      </View>
      </View>

     
      <Button onPress={submitHandler}>
        {isEditting ? "Save Changes" : "Add Event"}
      </Button>
    </View>
    </ScrollView>
  )
}


const style = StyleSheet.create({
  playerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 10, },
  selectPlayerNo: { paddingVertical: 10, paddingHorizontal: 20, height: 45, justifyContent: 'center' },
  teamPlayersContainer : {  marginTop: 10, },
  teamPlayer: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  addCustom: {
    ...BaseStyle.textInput, 
    height: 55, 
    width: Dimensions.get('screen').width / 2.5,
    marginRight: 20,
    marginTop: 20,
    justifyContent: 'center',
    gap: 10,
  }

})
export default EventForm
