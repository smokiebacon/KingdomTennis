import axios from "axios"
import supabase from "../supabaseClient"
const KEY = "AIzaSyAVyOfZKwdQqbgJJe19gZJeG0BLislk3vo"

async function authenticate(mode, email, password) {
  
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${KEY}`

  const response = await axios.post(url, {
    email: email,
    password: password,
    returnSecureToken: true,
  })
  const token = response.data.idToken
  return token
}

export async function createUser(email, password) {
  const { error, } = await supabase.auth.signInWithPassword({
    email: email,
    password,
  })
  // return authenticate("signUp", email, password)
}

export function loginUser(email, password) {
  return authenticate("signInWithPassword", email, password)
}
