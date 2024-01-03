import { Pressable, View, Text, StyleSheet, ScrollView } from "react-native"
import { GlobalStyles } from "../../constants/styles"
import { Card } from "react-native-paper"
import { getFormattedDate } from "../../util/date"
import { useNavigation } from "@react-navigation/native"
function TimelineItem({
  id,
  notes,
  date,
  duration,
  court,
  teammate,
  opponent,
  opponent2,
  session,
}) {
  const navigation = useNavigation()

  function timelinePressHandler() {
    navigation.navigate("Edit Event", {
      eventId: id,
    })
  }
  return (
    <Pressable
      onPress={timelinePressHandler}
      style={({ pressed }) => pressed && styles.pressed}
      android_ripple
    >
      <ScrollView>
        <Card style={styles.item}>
          <Card.Content>
            <Text style={styles.textBase} variant="titleLarge">
              {date}
            </Text>
            <Text style={styles.textBase} variant="bodyMedium">
              {court}
            </Text>
            {session === "Singles" || "Rally" ? (
              <Text style={styles.textBase} variant="bodyMedium">
                {opponent}
              </Text>
            ) : (
              ""
            )}
            {session === "Doubles" ? (
              <>
                <Text style={styles.textBase} variant="bodyMedium">
                  {teammate}
                </Text>
                <Text style={styles.textBase} variant="bodyMedium">
                  {opponent}
                </Text>
                <Text style={styles.textBase} variant="bodyMedium">
                  {opponent2}
                </Text>
              </>
            ) : (
              ""
            )}

            <Text style={styles.duration} variant="bodyMedium">
              {duration} hr
            </Text>
            {/* //if settings true, show notes */}
            <Text style={styles.textBase} variant="bodyMedium">
              {notes}
            </Text>
          </Card.Content>
        </Card>
      </ScrollView>
    </Pressable>
  )
}

export default TimelineItem

const styles = StyleSheet.create({
  item: {
    padding: 12,
    marginVertical: 8,
    backgroundColor: GlobalStyles.colors.primary500,
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 6,
    elevation: 3,
    shadowColor: "gray",
    shadowRadius: 4,
    shadowOpacity: 0.4,
  },
  textBase: {
    color: GlobalStyles.colors.primary50,
  },
  durationContainer: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
  },
  duration: {
    color: "white",
    fontWeight: "bold",
  },
  pressed: {
    opacity: 0.75,
  },
})
