import { View, FlatList, TouchableOpacity } from 'react-native'
import { Text } from 'native-base'
import React, { useEffect, useState } from 'react'
import { useLanguage } from '../../languages/LanguageContext'
import Entypo from '@expo/vector-icons/Entypo';
import { BaseStyle, GlobalStyles } from '../../constants/styles';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AntDesign from '@expo/vector-icons/AntDesign'
import Button from '../../UI/Button';
import { TextInput, HelperText, Avatar } from 'react-native-paper';

// import i18next from 'i18next';
import * as Yup from 'yup';
import { getPlayers, storePlayer } from '../../util/http';
import supabase from '../../supabaseClient';
import { useColorTheme } from '../../constants/theme';
import CustomTextInput from './TextInput';
import CustomText from '../common/Text';
import { useEventForm } from '../../store/eventForm-context';
const SelectPlayerModal = ({ navigation, route }) => {
  const { t } = useTranslation();
  const { prop } = route?.params
  const { colors } = useColorTheme();
  const eventsFormCtx = useEventForm()
  const [players, setPlayers] = useState([]);

  const [loading, setLoading] = useState(false);
  const fetchPlayerData = async () => {
    setLoading(true);
    const data = await getPlayers();
    setPlayers(data);
    setLoading(false);
  }
  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          eventsFormCtx.changeValue(prop, item);
        }}
        style={{ paddingVertical: 15, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 10, borderBottomWidth: 1, backgroundColor: item.id === eventsFormCtx.formValue[prop].id ? colors.primary : 'transparent' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Avatar.Text style={{ marginRight: 10, }} size={35} label={item.name[0]} />
          <CustomText variant="titleMedium">{item?.name}</CustomText>
        </View>
        {
          item.id === eventsFormCtx.formValue[prop].id ?
            null :
            <TouchableOpacity
              style={{ backgroundColor: 'rgb(33,82,66)', paddingHorizontal: 10, paddingVertical: 5, }}>
              <CustomText variant="bodyMedium" >Remove</CustomText>
            </TouchableOpacity>
        }
      </TouchableOpacity>
    )
  }
  useEffect(() => {
    fetchPlayerData();
  }, [])
  return (
    <View style={{
      flex: 1,
      justifyContent: 'center',
      marginHorizontal: 20,
    }}>
      <View style={{ backgroundColor: colors.background, padding: 10, borderRadius: 10, }}>
        <View style={{ justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', }}>
          <CustomText style={{ marginBottom: 10 }} variant="titleMedium"  >{route?.params?.label}</CustomText>
          <TouchableOpacity onPress={() => {
            navigation.navigate('SelectPlayer');
          }}>
            <AntDesign size={20} color={colors.text} name="setting" />
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity style={[BaseStyle.textInput, { height: 55, backgroundColor: colors.card, }]}>
            <View style={{  flexDirection: 'row' , alignItems: 'center'}}>
            <Avatar.Text style={{ marginRight: 10, }} size={35} label={eventsFormCtx.formValue[prop].name[0]} />
            <CustomText variant='titleMedium'>{eventsFormCtx.formValue[prop]?.name}</CustomText>
            </View>
          </TouchableOpacity>
          <View style={{ marginTop: 20, backgroundColor: colors.card, }}>
            <CustomText variant="titleMedium" style={{ marginVertical: 10, marginLeft: 10, }}>Recent</CustomText>
            <View style={{ height: 150, }}>
              <FlatList
                data={players}
                renderItem={renderItem}
              />
            </View>
          </View>
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Button onPress={() => { navigation?.goBack() }} style={{ paddingHorizontal: 30, marginVertical: 10, }}>Save</Button>
            </View>
        </View>
      </View>
    </View>
  )
}

export default SelectPlayerModal