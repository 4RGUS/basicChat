import * as React from 'react';
import { 
    StyleSheet, 
    TextInput, 
    StyleProp, 
    TextStyle, 
    KeyboardTypeOptions 
} from 'react-native';

interface BasicTextInputProps {
    style?: StyleProp<TextStyle>;
    placeholder?: string | undefined;
    textInputProps?: any;
    keyboardType?: KeyboardTypeOptions | undefined;
    value?: string | undefined;
    onChangeText?: ((text: string) => void) | undefined;
    secureTextEntry?: boolean | undefined;
    textContentType?: 'none'|
    'URL'|
    'addressCity'|
    'addressCityAndState'|
    'addressState'|
    'countryName'|
    'creditCardNumber'|
    'emailAddress'|
    'familyName'|
    'fullStreetAddress'|
    'givenName'|
    'jobTitle'|
    'location'|
    'middleName'|
    'name'|
    'namePrefix'|
    'nameSuffix'|
    'nickname'|
    'organizationName'|
    'postalCode'|
    'streetAddressLine1'|
    'streetAddressLine2'|
    'sublocality'|
    'telephoneNumber'|
    'username'|
    'password'|
    'newPassword'|
    'oneTimeCode'|
    undefined;

}

const BasicTextInput = (props: BasicTextInputProps) => {
    
    const {
        style,
        placeholder,
        textInputProps,
        keyboardType,
        value,
        onChangeText,
        secureTextEntry,
        textContentType
    } = props

    return (
        <TextInput
            textContentType={textContentType}
            style={style}
            placeholder={placeholder}
            keyboardType={keyboardType}
            value={value}
            secureTextEntry={secureTextEntry}
            onChangeText={onChangeText}
            {...textInputProps}
        />
    );
};

export default BasicTextInput;

const styles = StyleSheet.create({
  container: {}
});
