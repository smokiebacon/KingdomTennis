import { useState, useContext } from "react"
import { Alert } from "react-native"
import LoadingOverlay from "../UI/LoadingOverlay"
import AuthContent from "../components/Auth/AuthContent"
import { loginUser } from "../util/auth"
import { AuthContext } from "../store/auth-context"
function Login() {
  const [isAuthenticating, setIsAuthenticating] = useState(false)
  const authCtx = useContext(AuthContext)

  async function loginHandler({ email, password }) {
    setIsAuthenticating(true)
    try {
      const token = await loginUser(email, password)
      authCtx.authenticate(token)
    } catch (error) {
      Alert.alert("Login failed")
      console.log(error)
    }
    setIsAuthenticating(false)
  }

  if (isAuthenticating) {
    return <LoadingOverlay />
  }
  return <AuthContent isLogin onAuthenticate={loginHandler} />
}

export default Login
