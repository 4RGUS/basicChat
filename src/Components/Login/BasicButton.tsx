import * as React from 'react';
import { TouchableOpacity, Text, GestureResponderEvent, StyleProp, ViewStyle, TextStyle } from 'react-native';

interface BasicButtonProps {
    title: string
    onPress?: ((event: GestureResponderEvent) => void) | undefined;
    style?: StyleProp<ViewStyle>;
    titleStyle?: StyleProp<TextStyle>;
}

const BasicButton = (props: BasicButtonProps) => {

    const {
        style,
        title,
        onPress,
        titleStyle
    } = props
  return (
    <TouchableOpacity
    style={[{
        justifyContent:"center",
        alignItems:"center",
        height:"10%"
    },style]}
    onPress={onPress}
    >
        <Text
        style={titleStyle}
        >
            {title}
        </Text>
    </TouchableOpacity>
  );
};

export default BasicButton;