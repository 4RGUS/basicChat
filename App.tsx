import React, { createContext, useContext, useEffect, useState } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {View, ActivityIndicator} from 'react-native';
import {onAuthStateChanged} from 'firebase/auth';
import { auth } from './config/firebase';

//screens
import Chat from './src/Screens/Chat';
import Login from './src/Screens/Login';
import Signup from './src/Screens/Signup';
import Home from './src/Screens/Home';

const Stack = createStackNavigator();
const AuthenticatedUserContext = createContext({});

const AuthenticatedUserProvider = ({children}:any) => {
  const [user, setUser] = useState(null);
  return (
    <AuthenticatedUserContext.Provider value={{user, setUser}}>
      {children}
    </AuthenticatedUserContext.Provider>
  )
}

function ChatStack () {
  return(
    <Stack.Navigator >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Chat" component={Chat} />
    </Stack.Navigator>
  )
}

function AuthStack () {
  return(
    <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
    </Stack.Navigator>
  )
}

function RootNavigator () {
  //@ts-ignore
  const {user, setUser} = useContext(AuthenticatedUserContext)
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth,
      async authenticatedUser=>{
        authenticatedUser? setUser(authenticatedUser) :setUser(null);
        setLoading(false);
      }
      )
    return () => unsubscribe();
  })

  if(loading){
    return(
      <View style={{flex:1, justifyContent:"center", alignItems:"center"}}>
        <ActivityIndicator size={"large"}/>
      </View>
    )
  }

  return(
    <NavigationContainer>
      {user?<ChatStack/>:<AuthStack/>}
    </NavigationContainer>
  )
}

export default function App() {
  return (
      <AuthenticatedUserProvider>
        <RootNavigator/>
      </AuthenticatedUserProvider>
  );
}
