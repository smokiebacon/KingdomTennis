import axios from "axios"
import supabase from "../supabaseClient"
import { format } from "date-fns"

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


export async function getCourts() {
  const user_id = (await supabase.auth.getSession()).data.session.user.id;
  const { data, error } = await supabase.from('courts').select('*').eq('auth_id', user_id);
  return data;
}


export async function updateFavourite(id: number, favourite: boolean) {
  console.log("🚀 ~ updateFavourite ~ favourite:", favourite, id)
   const res = await supabase
    .from('courts')
    .update({ is_favourite: favourite })
    .eq('id', id)
    .select()
    return res;
  //  console.log("🚀 ~ updateFavourite ~ res:", res)

}
export async function getPlayers() {
  const user_id = (await supabase.auth.getSession()).data.session.user.id;

  const { data, error } = await supabase.from('Players').select('*').eq('auth_id', user_id);
  // .eq('auth_id', user_id);
  console.log("🚀 ~ getPlayers ~ data:", data, error);
  return data;
}
export async function storeCourtLocation(data: { name: string, auth_id: string, is_favourite: boolean }) {
  return await supabase.from('courts').insert(data);
}
export async function storePlayer(data: { name: string, auth_id: string }) {
  console.log("🚀 ~ storePlayer ~ data:", data)
  return await supabase.from('Players').insert(data);
}
export async function getEvents() {
  const user_id = (await supabase.auth.getSession()).data.session.user.id;
  console.log("🚀 ~ getEvents ~ user_id:", user_id)
  const { data, error } = await supabase.from("Events").select().eq('user_id', user_id);
  console.log("🚀 ~ file: http.js:20 ~ getEvents ~ data:", data)
  return data || []
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
export async function deletePlayer(playerId: number) {
  console.log("🚀 ~ deletePlayer ~ playerId:", playerId)
  await supabase.from('Players').delete().eq('id', playerId);
}

export async function deleteCourtLocation (id : number) {
  await supabase.from('courts').delete().eq('id', id);
}