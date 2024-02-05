import { useContext, useState } from "react"
import AuthContent from "../components/Auth/AuthContent"
import { createUser } from "../util/auth"
import LoadingOverlay from "../UI/LoadingOverlay"
import { useNavigation } from "@react-navigation/native"
import { Alert } from "react-native"
import { AuthContext } from "../store/auth-context"
import supabase from "../supabaseClient"

function Signup({  navigation }) {
  //   const navigation = useNavigation()
  const [isAuthenticating, setIsAuthenticating] = useState(false)
  const authCtx = useContext(AuthContext)
  async function signupHandler({ email, password }) {
    setIsAuthenticating(true)
    try {
      const { data: { session }, error }  = await supabase.auth.signUp({
        email: email, password: password,
      })
      if(error) { 
        Alert.alert(error.message);
      }
      if(!session) {
        Alert.alert('Confirm Email',"Please check your inbox for email verification", [{ text: 'Ok', onPress: () => { navigation.replace("Login")} }], { cancelable: false })  
      }
      // const token = await createUser(email, password)
      // authCtx.authenticate(token)
    } catch (error) {
      Alert.alert("Auth failed")
      console.log(error, "error in Signup.js screen")
    }
    setIsAuthenticating(false)
  }

  if (isAuthenticating) {
    return <LoadingOverlay />
  }

  return <AuthContent isLogin={false} onAuthenticate={signupHandler} />
}

export default Signup
