import React, {useState} from 'react';
import {StyleSheet, View, Alert, Text, SafeAreaView} from 'react-native';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import { auth } from '../../config/firebase';
import BasicTextInput from '../Components/Login/BasicTextInput';
import BasicButton from '../Components/Login/BasicButton';
import { TouchableOpacity } from 'react-native-gesture-handler';


export default function Signup ({navigation}:any){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSetEmail = (text: string) => setEmail(text);
    const handleSetPassword = (text:string) => setPassword(text)

    const onHandleLogin = () => {
        if(email !== "" && password !== ""){
            createUserWithEmailAndPassword(auth, email, password)
            .then(() => console.log("Login success"))
            .catch((err) => Alert.alert("Login Error", err.message))
        }
    }

    return(
        <SafeAreaView style={styles.container}>
            <Text
            style={styles.loginTitleStyle}
            >Sign up</Text>
            <View>
            <BasicTextInput
            style={styles.inputStyle}
            placeholder='Enter email'
            onChangeText={handleSetEmail}
            textContentType='emailAddress'
            keyboardType='email-address'
            />
            <BasicTextInput
            style={styles.inputStyle}
            placeholder='Enter password'
            onChangeText={handleSetPassword}
            secureTextEntry
            textContentType='password'
            />
            </View>
            <BasicButton
            style={styles.buttonStyle}
            title='Sign up'
            onPress={onHandleLogin}
            titleStyle={styles.titleStyle}
            />
            <View
            style={{flexDirection:"row"}}
            >
                <Text>Already have an account? </Text>
                <TouchableOpacity
                onPress={()=>navigation.navigate('Login')}
                >
                    <Text
                    style={{color:"#853ECC"}}
                    >Login</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#fff",
        justifyContent:"space-around",
        alignItems:"center",
    },
    inputStyle:{
        width:200,
        height:30,
        borderWidth:1,
        padding:5,
        margin:2
    },
    buttonStyle:{
        width:"20%",
        height:"5%",
        backgroundColor:"#853ECC",
    },
    titleStyle:{
        color:"#fff"
    },
    loginTitleStyle:{
        fontSize:50
    }
})