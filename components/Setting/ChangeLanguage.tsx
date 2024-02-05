import { View, FlatList, TouchableOpacity } from 'react-native'
import { Text } from 'native-base'
import React from 'react'
import { useLanguage } from '../../languages/LanguageContext'
import Entypo from '@expo/vector-icons/Entypo';
import { GlobalStyles } from '../../constants/styles';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AntDesign from '@expo/vector-icons/AntDesign'
// import i18next from 'i18next';
const ChangeLanguage = ({ navigation }) => {
    const { t } = useTranslation()
    const languageCtx = useLanguage();
    const languageArray = [
        {
          name: "English",
          code: 'en',
        },
        {
          name: 'Chinese',
          code: 'zh',
        }
      ]
      const renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity onPress={() => {
                languageCtx.setLanguage(item.code);
                // i18next.changeLanguage(item.code);
                AsyncStorage.setItem('lng', item.code);
            }} style={{ paddingVertical: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text fontSize={"lg"} >{item.name}</Text>
                {
                    languageCtx.language === item.code ?
                    <Entypo
                    name="check"
                    size={20}
                    style={{ marginRight: 10, }}
                    color={GlobalStyles.colors.primary100}
                     />
                     : null
                }
            </TouchableOpacity>
        )
      }
  return (
    <View style={{
        flex: 1,
        justifyContent: 'center',
        // alignItems: 'center'
        marginHorizontal: 20,
        //  
    }}>
        <View style={{ backgroundColor: '#fff', padding: 10, borderRadius: 10, }}>
            <View style={{ justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center',  }}>
            <Text fontSize={"xl"}>{t('change_language')}</Text>
            <TouchableOpacity onPress={() => {
                navigation.goBack();
            }}>
            <AntDesign  size={20} name="closecircle"/>
            </TouchableOpacity>
            </View>
            <View style={{ height: 2, backgroundColor: '#ddd', marginVertical: 10, }} />
            <View>
                <FlatList
                    data={languageArray}
                    renderItem={renderItem}
                    ItemSeparatorComponent={() => <View style={{ height: 1, backgroundColor: '#ddd', marginVertical: 2, }} />}
                 />
            </View>
        </View>
    </View>
  )
}

export default ChangeLanguage