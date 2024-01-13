import Timeline from "../components/Timeline/Timeline"
import { EventsContext } from "../store/events-context"
import { useState, useContext, useEffect } from "react"
import { getEvents } from "../util/http"
import DropdownComponent from "../components/Timeline/DropdownComponent"
import LoadingOverlay from "../UI/LoadingOverlay"
import ErrorOverlay from "../UI/ErrorOverlay"
import { startOfWeek, startOfMonth, startOfYear } from 'date-fns'
function History() {
  const eventsCtx = useContext(EventsContext)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState()
  // const [value, setValue] = useState("Month")
  // console.log("🚀 ~ file: Timeline.js:14 ~ History ~ value:", value)
  useEffect(() => {
    async function fetchEvents() {
      setIsLoading(true)
      try {
        let wDate = new Date();
       
        let timeLineDate;
        if(eventsCtx.timelinePeriod === 'Month') {
          timeLineDate = startOfMonth(wDate);
        } else if(eventsCtx.timelinePeriod === 'Week') {
          timeLineDate = startOfWeek(wDate);
        } else {
          timeLineDate = startOfYear(wDate);
        }
        
        console.log(timeLineDate, 'line 23');
        // console.log("🚀 ~ file: Timeline.js:21 ~ fetchEvents ~ dDay:", firstDayWeek)
        const events = await getEvents(timeLineDate)
        console.log("🚀 ~ file: Timeline.js:19 ~ fetchEvents ~ events:", eventsCtx.timelinePeriod)
        eventsCtx.setEvents(events)
      } catch (error) {
        setError("Could not get events")
      }
      setIsLoading(false)
    }
    fetchEvents()
  }, [eventsCtx.timelinePeriod])

  if (error && !isLoading) {
    return <ErrorOverlay message={error} />
  }

  if (isLoading) {
    return <LoadingOverlay />
  }

  return (
    <>
      <DropdownComponent />
      <Timeline events={eventsCtx.events} eventPeriod={eventsCtx.timelinePeriod} />
    </>
  )
}
export default History
