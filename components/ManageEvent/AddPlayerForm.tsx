import { View, FlatList, TouchableOpacity } from 'react-native'
import { Text } from 'native-base'
import React from 'react'
import { useLanguage } from '../../languages/LanguageContext'
import Entypo from '@expo/vector-icons/Entypo';
import { GlobalStyles } from '../../constants/styles';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AntDesign from '@expo/vector-icons/AntDesign'
import Button from '../../UI/Button';
import { TextInput, HelperText } from 'react-native-paper';
import { useFormik } from 'formik';
// import i18next from 'i18next';
import * as Yup from 'yup';
import { storePlayer } from '../../util/http';
import supabase from '../../supabaseClient';
const AddPlayerForm = ({ navigation }) => {
    
    const formik = useFormik({ 
        initialValues: { 
            name : "",
         },
         validationSchema: Yup.object().shape({
            name: Yup.string().required('Name is required').min(3),
         }),
         onSubmit : async (_values, { resetForm, setSubmitting }) => {
            // console.log("🚀 ~ onSubmit: ~ _values:", _values)
            const auth = (await supabase.auth.getSession()).data.session.user.id;
            const obj = { 
                auth_id : auth,
                name: _values.name,
            }
            const newPlayer =await storePlayer(obj);
            console.log("🚀 ~ onSubmit: ~ newPlayer:", newPlayer)
            if(newPlayer.status === 201) {
                navigation.goBack()
            }
         }
    })
    const { t } = useTranslation()
    console.log(formik.isSubmitting)
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
            <Text fontSize={"xl"}>{t('add_new_player')}</Text>
            <TouchableOpacity onPress={() => {
                navigation.goBack();
            }}>
            <AntDesign  size={20} name="closecircle"/>
            </TouchableOpacity>
            </View>
            <View style={{ height: 1, backgroundColor: '#ddd', marginVertical: 10, }} />
            <View>
                <TextInput
                label={"Player Name"}
                value={formik.values.name}
                onChangeText={formik.handleChange('name')}
                onBlur={formik.handleBlur('name')}
                error={Boolean(formik.errors.name) && formik.touched.name}
                />
                <HelperText visible={Boolean(formik.errors.name) && formik.touched.name} type="error">
                    {formik.errors.name}
                </HelperText>
            </View>
            <View style={{ height: 1, backgroundColor: '#ddd', marginVertical: 10, }} />
            <View style={{ }}>
                <Button  isLoading={formik.isSubmitting} onPress={formik.handleSubmit}>Add Player</Button>
            </View>
        </View>
    </View>
  )
}

export default AddPlayerForm