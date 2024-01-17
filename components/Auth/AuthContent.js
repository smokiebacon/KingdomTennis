import { useState } from "react"
import { Alert, StyleSheet, View } from "react-native"

import FlatButton from "../../UI/FlatButton"
import AuthForm from "./AuthForm"
import { Colors } from "../../constants/styles"
import { useNavigation } from "@react-navigation/native"
import supabase from "../../supabaseClient"
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin'
function AuthContent({ isLogin, onAuthenticate }) {
  GoogleSignin.configure({
    scopes: ['https://www.googleapis.com/auth/drive.readonly'],
    webClientId: '716757080003-04kk7jn4ejhg55ilk15u1c6vm2u33m4n.apps.googleusercontent.com',
  })


  const navigation = useNavigation()
  const [credentialsInvalid, setCredentialsInvalid] = useState({
    email: false,
    password: false,
    confirmEmail: false,
    confirmPassword: false,
  })

  function switchAuthModeHandler() {
    if (isLogin) {
      navigation.replace("Signup")
    } else {
      navigation.replace("Login")
    }
  }

  function submitHandler(credentials) {
    let { email, confirmEmail, password, confirmPassword } = credentials

    email = email.trim()
    console.log("🚀 ~ submitHandler ~ email:", email)
    password = password.trim()

    const emailIsValid = email.includes("@")
    const passwordIsValid = password.length > 6
    const emailsAreEqual = email === confirmEmail
    console.log("🚀 ~ submitHandler ~ emailsAreEqual:", emailsAreEqual)
    const passwordsAreEqual = password === confirmPassword

    if (
      !emailIsValid ||
      !passwordIsValid ||
      (!isLogin && (!emailsAreEqual || !passwordsAreEqual))
    ) {
      Alert.alert("Invalid input", "Please check your entered credentials.")
      setCredentialsInvalid({
        email: !emailIsValid,
        confirmEmail: !emailIsValid || !emailsAreEqual,
        password: !passwordIsValid,
        confirmPassword: !passwordIsValid || !passwordsAreEqual,
      })
      return
    }
    onAuthenticate({ email, password })
  }

  return (
    <View style={styles.authContent}>
      <AuthForm
        isLogin={isLogin}
        onSubmit={submitHandler}
        credentialsInvalid={credentialsInvalid}
      />
      <View style={styles.buttons}>
        <FlatButton onPress={switchAuthModeHandler}>
          {isLogin ? "Create a new user" : "Log in instead"}
        </FlatButton>
        <GoogleSigninButton
      size={GoogleSigninButton.Size.Wide}
      color={GoogleSigninButton.Color.Dark}
      onPress={async () => {
        try {
          const available = await GoogleSignin.hasPlayServices()
          console.log("🚀 ~ available:", available)
          const userInfo = await GoogleSignin.signIn()
          console.log("🚀 ~ onPress={ ~ userInfo:", userInfo)
          if (userInfo.idToken) {
            const { data, error } = await supabase.auth.signInWithIdToken({
              provider: 'google',
              token: userInfo.idToken,
            })
            console.log(error, data)
          } else {
            throw new Error('no ID token present!')
          }
        } catch (error) {
          console.log("🚀 ~ onPress={ ~ error:", error)
          if (error.code === statusCodes.SIGN_IN_CANCELLED) {
            // user cancelled the login flow
          } else if (error.code === statusCodes.IN_PROGRESS) {
            console.log('999999')
            // operation (e.g. sign in) is in progress already
          } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            // play services not available or outdated
          } else {
            // some other error happened
          }
        }
      }}
    />
      </View>
    </View>
  )
}

export default AuthContent

const styles = StyleSheet.create({
  authContent: {
    marginTop: 64,
    marginHorizontal: 32,
    padding: 16,
    borderRadius: 8,
    backgroundColor: Colors.primary800,
    elevation: 2,
    shadowColor: "black",
    shadowOpacity: 0.35,
    shadowRadius: 4,
  },
  buttons: {
    marginTop: 8,
  },
})
