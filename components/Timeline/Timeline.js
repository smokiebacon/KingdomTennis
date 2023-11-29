import { View, StyleSheet } from "react-native"
import TimelineSummary from "./TimelineSummary"
import TimelineList from "./TimelineList"
import { GlobalStyles } from "../../constants/styles"
import { Divider } from "react-native-paper"

function Timeline({ events, eventPeriod }) {
  return (
    <View style={styles.container}>
      <TimelineSummary events={events} periodName={eventPeriod} />
      <Divider />
      <TimelineList events={events} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 14,
    backgroundColor: GlobalStyles.colors.gray500,
  },
})
export default Timeline
