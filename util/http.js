import axios from "axios"
import supabase from "../supabaseClient"

const URL = "https://kingdom-tennis-default-rtdb.firebaseio.com"
export async function storeEvent(eventData) {
  // const response = await axios.post(URL + "/events.json", eventData)
  const supaBaseResponse = await supabase
    .from("Events")
    .insert(eventData)
    .select()
  const id = supaBaseResponse.data[0].id
  console.log(supaBaseResponse.data, "asdf")
  console.log(id, "in storeEvent") //.name is from firebase ID
  return id
}

export async function getEvents() {
  const { data, error } = await supabase.from("Events").select()
  return data
}

// export async function getAllEvents() {
//   const response = await supabase.from("Events").select().order("id")

//   const events = []
//   for (const key in response.data) {
//     const eventObject = {
//       id: key,
//       court: response.data[key].court,
//       date: new Date(response.data[key].date),
//       duration: response.data[key].duration,
//       notes: response.data[key].notes,
//       opponent: response.data[key].opponent,
//     }
//     console.log(eventObject.id, "I AM ID IN GETALLEVENTS")
//     events.push(eventObject)
//     console.log(events, " in")
//   }
//   return events
// }

export async function updateEvent(id, eventData) {
  await supabase.from("Events").update(eventData).eq("id", id)
  // return axios.put(URL + `/events/${id}.json`, eventData)
}
export async function deleteEventBackend(id) {
  await supabase.from("Events").delete().eq("id", id)
  // return axios.delete(URL + `/events/${id}.json`)
}
