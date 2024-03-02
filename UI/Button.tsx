import { Pressable, Text, View, StyleSheet } from "react-native"
import { ActivityIndicator } from "react-native-paper"

function Button({ children, onPress, isLoading = false, style={} }) {
  return (
    <View>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => pressed && styles.pressed}
      >
        <View style={[styles.button,style]}>
          {
            isLoading ?
            <ActivityIndicator size={"small"} style={{ marginRight: 10, }} color="white" />
            : null
          }
          <Text style={styles.buttonText}>{children}</Text>
        </View>
      </Pressable>
    </View>
  )
}

export default Button

const styles = StyleSheet.create({
  button: {
    borderRadius: 6,
    // margin: 15,
    padding: 10,
    backgroundColor: "green",
    // justifyContent: "flex-end",
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
  pressed: {
    opacity: 0.75,
    borderRadius: 4,
  },
})
