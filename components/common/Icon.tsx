import React from 'react';
import { StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import Icon from '@expo/vector-icons/FontAwesome';
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';
import Ionicons from '@expo/vector-icons/Ionicons';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome from '@expo/vector-icons/FontAwesome';
// import FontAwesome5Pro from '@expo/vector-icons/FontAwesome5Pro';
import Fontisto from '@expo/vector-icons/Fontisto';
import Foundation from '@expo/vector-icons/Foundation';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Octicons from '@expo/vector-icons/Octicons';
import Zocial from '@expo/vector-icons/Zocial';

type PropsCustomIcon = {
  name?: any;
  Iconname?: string;
  color?: string;
  style?: any;
  size?: number
}
export default function CustomIcon(props:PropsCustomIcon) {
  const { style = {}, Iconname, ...rest } = props;
  const layoutStyle = {};

  if (Iconname == "AntDesign") {
    return <AntDesign style={StyleSheet.flatten([style, layoutStyle])} {...rest} />;
  }
  if (Iconname == "Entypo") {
    return <Entypo style={StyleSheet.flatten([style, layoutStyle])} {...rest} />;
  }
  if (Iconname == "Ionicons") {
    return <Ionicons style={StyleSheet.flatten([style, layoutStyle])} {...rest} />;
  }
  if (Iconname == "EvilIcons") {
    return <EvilIcons style={StyleSheet.flatten([style, layoutStyle])} {...rest} />;
  }
  if (Iconname == "Feather") {
    return <Feather style={StyleSheet.flatten([style, layoutStyle])} {...rest} />;
  }
  if (Iconname == "FontAwesome") {
    return <FontAwesome style={StyleSheet.flatten([style, layoutStyle])} {...rest} />;
  }
  if (Iconname == "Fontisto") {
    return <Fontisto style={StyleSheet.flatten([style, layoutStyle])} {...rest} />;
  }
  if (Iconname == "Foundation") {
    return <Foundation style={StyleSheet.flatten([style, layoutStyle])} {...rest} />;
  }
  if (Iconname == "MaterialCommunityIcons") {
    return <MaterialCommunityIcons style={StyleSheet.flatten([style, layoutStyle])} {...rest} />;
  }
  if (Iconname == "MaterialIcons") {
    return <MaterialIcons style={StyleSheet.flatten([style, layoutStyle])} {...rest} />;
  }
  if (Iconname == "Octicons") {
    return <Octicons style={StyleSheet.flatten([style, layoutStyle])} {...rest} />;
  }
  if (Iconname == "Zocial") {
    return <Zocial style={StyleSheet.flatten([style, layoutStyle])} {...rest} />;
  }
  return <Icon style={StyleSheet.flatten([style, layoutStyle])} {...rest} />;

}

CustomIcon.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  enableRTL: PropTypes.bool,
  Iconname: PropTypes.string,
};
CustomIcon.defaultProps = {
  style: {},
  Iconname: 'FontAwesome5',
  enableRTL: false,
};
