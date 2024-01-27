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
function History() {
  const eventsCtx = useContext(EventsContext)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState()
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
        const events = await getEvents(eventsCtx.timelinePeriod)
        eventsCtx.setEvents(events)
        eventsCtx.setSelectedDate(events[0].date);
      } catch (error) {
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
    eventsCtx.setGraphData([ { ...eventsCtx.graphData[0], startDate: format(date,  'yyy-MM-dd'), frontColor :'rgb(228,105,93)' , label: format(date, 'MMM, dd'), } ])
    // console.warn("A date has been picked: ", date);
    hideDatePicker();
  };
  const hideEndDatePicker = () => {
    setEndDatePicker(false);
  }
  const confirmEndDate = (date) => {
    const newObj = { ...eventsCtx.graphData[0], endDate: format(date,  'yyy-MM-dd'), value: reduceDurations(eventsCtx.graphData[0].startDate, format(date,  'yyy-MM-dd')), label: eventsCtx.graphData[0].label + " " + format(date, 'MMM, dd')  }
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
    </>
  )
}
export default History
