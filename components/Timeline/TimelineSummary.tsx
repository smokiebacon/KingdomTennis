import { View, Text, StyleSheet, Dimensions,  } from "react-native"
import { BarChart } from "react-native-gifted-charts"
import { GlobalStyles } from "../../constants/styles"
import { getShortenedFormattedDate } from "../../util/date"
import { useContext, useEffect, useState } from "react"
import { EventsContext } from "../../store/events-context"
import { endOfMonth, endOfWeek, endOfYear, format, startOfMonth, startOfWeek, startOfYear, subMonths, subWeeks, subYears, isAfter, isBefore, isEqual } from "date-fns"
import { useTranslation } from "react-i18next"

function TimelineSummary({ events, periodName }) {
  const { t } = useTranslation()
  const eventsCtx = useContext(EventsContext)
  const reduceDurations = (startDate, endDate) => {
  const reduce = events?.reduce((accum, current) => {
    const currentDate = current.date
    if(currentDate >= startDate && currentDate <= endDate) {
      
      return accum + parseInt(current?.duration)
    } else return accum;
  }, 0);
  
  return reduce;
  }
  const dateformat = 'yyy-MM-dd'
  const currentDate = new Date();
  
  const getAggregateData = (period) => {
    switch(period) {
      case 'Month' :
        let months = [];
        for(let i = 5; i>=0;i--) {
          
          let start = subMonths(currentDate, i);
          let obj = {
            label : format(start, 'MMM'),
            startDate : format(startOfMonth(start),dateformat),
            endDate : format(endOfMonth(start),dateformat),
            value : reduceDurations(format(startOfMonth(start),dateformat), format(endOfMonth(start),dateformat)),
            currentDate : start,
            frontColor: i == 0 ?'rgb(228,105,93)' : 'pink',
            labelTextStyle: { color: "white", fontSize: 10, },
          }
          months.push(obj);
          if(i==0) {
            eventsCtx.setSelectedPeriod(obj)
          }
        }

        eventsCtx.setGraphData(months);
        break;
        case 'Week' :
          let weeks = [];
          for (let i = 6; i>=0; i--) {
            let start = subWeeks(currentDate, i)
            
            let obj = {
              label : `${format(startOfWeek(start), 'MMM dd')} ${format(endOfWeek(start), 'MMM dd')}`,
              startDate : format(startOfWeek(start),dateformat),
              endDate : format(endOfWeek(start),dateformat),
              value : reduceDurations(format(startOfWeek(start),dateformat), format(endOfWeek(start),dateformat)),
              currentDate : start,
              frontColor: i == 0 ?'rgb(228,105,93)' :  'pink',
              labelTextStyle: { color: "white", fontSize: 10 },
            }
            weeks.push(obj);
            if(i==0) {
              console.log('hereee')
              eventsCtx.setSelectedPeriod(obj)
            }
          }
          
          eventsCtx.setGraphData(weeks);
          break;
        case 'Year':
          let years = [];
          for (let i = 10; i>=0; i--) {
            let start = subYears(currentDate, i)
            
            let obj = {
              label : `${format(startOfYear(start), 'u')}`,
              startDate : format(startOfYear(start), dateformat),
              endDate : format(endOfYear(start), dateformat),
              value : reduceDurations(format(startOfYear(start), dateformat), format(endOfYear(start), dateformat)),
              currentDate : start,
              frontColor: i == 0 ?'rgb(228,105,93)' :  'pink',
              labelTextStyle: { color: "white", fontSize: 10 },
            }
            years.push(obj);
            if(i==0) {
              eventsCtx.setSelectedPeriod(obj)
            }
          }
          eventsCtx.setGraphData(years);
          break;
          default:
            const obj = { label : `${format(new Date(),'MMM, dd')} ${format(new Date(),'MMM, dd')}`, startDate: format(new Date() , dateformat), endDate: format(new Date(), dateformat), value: 0, frontColor: 'rgb(228,105,93)',   labelTextStyle: { color: "white", fontSize: 10, }, }
            eventsCtx.setGraphData([obj]);
            eventsCtx.setSelectedPeriod(obj);
            break
          ;
        }
        
  }

  useEffect(() => {
        getAggregateData(eventsCtx.timelinePeriod);
  },[eventsCtx.timelinePeriod, eventsCtx.events]);
  function getBiggestYAxis() {
    
    const maxYAxisChartNumber =  eventsCtx.graphData.map((item) => item.value);
    console.log(Math.max(...maxYAxisChartNumber));
    return Math.max(...maxYAxisChartNumber)
  }

  const totalDuration = events.reduce((sum, event) => {
    return sum + event.duration
  }, 0)
  
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.duration}>{t('duration')} {eventsCtx?.selectedPeriod?.value}</Text>
        <Text>{eventsCtx?.selectedPeriod?.label}</Text>
      </View>
      <View style={{ marginTop: 10 }}>
        <BarChart
          height={90}
          maxValue={getBiggestYAxis() || 50}
          data={eventsCtx.graphData}
          spacing={40}
          barWidth={25}
          // bar
          onPress={(value) => {
            eventsCtx.setSelectedPeriod(value)
            const mapped = eventsCtx.graphData?.map(item => {
              if(item.label === value.label) {
                return {
                  ...item,
                  frontColor : 'rgb(228,105,93)',
                }
              } else {
                return {
                  ...item,
                  frontColor: 'pink',
                }
              }
            })
            eventsCtx.setGraphData(mapped);
          }}
          noOfSections={3}
          labelWidth={5}
          xAxisTextNumberOfLines={2}
          yAxisTextStyle={{ color: "white" }}
          width={Dimensions.get("screen").width - 70}
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
  week: {

  }
})
export default TimelineSummary
