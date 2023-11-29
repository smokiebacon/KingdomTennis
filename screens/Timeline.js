import Timeline from "../components/Timeline/Timeline"
import { EventsContext } from "../store/events-context"
import { useState, useContext, useEffect } from "react"
import { getAllEvents, getEvents } from "../util/http"
import DropdownComponent from "../components/Timeline/DropdownComponent"
import LoadingOverlay from "../UI/LoadingOverlay"
import ErrorOverlay from "../UI/ErrorOverlay"

function History() {
  const eventsCtx = useContext(EventsContext)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState()

  useEffect(() => {
    async function fetchEvents() {
      setIsLoading(true)
      try {
        const events = await getEvents()
        eventsCtx.setEvents(events)
      } catch (error) {
        setError("Could not get events")
      }
      setIsLoading(false)
    }
    fetchEvents()
  }, [])

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
