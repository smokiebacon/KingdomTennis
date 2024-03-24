import { View, FlatList, TouchableOpacity } from 'react-native'
import { Text } from 'native-base'
import React, { useContext, useEffect, useState } from 'react'
import { useLanguage } from '../../languages/LanguageContext'
import Entypo from '@expo/vector-icons/Entypo';
import { BaseStyle, GlobalStyles } from '../../constants/styles';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AntDesign from '@expo/vector-icons/AntDesign'
import Button from '../../UI/Button';
import { TextInput, HelperText } from 'react-native-paper';

// import i18next from 'i18next';
import * as Yup from 'yup';
import { getCourts, storePlayer } from '../../util/http';
import supabase from '../../supabaseClient';
import { useColorTheme } from '../../constants/theme';
import CustomTextInput from './TextInput';
import CustomText from '../common/Text';
import { useEventForm } from '../../store/eventForm-context';
import CustomIcon from '../common/Icon';
import { EventsContext } from '../../store/events-context';
const SelectCourtForm = ({ navigation }) => {
    const { t } = useTranslation();
    const { colors } = useColorTheme();
    
    const eventsFormCtx = useEventForm()
    const eventCtx = useContext(EventsContext);
    const courts = eventCtx.courts.filter(item => item.is_favourite);
    // const [favourtes, setFavourites] = useState([]);
    // const courts = 
    // useEffect(() => {
    //   getCourts().then(allCourts => {
    //     console.log('fav', allCourts);
    //     const fav = allCourts.filter(item => item.is_favourite);
    //     setFavourites(fav || []);
    //     // setFavourites(favCourts || []);
    //   });
    // },[])
  return (
    <View style={{
        flex: 1,
        justifyContent: 'center',
        marginHorizontal: 20,
    }}>
        <View style={{ backgroundColor: colors.background, padding: 10, borderRadius: 10, }}>
            <View style={{ justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center',  }}>
            <CustomText style={{ marginBottom : 10 }} variant="titleMedium"  >{t('court_location')}</CustomText>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 5 }}>
              <TouchableOpacity onPress={navigation.goBack}>
              <CustomIcon  Iconname='Entypo' name={"cross"} size={25} color={colors.text}/>
              </TouchableOpacity>
            <TouchableOpacity onPress={() => {
              navigation.navigate('AllCourts');
            }}>
            <CustomIcon Iconname='MaterialIcons' name={"navigate-next"} size={30} color={colors.text} />
            </TouchableOpacity>
              </View>
            </View>
            <View>
            <TouchableOpacity style={[BaseStyle.textInput, { height: 55, backgroundColor: colors.card}]}>
              <CustomText>{eventsFormCtx.formValue.court?.name}</CustomText>
          </TouchableOpacity>
          <View style={{ marginTop: 10, }}>
            <CustomText variant="titleMedium" style={{ marginBottom : 10, }}>Favourite</CustomText>
            {
              courts?.map(court => {
                return (
                  <TouchableOpacity key={court.id} onPress={() => {
                    eventsFormCtx.changeValue('court', court);
                    navigation?.goBack();
                  }} style={{ backgroundColor:  court.id === eventsFormCtx?.formValue?.court?.id ? colors.primary:  colors.card, padding: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',  }}>
                    <CustomText variant="titleSmall" style={{ color: court.id === eventsFormCtx?.formValue?.court?.id ? '#000' : '#fff' }}>{court?.name}</CustomText>
                  </TouchableOpacity>
                )
              })
            }
          </View>
            </View>
        </View>
    </View>
  )
}

export default SelectCourtForm