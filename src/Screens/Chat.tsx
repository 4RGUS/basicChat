import React, {useState, useLayoutEffect, useCallback} from 'react';
import {GiftedChat, IMessage} from 'react-native-gifted-chat';
import {TouchableOpacity} from 'react-native';
import {
  collection,
  addDoc,
  orderBy,
  onSnapshot,
  query,
} from 'firebase/firestore';
import {signOut} from 'firebase/auth';
import {auth, database} from '../../config/firebase';
import {useNavigation} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import colors from '../../colors';

export default function Chat() {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const navigation = useNavigation();

  const onSignOut = () => {
    signOut(auth).catch(err => console.log(err.message));
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={{
            marginRight: 10,
          }}
          onPress={onSignOut}>
          <AntDesign
            name="logout"
            size={24}
            color={colors.gray}
            style={{marginRight: 10}}
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  useLayoutEffect(() => {
    const collectionRef = collection(database, 'chats');
    const q = query(collectionRef, orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(q, snapshot => {
      console.log(snapshot);
      setMessages(
        snapshot.docs.map(doc => ({
          _id: doc.id,
          createdAt: doc.data().createdAt.toDate(),
          text: doc.data().text,
          user: doc.data().user,
        })),
      );
    });

    return () => unsubscribe();
  }, []);

  const onSend = useCallback((messages: IMessage[]) => {
    setMessages((previousMessages: IMessage[]) =>
      GiftedChat.append(previousMessages, messages),
    );
    const {_id, createdAt, text, user} = messages[0];
    addDoc(collection(database, 'chats'), {
      _id,
      createdAt,
      text,
      user,
    });
  }, []);

  return (
    <GiftedChat
      messages={messages}
      onSend={onSend}
      user={{
        _id: auth?.currentUser?.email || 0,
        avatar: 'https://i.pravatar.cc/300',
      }}
      messagesContainerStyle={{
        flex: 1,
        backgroundColor: colors.white,
      }}
    />
  );
}
