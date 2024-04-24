import { Pressable, View, StyleSheet, ScrollView } from "react-native"
import { GlobalStyles } from "../../constants/styles"
import { Card, Text } from "react-native-paper"
import { getFormattedDate } from "../../util/date"
import { useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { useColorTheme } from "../../constants/theme"
import CustomText from "../common/Text"
import { useContext } from "react"
import { EventsContext } from "../../store/events-context"
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
  const navigation = useNavigation<NativeStackNavigationProp<{ "Edit Event" : {},   }>>()
  const { colors } = useColorTheme()
  const eventCtx = useContext(EventsContext);
  console.log("eventCtx ",eventCtx.courts?.find(item => item.id == court));
  function timelinePressHandler() {
    navigation.navigate("Edit Event", {
      eventId: id,
    })
  }
  return (
    <Pressable
      onPress={timelinePressHandler}
      style={({ pressed }) => pressed && styles.pressed}
      // android_ripple
    >
      <ScrollView>
        <Card style={[styles.item, { backgroundColor: colors.card }]}>
          <Card.Content>
            <CustomText variant={"titleMedium"}>Date: {date}</CustomText>
            <CustomText style={styles.textBase} variant="bodyLarge">
              Court Name : {eventCtx?.courts?.find(item => item.id == court)?.name}
            </CustomText>
            <CustomText style={styles.textBase} variant="bodyMedium">
              Session Type: {session}
            </CustomText>
            {/* <CustomText style={styles.textBase} variant="bodyMedium">
              {teammate}
            </CustomText> */}
            <CustomText style={styles.textBase} variant="bodyMedium">
              {opponent}
            </CustomText>
            {/* <CustomText style={styles.textBase} variant="bodyMedium">
              {opponent2}
            </CustomText> */}
            <CustomText style={styles.duration} variant="bodyMedium">
              {duration} hr
            </CustomText>
            {/* //if settings true, show notes */}
            <CustomText style={styles.textBase} variant="bodyMedium">
              {notes}
            </CustomText>
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
    // backgroundColor: GlobalStyles.colors.primary500,
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 6,
    elevation: 3,
    shadowColor: "gray",
    shadowRadius: 4,
    shadowOpacity: 0.4,
  },
  textBase: {
    // color: GlobalStyles.colors.primary50,
    marginTop: 5,
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
