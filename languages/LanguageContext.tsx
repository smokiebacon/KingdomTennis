import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
const LanguageContext = createContext({
    language : 'en',
    setLanguage : (lang: string) => {}
})
const getLanguage =async () => {
    try {
      const lng =  await AsyncStorage.getItem('lng')
      return lng;
    } catch(err) {
      return 'en';
    }
  }
export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState('en');
    useEffect(() => {
        getLanguage().then(res => {
            setLanguage(res);
        })
    },[])

    return (
        <LanguageContext.Provider value={{
            language,
            setLanguage
        }}>
            {children}
        </LanguageContext.Provider>

    )
}

export const useLanguage = () => useContext(LanguageContext);