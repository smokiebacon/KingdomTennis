import { FlatList, StyleSheet } from "react-native"
import TimelineItem from "./TimelineItem"
function renderTimelineItem(itemData) {
  return <TimelineItem {...itemData.item} />
}
function TimelineList({ events }) {
  return (
    <FlatList
      data={events}
      renderItem={renderTimelineItem}
      keyExtractor={(item) => item.id}
    />
  )
}

const styles = StyleSheet.create({
  text: {
    color: "white",
  },
})
export default TimelineList
