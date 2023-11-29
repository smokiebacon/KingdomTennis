import { useContext, useState } from "react"
//show notes if switch is set to True
// in the TimelineItem.js file
export function settings() {
  const eventsCtx = useContext(EventsContext)
  const [value, setValue] = useState(false)
  const notes = eventsCtx.events.map((item) => item.notes)

  const onValueChange = (value) => {
    setValue(value)
  }
}
