import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useReducer } from "react";

const initialNotes = {
    formValue: {
        notes: "",
        duration: "",
        date: new Date(),
        court: "",
        teammate: "",
        opponent: '',
        opponent2: "",
        session: "Rally",
    }
}
export const EventFormContext = createContext({
    formValue: {
        notes: "",
        duration: "",
        date: new Date(),
        court: null,
        teammate: "",
        opponent: null,
        opponent2: "",
        session: "Rally",
    },
    setFavouriteCourts : (newCourt:any) => {},
    changeValue : (prop: string, payload: any) => {},
    setValue: (data: any) => {},
})

function eventFormReducer(state, action) {

    switch (action?.type) {
        case "ON_CHANGE":
            return {
                ...state,
                formValue : {
                    ...state.formValue,
                    [action?.payload?.prop] : action?.payload?.data,
                }
            }
        case "SET_VALUE":
            return {
                ...state,
                formValue : {
                    ...action?.payload
                }
            }
        default:
            return state;
    }
}
function EventFormProvider({ children }) {
    const [eventFormState, dispatch] = useReducer(eventFormReducer, initialNotes);
    console.log("🚀 ~ EventFormProvider ~ eventFormState:", eventFormState)
    const changeValue = (prop: string , data: any) => {
        console.log("🚀 ~ changeValue ~ data:", data)
        console.log("🚀 ~ changeValue ~ prop:", prop)
        
        dispatch({ type: "ON_CHANGE", payload: { data, prop } });
    }

    const setValue = (data) => {
        dispatch({ type: "SET_VALUE", payload:  data});
    }
    const setFavouriteCourts = async (newCourt: any) => {
        console.log(newCourt)
        const previousCourts = await AsyncStorage.getItem('@favouriteCourts');
        console.log("🚀 ~ setFavouriteCourts ~ newArr:", previousCourts)
        
        if(!previousCourts) {
            console.log("Not Found");    
            if(newCourt?.is_favourite) {
                const newArr = [newCourt];
                AsyncStorage.setItem('@favouriteCourts', JSON.stringify(newArr));
            }
        }else {
            const newArr = JSON.parse(previousCourts) || [];
            if(newCourt?.is_favourite) {
                newArr.push(newCourt);
                AsyncStorage.setItem('@favouriteCourts', JSON.stringify(newArr));
            }

        }
        // const newArr = JSON.parse()
    }
    // const []
    return (
        <EventFormContext.Provider value={{...eventFormState, setFavouriteCourts: setFavouriteCourts, changeValue,setValue}}>
            {children}
        </EventFormContext.Provider>
    )
}
export const useEventForm = () => useContext(EventFormContext);
export default EventFormProvider