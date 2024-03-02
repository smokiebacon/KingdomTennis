import {StyleSheet} from 'react-native';
export const GlobalStyles = {
  colors: {
    primary50: "#e4d9fd",
    primary100: "#c6affc",
    primary200: "#a281f0",
    primary400: "#5721d4",
    primary500: "#3e04c3",
    primary700: "#2d0689",
    primary800: "#200364",
    accent500: "#f7bc0c",
    error50: "#fcc4e4",
    error500: "#9b095c",
    gray500: "#39324a",
    gray700: "#221c30",
  },
}


/**
 * Common basic style defines
 */
export const BaseStyle = StyleSheet.create({
  textInput: {
    height: 46,
    borderRadius: 5,
    paddingHorizontal: 10,
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    // flex: 1,
  },
  safeAreaView: {
    flex: 1,
  },
});

export const BaseColor = {
  grayColor: '#9B9B9B',
  dividerColor: '#BDBDBD',
  whiteColor: '#FFFFFF',
  fieldColor: '#F5F5F5',
  yellowColor: '#FDC60A',
  navyBlue: '#3C5A99',
  kashmir: '#5D6D7E',
  orangeColor: '#E5634D',
  blueColor: '#5DADE2',
  pinkColor: '#A569BD',
  greenColor: '#58D68D',
};


export const Colors = {
  primary100: "#f9beda",
  primary500: "#c30b64",
  primary800: "#610440",
  error100: "#fcdcbf",
  error500: "#f37c13",
}
