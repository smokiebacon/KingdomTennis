import { Text, TextProps } from "react-native-paper";
import { useColorTheme } from "../../constants/theme";



export default function CustomText({ children, style, ...rest }: TextProps<any>) {
    const { colors } = useColorTheme()
    return (
        <Text  style={[{ color : colors.text }, style]} {...rest}>{children}</Text>
    )
}