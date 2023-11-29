import { View, Text, StyleSheet } from "react-native"
import { BarChart } from "react-native-gifted-charts"
import { GlobalStyles } from "../../constants/styles"
import { getShortenedFormattedDate } from "../../util/date"
function TimelineSummary({ events, periodName }) {
  // const [period, setPeriod] = useState("Week")

  const aggregateDataByDate = (events) => {
    const aggregatedData = {}

    // Loop through the data and sum values for the same dates
    events.forEach((entry) => {
      const date = entry.date
      const value = entry.duration

      if (aggregatedData[date]) {
        // If date exists in aggregatedData, add the value
        aggregatedData[date] += value
      } else {
        // If date doesn't exist, initialize it with the value
        aggregatedData[date] = value
      }
    })

    // Convert aggregatedData to the format expected by the chart library
    const chartData = Object.keys(aggregatedData).map((date) => ({
      value: aggregatedData[date],
      label: date,
      labelTextStyle: { color: "white", fontSize: 10 },
    }))
    return chartData
  }
  const aggregatedData = aggregateDataByDate(events)

  function getBiggestYAxis() {
    const maxYAxisChartNumber = aggregatedData.map((item) => item.value)
    return Math.max(...maxYAxisChartNumber)
  }

  const totalDuration = events.reduce((sum, event) => {
    return sum + event.duration
  }, 0)
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.duration}>Duration {totalDuration.toFixed(2)}</Text>
        <Text>{new Date().getFullYear()}</Text>
      </View>
      <View>
        <BarChart
          height={90}
          maxValue={getBiggestYAxis()}
          data={aggregateDataByDate(events)}
          spacing={40}
          barWidth={25}
          labelWidth={30}
          frontColor={"#177AD5"}
          noOfSections={3}
          yAxisTextStyle={{ color: "white" }}
        />
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
    backgroundColor: GlobalStyles.colors.primary100,
    borderRadius: 6,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  period: {
    fontSize: 12,
  },
  duration: {
    fontSize: 18,
    fontWeight: "bold",
    justifyContent: "center",
    alignItems: "center",
    color: GlobalStyles.colors.error500,
  },
})
export default TimelineSummary
