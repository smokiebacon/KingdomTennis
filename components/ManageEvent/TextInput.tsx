import React, { FC, ReactNode } from 'react';
import { TextInput, View, I18nManager } from 'react-native';
import PropTypes from 'prop-types';
import { BaseStyle, BaseColor } from '../../constants/styles';

import { HelperText, Text } from 'react-native-paper';
import Icon from '../common/Icon';
import { useColorTheme } from '../../constants/theme';
import CustomText from '../common/Text';



type CustomInputProps = {
  label?: string;
  editable? : boolean;
  iconLeft?: ReactNode;
  placeholder?: string;
  selectionColor?:string;
  icon? : ReactNode;
  style?: any;
  onChangeText?:(text: string) => {};
  onFocus? : () => {};
  value?: string;
  success?:boolean;
  secureTextEntry?: boolean;
  keyboardType?:any;
  multiline?: boolean;
  textAlignVertical?: any;
  onSubmitEditing?: (e:any) => {};
  inputStyle?:any;
  onBlurHandler?: () => {};
  error?: boolean;
  isValid?: boolean;
}
export default function CustomTextInput(props: CustomInputProps) {
  const { colors } = useColorTheme();

  const cardColor = colors.card;
  const {
    style,
    onChangeText,
    onFocus,
    placeholder,
    value,
    success,
    secureTextEntry,
    keyboardType,
    multiline,
    textAlignVertical,
    icon,
    iconLeft,
    onSubmitEditing,
    inputStyle,
    onBlurHandler,
    error,
    isValid,
    label,
    ...attrs
  } = props;
  return (
    <View style={{ marginVertical: 10 }}>
    <CustomText variant="titleMedium" style={{ marginBottom: 5 }} >{label}</CustomText>
     <View style={[BaseStyle.textInput, { backgroundColor: cardColor }, style]}>
      {iconLeft}
      <TextInput
        // ref={ref}
        style={[
          {
            // fontFamily: `${font}-Regular`,
            flex: 1,
            height: '100%',
            textAlign: I18nManager.isRTL ? 'right' : 'auto',
            color: colors.text,
            paddingTop: 5,
            paddingBottom: 5,
          },
          inputStyle,
        ]}
        onChangeText={(text) => onChangeText(text)}
        // onFocus={() => onFocus()}
        autoCorrect={false}
        placeholder={placeholder}
        placeholderTextColor={success ? BaseColor.grayColor : colors.primary}
        secureTextEntry={secureTextEntry}
        value={value}
        selectionColor={colors.primary}
        keyboardType={keyboardType}
        multiline={multiline}
        
        textAlignVertical={textAlignVertical}
        onSubmitEditing={onSubmitEditing}
        onBlur={onBlurHandler}
        {...attrs}
        
      />
      {icon}
    </View>
    {
      error &&
    <HelperText visible={error} type='error'>{error}</HelperText>
    }
    </View>
  );
}

CustomTextInput.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  success: PropTypes.bool,
  icon: PropTypes.node,
};

CustomTextInput.defaultProps = {
  style: {},
  success: true,
  icon: null,
};
