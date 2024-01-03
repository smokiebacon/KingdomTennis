import Timeline from "../components/Timeline/Timeline"
import { EventsContext } from "../store/events-context"
import { useState, useContext, useEffect } from "react"
import { getEvents } from "../util/http"
import DropdownComponent from "../components/Timeline/DropdownComponent"
import LoadingOverlay from "../UI/LoadingOverlay"
import ErrorOverlay from "../UI/ErrorOverlay"
import { startOfWeek, startOfMonth, startOfYear } from "date-fns"

function History() {
  const eventsCtx = useContext(EventsContext)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState()
  const todaysDate = new Date()

  useEffect(() => {
    async function fetchEvents() {
      setIsLoading(true)
      let date = ""
      if (eventsCtx.timePeriod == "Month") {
        date = startOfMonth(todaysDate)
      } else if (eventsCtx.timePeriod == "Year") {
        date = startOfYear(todaysDate)
      } else {
        date = startOfWeek(todaysDate)
      }
      try {
        const events = await getEvents(date)
        eventsCtx.setEvents(events)
      } catch (error) {
        setError("Could not get events")
      }
      setIsLoading(false)
    }
    fetchEvents()
  }, [eventsCtx.timePeriod])

  if (error && !isLoading) {
    return <ErrorOverlay message={error} />
  }

  if (isLoading) {
    return <LoadingOverlay />
  }

  return (
    <>
      <DropdownComponent />
      <Timeline events={eventsCtx.events} eventPeriod="All History" />
    </>
  )
}
export default History
