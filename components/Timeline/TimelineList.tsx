import { FlatList, StyleSheet, View, Text } from "react-native"
import TimelineItem from "./TimelineItem"
import { EventsContext } from "../../store/events-context"
import {  useContext, useEffect, useRef, useState } from "react"
import { Swipeable } from "react-native-gesture-handler"

function renderTimelineItem(itemData) {
  console.log("itemData",itemData)
  return <TimelineItem {...itemData.item} />
}
function TimelineList({ events }) {
  const eventsCtx = useContext(EventsContext);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const scrollRef = useRef<Swipeable>();

  useEffect(() => {
    if(eventsCtx?.selectedPeriod) {  
      console.log("Hereereree",eventsCtx.events)
      // console.log("")
      const newEvents = eventsCtx.events?.filter((item) => {
        const currentDate = item?.date;
        console.log("currentDate",currentDate)
        const { startDate, endDate } = eventsCtx.selectedPeriod
        return (currentDate >= startDate && currentDate <= endDate)
      })
      setFilteredEvents(newEvents);
    }else {
      setFilteredEvents(eventsCtx.events);
    }
  },[eventsCtx.selectedPeriod, eventsCtx.events])
  return (
    <View style={{ flex: 1, }}>
   <Swipeable 
  
    renderLeftActions={() => {
      return (
        <View style={{ width: 100, }} />
      )
    }}
    renderRightActions={() => {
      return (
        <View style={{ width: 100 }} />
      )
    }}
    ref={scrollRef}
      onSwipeableOpen={(direction) => {
        
        
        
        const index = eventsCtx.graphData.findIndex(item => item.frontColor === 'rgb(228,105,93)');
        
        if(direction === 'left') {
          if(index === 0 || index === -1) {
            if(scrollRef.current) {
              scrollRef?.current?.close();  
            }
              return;
          }else { 
        
            for (let i = index - 1; i >= 0;i--) {
              
              // if()
              const findWithValue = eventsCtx.graphData[i];
              
              if(findWithValue.value > 0) {
                eventsCtx.setSelectedPeriod(findWithValue);
                const mapped = eventsCtx.graphData?.map(item => {
                  if(item.label === findWithValue.label) {
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
                break;
              }
            }
         
          }
        } else if(direction === 'right') {
          if(index === eventsCtx.graphData.length - 1 || index === -1) {
            scrollRef.current.close();
            return 
          } else {
            for(let i = index + 1; i < eventsCtx.graphData.length; i++) {
              const findWithValue = eventsCtx.graphData[i];
              if(findWithValue.value > 0) {
                eventsCtx.setSelectedPeriod(findWithValue);
                const mapped = eventsCtx.graphData?.map(item => {
                  if(item.label === findWithValue.label) {
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
                break;
              }
            }
          }
        }


        scrollRef.current.close();
      }}
    >

    <FlatList
      data={filteredEvents}
      renderItem={renderTimelineItem}
      keyExtractor={(item) => item.id}
      />
     </Swipeable>
      </View>
  )
}

const styles = StyleSheet.create({
  text: {
    color: "white",
  },
})
export default TimelineList
