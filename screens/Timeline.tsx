import Timeline from "../components/Timeline/Timeline"
import { EventsContext } from "../store/events-context"
import { useState, useContext, useEffect } from "react"
import { getEvents } from "../util/http"
import DropdownComponent from "../components/Timeline/DropdownComponent"
import LoadingOverlay from "../UI/LoadingOverlay"
import ErrorOverlay from "../UI/ErrorOverlay"
import { startOfWeek, startOfMonth, startOfYear, format,  } from 'date-fns'
import { TouchableOpacity, View, Text} from "react-native"
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { GlobalStyles } from "../constants/styles"
import ActionButton from 'react-native-action-button';
import { useColorTheme } from "../constants/theme"

function History({ navigation }) {
  const { colors } = useColorTheme()
  const eventsCtx = useContext(EventsContext)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string>()
  const todaysDate = new Date()

  // const [value, setValue] = useState("Month")
  // console.log("🚀 ~ file: Timeline.js:14 ~ History ~ value:", value)
  // const [datePickerOpen, setDatePi]
  const [startDatePicker, setStartDatePicker]= useState(false)
  const [endDatePicker, setEndDatePicker]= useState(false)
  
  
  useEffect(() => {
    async function fetchEvents() {
      setIsLoading(true)
      eventsCtx.setSelectedDate(null)
      try {
        const events = await getEvents()
        await eventsCtx.getAllCourts();
        eventsCtx.setEvents(events)
        if(events?.length) {
          eventsCtx.setSelectedDate(events[0].date);
        }
      } catch (error) {
        console.log("🚀 ~ fetchEvents ~ error:", error)
        setError("Could not get events")
      }
      setIsLoading(false)
    }
    fetchEvents()
  }, [])

  const hideDatePicker = () => {
    setStartDatePicker(false);
  };
  const handleConfirm = (date) => {
    const previousLabel = eventsCtx.graphData[0].endDate
    const obj = { ...eventsCtx.graphData[0], startDate: format(date,  'yyy-MM-dd'), frontColor :'rgb(228,105,93)' , label:  format(date, 'MMM, dd') + "  " + format(new Date(previousLabel), 'MMM, dd') }
    eventsCtx.setGraphData([ obj ])
    eventsCtx.setSelectedPeriod(obj);
    hideDatePicker();
  };
  const hideEndDatePicker = () => {
    setEndDatePicker(false);
  }
  const confirmEndDate = (date) => {
    const newObj = { ...eventsCtx.graphData[0], endDate: format(date,  'yyy-MM-dd'), value: reduceDurations(eventsCtx.graphData[0].startDate, format(date,  'yyy-MM-dd')), label: format(new Date(eventsCtx.graphData[0].startDate), 'MMM, dd') + " " + format(date, 'MMM, dd')  }
    eventsCtx.setGraphData([ newObj ])
    hideEndDatePicker();
    eventsCtx.setSelectedPeriod(newObj)
  }
  
  if (error && !isLoading) {
    return <ErrorOverlay message={error} />
  }

  if (isLoading) {
    return <LoadingOverlay />
  }
  const reduceDurations = (startDate, endDate) => {
  const reduce = eventsCtx.events?.reduce((accum, current) => {
    const currentDate = current.date
    if(currentDate >= startDate && currentDate <= endDate) {
      console.log('true', current);
      return accum + parseInt(current?.duration)
    } else return accum;
  }, 0);
  return reduce;
}

  return (
    <>
    <DateTimePickerModal
    isVisible={startDatePicker}
    mode={"date"}
    onConfirm={handleConfirm}
    onCancel={hideDatePicker}
     />
     <DateTimePickerModal
      isVisible={endDatePicker}
      mode="date"
      onConfirm={confirmEndDate}
      onCancel={hideEndDatePicker}
     
     />
      <DropdownComponent />
      {
        eventsCtx.timelinePeriod === 'Custom' ?
      <View style={{ flexDirection: 'row', justifyContent: 'space-evenly',  backgroundColor: GlobalStyles.colors.gray500, }}>
      <TouchableOpacity onPress={() => {  setStartDatePicker(true) }}>
        <Text style={{ color: '#fff' }}>{format(new Date(eventsCtx?.graphData[0].startDate), 'MMMM, dd')}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setEndDatePicker(true) }>
      <Text style={{ color: '#fff' }}>{format(new Date(eventsCtx?.graphData[0].endDate), 'MMMM, dd')}</Text>
      </TouchableOpacity>
      </View>
      : null
      }
      <Timeline events={eventsCtx.events} eventPeriod={eventsCtx.timelinePeriod} />
      {/* <ActionButton buttonColor={colors.primary} onPress={() => {
        navigation.navigate("Edit Event")
      }} >

      </ActionButton> */}
    </>
  )
}
export default History
