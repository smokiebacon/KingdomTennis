import { createContext, useReducer, useState } from "react"
import {  startOfMonth, format }  from 'date-fns'
import { getCourts } from "../util/http"
export const EventsContext = createContext({
  events: [],
  courts: [],
  getAllCourts:async () => {},
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
      console.log(state)
      const mapped = state.map(item => {
        if(item.id === action?.payload.id) {
          return {...action.payload.data, id: action?.payload?.id}
        } else return item;
      })
      console.log(mapped, 'mapppeddddd')
      return mapped;
    case "DELETE":
      return state.filter((event) => event.id !== action.payload)
    default:
      return state
  }
}

function EventsContextProvider({ children }) {
  const [eventsState, dispatch] = useReducer(eventsReducer, [])
  const [courts, setCourts] = useState([]);
  console.log("🚀 ~ EventsContextProvider ~ eventsState:", eventsState)
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
    console.log("id", id, eventData);
    dispatch({ type: "UPDATE", payload: { id: id, data: eventData } })
  }


  const getAllCourts = async () => {
    const data =  await getCourts();
    setCourts(data);
    return data;
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
    setGraphData,
    courts,
    getAllCourts,
  }

  return (
    <EventsContext.Provider value={value}>{children}</EventsContext.Provider>
  )
}

export default EventsContextProvider
