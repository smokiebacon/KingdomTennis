import { useState } from "react"
import { StyleSheet, View } from "react-native"

import Button from "../../UI/Button"
import Input from "./Input"
import { useTranslation } from "react-i18next"
import CustomTextInput from "../ManageEvent/TextInput"

function AuthForm({ isLogin, onSubmit, credentialsInvalid }) {
  const [enteredEmail, setEnteredEmail] = useState("")
  const [enteredConfirmEmail, setEnteredConfirmEmail] = useState("")
  const [enteredPassword, setEnteredPassword] = useState("")
  const [enteredConfirmPassword, setEnteredConfirmPassword] = useState("")
  const { t } = useTranslation()
  const {
    email: emailIsInvalid,
    confirmEmail: emailsDontMatch,
    password: passwordIsInvalid,
    confirmPassword: passwordsDontMatch,
  } = credentialsInvalid

  function updateInputValueHandler(inputType, enteredValue) {
    console.log(inputType, enteredValue);
    switch (inputType) {
      case "email":
        setEnteredEmail(enteredValue)
        break
      case "confirmEmail":
        setEnteredConfirmEmail(enteredValue)
        break
      case "password":
        setEnteredPassword(enteredValue)
        break
      case "confirmPassword":
        setEnteredConfirmPassword(enteredValue)
        break;
      default:
          break;
    }
  }

  function submitHandler() {
    onSubmit({
      email: enteredEmail,
      confirmEmail: enteredConfirmEmail,
      password: enteredPassword,
      confirmPassword: enteredConfirmPassword,
    })
  }

  return (
    <View>
      <View>
        <CustomTextInput 
         label={('email_address')}
         secureTextEntry
         onChangeText={updateInputValueHandler.bind(this, "email")}
         value={enteredEmail}
         keyboardType={"email-address"}
         isValid={emailIsInvalid}
        />
        <Input
          secure={false}
          label={t('email_address')}
          onUpdateValue={updateInputValueHandler.bind(this, "email")}
          value={enteredEmail}
          keyboardType="email-address"
          isInvalid={emailIsInvalid}
        />
        {!isLogin && (
          <Input
            secure={false}
            label={t('confirm_email_address')}
            onUpdateValue={updateInputValueHandler.bind(this, "confirmEmail")}
            value={enteredConfirmEmail}
            keyboardType="email-address"
            isInvalid={emailsDontMatch}
          />
        )}
        <Input
        keyboardType="default"
          label={t('password')}
          onUpdateValue={updateInputValueHandler.bind(this, "password")}
          secure
          value={enteredPassword}
          isInvalid={passwordIsInvalid}
        />
        {!isLogin && (
          <Input
          keyboardType="default"
            label={t('confirm_password')}
            onUpdateValue={updateInputValueHandler.bind(
              this,
              "confirmPassword"
            )}
            secure
            value={enteredConfirmPassword}
            isInvalid={passwordsDontMatch}
          />
        )}
        <View style={styles.buttons}>
          <Button onPress={submitHandler}>
            {isLogin ? t('login') : t("signup")}
          </Button>
        </View>
      </View>
    </View>
  )
}

export default AuthForm

const styles = StyleSheet.create({
  buttons: {
    marginTop: 12,
  },
})
