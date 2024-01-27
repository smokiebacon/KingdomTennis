import { createContext, useReducer, useState } from "react"
import {  startOfMonth, format }  from 'date-fns'
export const EventsContext = createContext({
  events: [],
  addEvent: ({
    notes,
    duration,
    date,
    court,
    teammate,
    opponent,
    opponent2,
    session,
  }) => {},
  setEvents: (events) => {},
  deleteEvent: (id) => {},
  editEvent: (
    id,
    { notes, duration, date, court, teammate, opponent, opponent2, session }
  ) => {},
  timelinePeriod : "Month",
  setTimeLinePeriod : (period) => {},
  setSelectedDate : (date) => {},
  selectedDate: null,
  setSelectedPeriod : (obj) => {},
  selectedPeriod : null,
  graphData: [],
  setGraphData : (graphData) => {},
})

function eventsReducer(state, action) {
  switch (action.type) {
    case "ADD":
      return [action.payload, ...state]
    case "SET":
      const inverted = action.payload
      return inverted
    case "UPDATE":
      const updatedEventIndex = state.findIndex(
        (event) => event.id === action.payload.id
      )
      const updatedEvent = state[updatedEventIndex]
      const updatedItem = { ...updatedEvent, ...action.payload.data }
      const updatedEvents = [...state]
      updatedEvents[updatedEventIndex] = updatedItem
      return updatedEvents
    case "DELETE":
      return state.filter((event) => event.id !== action.payload)
    default:
      return state
  }
}

function EventsContextProvider({ children }) {
  const [eventsState, dispatch] = useReducer(eventsReducer, [])
  const [timelinePeriod, setTimeLinePeriod] = useState('Month');
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedPeriod, setSelectedPeriod] = useState(null)
  const [graphData, setGraphData] =  useState([]);
  function addEvent(eventData) {

    dispatch({ type: "ADD", payload: eventData })
  }
  function setEvents(events) {
    dispatch({ type: "SET", payload: events })
  }
  function deleteEvent(id) {
    dispatch({ type: "DELETE", payload: id })
  }

  function editEvent(id, eventData) {
    dispatch({ type: "UPDATE", payload: { id: id, data: eventData } })
  }

  const value = {
    events: eventsState,
    addEvent: addEvent,
    setEvents: setEvents,
    deleteEvent: deleteEvent,
    editEvent: editEvent,
    timelinePeriod: timelinePeriod,
    setTimeLinePeriod,
    selectedDate: selectedDate,
    setSelectedDate,
    selectedPeriod,
    setSelectedPeriod,
    graphData,
    setGraphData
  }

  return (
    <EventsContext.Provider value={value}>{children}</EventsContext.Provider>
  )
}

export default EventsContextProvider
