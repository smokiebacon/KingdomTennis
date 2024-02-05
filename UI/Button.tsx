import { Pressable, Text, View, StyleSheet } from "react-native"

function Button({ children, onPress }) {
  return (
    <View>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => pressed && styles.pressed}
      >
        <View style={styles.button}>
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
    margin: 15,
    padding: 10,
    backgroundColor: "green",
    justifyContent: "flex-end",
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
