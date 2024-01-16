import React, { useContext, useState } from "react"
import { StyleSheet, Text, View } from "react-native"
import { Dropdown } from "react-native-element-dropdown"
import { GlobalStyles } from "../../constants/styles"
import { EventsContext } from "../../store/events-context"

// import { EventsContext } from "../../store/events-context"
const DropdownComponent = ({ value, setValue }) => {
  const eventsCtx = useContext(EventsContext)
  console.log("🚀 ~ file: DropdownComponent.js:9 ~ DropdownComponent ~ eventsCtx:", eventsCtx.timelinePeriod)
  const selectedPeriod = [
    { label: "Week", value: "Week" },
    { label: "Month", value: "Month" },
    { label: "Year", value: "Year" },
  ]

  // const [value, setValue] = useState("Month")
  // console.log("🚀 ~ file: DropdownComponent.js:14 ~ DropdownComponent ~ value:", value)
  const [isFocus, setIsFocus] = useState(false)

  const renderLabel = () => {
    if (value || isFocus) {
      return <Text style={styles.label}>Time Period</Text>
    }
    return null
  }

  return (
    <View style={styles.container}>
      {renderLabel()}
      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        iconStyle={styles.iconStyle}
        activeColor="green"
        data={selectedPeriod}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? "Select item" : "..."}
        value={eventsCtx.timelinePeriod}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          eventsCtx.setTimeLinePeriod(item.value)
          setIsFocus(false)
        }}
      />
    </View>
  )
}

export default DropdownComponent

const styles = StyleSheet.create({
  container: {
    backgroundColor: GlobalStyles.colors.gray500,
    padding: 16,
  },
  dropdown: {
    height: 50,
    borderColor: GlobalStyles.colors.gray700,
    borderWidth: 0.5,
    borderRadius: 80,
    paddingHorizontal: 8,
    color: "white",
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: "absolute",
    backgroundColor: GlobalStyles.colors.gray500,
    color: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 10,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
    color: "white",
  },
})
