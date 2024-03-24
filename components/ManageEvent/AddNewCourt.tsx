import { View, FlatList, TouchableOpacity } from 'react-native'
import { Text } from 'native-base'
import React, { useContext } from 'react'
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
import { storeCourtLocation, storePlayer } from '../../util/http';
import supabase from '../../supabaseClient';
import CustomTextInput from './TextInput';
import { useColorTheme } from '../../constants/theme';
import CustomText from '../common/Text';
import CustomIcon from '../common/Icon';
import { EventsContext } from '../../store/events-context';
const AddCourtForm = ({ navigation }) => {
    const eventsCtx =  useContext(EventsContext);
    const formik = useFormik({ 
        initialValues: { 
            name : "",
            is_favourite : false,
         },
         validationSchema: Yup.object().shape({
            name: Yup.string().required('Name is required').min(3),
            is_favourite: Yup.bool().required('Is Favourite is required'),
         }),
         onSubmit : async (_values, { resetForm, setSubmitting }) => {
            // console.log("🚀 ~ onSubmit: ~ _values:", _values)
            const auth = (await supabase.auth.getSession()).data.session.user.id;
            const obj = { 
                auth_id : auth,
                name: _values.name,
                is_favourite : _values.is_favourite,
            }
            const res = await  storeCourtLocation(obj);
            
            console.log("🚀 ~ onSubmit: ~ obj:", res)
            // const newPlayer =await storePlayer(obj);
            // console.log("🚀 ~ onSubmit: ~ newPlayer:", newPlayer)
            if(res.status === 201) {
                resetForm();
                eventsCtx.getAllCourts();
                navigation.goBack()
            }
         }
    })
    const { t } = useTranslation()
    
    const { colors } = useColorTheme()
  return (
    <View style={{
        flex: 1,
        justifyContent: 'center',
        // alignItems: 'center'
        marginHorizontal: 20,
        //  
    }}>
        <View style={{ backgroundColor: colors.background, padding: 10, borderRadius: 10,  }}>
            <View style={{ justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center',   }}>
            <CustomText variant="titleLarge" >{t('court_location')}</CustomText>
            <TouchableOpacity onPress={() => {
                navigation.goBack();
            }}>
            <AntDesign  size={20} name="closecircle" color={colors.text}/>
            </TouchableOpacity>
            </View>
            <View style={{ height: 1, backgroundColor: '#ddd', marginVertical: 10,  }} />
            <View style={{ marginHorizontal: 10, }}>
               <CustomTextInput
               label="Name"
               placeholder="Court Location"
               value={formik.values.name}
               onChangeText={formik.handleChange('name')}
            //    onBlurHandler={formik.handleBlur('name')}

               error={formik.touched.name && formik.errors.name}
               isValid={formik.touched.name && !formik.errors.name}
               selectionColor={colors.primary}
                />
            </View>
            <TouchableOpacity
            onPress={() => {
                formik.setFieldValue('is_favourite', !formik.values.is_favourite);
            }}
            
             style={{ flexDirection: 'row', gap : 10, alignItems: 'center', marginVertical: 5, marginHorizontal: 10, }}>
                <CustomText variant="titleMedium">Favourite</CustomText>

                    <CustomIcon Iconname='AntDesign' size={25} name={formik.values.is_favourite ? 'heart' : 'hearto'} color={colors.primary} />

            </TouchableOpacity>
            <View style={{ height: 1, backgroundColor: '#ddd', marginVertical: 10, }} />

            <View style={{ }}>
                <Button  isLoading={formik.isSubmitting} onPress={formik.handleSubmit}>Save</Button>
            </View>
        </View>
    </View>
  )
}
export default AddCourtForm