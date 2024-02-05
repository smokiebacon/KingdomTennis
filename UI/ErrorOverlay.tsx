import { View, Text, StyleSheet } from "react-native"
function ErrorOverlay({ message }) {
  return (
    <View style={styles.container}>
      <Text>An error occurred.</Text>
      <Text>{message}</Text>
    </View>
  )
}

export default ErrorOverlay
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
})
