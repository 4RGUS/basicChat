import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
//@ts-ignore
import FontAwesome from 'react-native-vector-icons/FontAwesome';
//@ts-ignore
import Entypo from 'react-native-vector-icons/Entypo';
import colors from '../../colors';

const catImageUrl = "https://i.guim.co.uk/img/media/26392d05302e02f7bf4eb143bb84c8097d09144b/446_167_3683_2210/master/3683.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=49ed3252c0b2ffb49cf8b508892e452d" 


const Home = () => {

    const navigation = useNavigation()

    React.useEffect(()=>{
        navigation.setOptions({
            headerLeft: () => (
                <FontAwesome name="search" size={24} color={colors.gray} style={{marginLeft: 15}}/>
            ),
            headerRight: () => (
                <Image
                    source={{ uri: catImageUrl }}
                    style={{
                        width: 40,
                        height: 40,
                        marginRight: 15,
                    }}
                />
            ),
        })
    },[navigation])

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity
            onPress={()=> navigation.navigate("Chat" as never)}
            style={styles.chatButton}
            >
                <Entypo name="chat" size={30} color={colors.lightGray} />
            </TouchableOpacity>
        </SafeAreaView>
    );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent:"flex-end",
    alignItems:"flex-end",
    backgroundColor:"#fff"
  },
  chatButton: {
    backgroundColor:colors.primary,
    shadowOffset:{
        width:0,
        height:2
    },
    shadowOpacity:.9,
    shadowRadius:8,
    marginRight:20,
    marginBottom:50
  }
});
