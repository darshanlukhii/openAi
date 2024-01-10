import axios from 'axios';
import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  Alert,
  FlatList,
  TextInput,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import {useDispatch, useSelector} from 'react-redux';
import {moderateScale} from 'react-native-size-matters';

import { CHAT_MESSAGES } from './Redux/types';
import {fetchInitialMessage, sendMessage} from './Redux/Actions/chatAction';

const ChatScreen = () => {
  const dispatch = useDispatch();
  const flatlistRef = useRef(null);
  const messageListRef = useRef(null);
  const {messages} = useSelector(val => val?.chat);

  const [message, setMessage] = useState('')
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    dispatch(fetchInitialMessage());
  }, []);

  const sendMessageAPI = async () => {
    setLoading(true);

    const contextText = message;
    dispatch(sendMessage(contextText));
    clearTextInput();

    if (message.length) {
      let temp = []

      messages.map(val => {
        temp.push(val?.message)
      })

      const requestData = {
        model: 'gpt-3.5-turbo',
        messages: [...temp,{role: 'user', content: message}],
      };
      await axios
        .post('https://api.openai.com/v1/chat/completions', requestData, {
          headers: {
            Authorization:
              'Bearer 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',
            'Content-Type': 'application/json',
          },
        })
        .then(response => {
          const res = response?.data;
          const choice = res?.choices[0];
          const obj = {
            index: choice.index,
            finish_reason: choice.finish_reason,
            message: {
              role: choice.message.role,
              content: choice.message.content,
            },
          };
          dispatch({type: CHAT_MESSAGES, payload: obj});
          setLoading(false);
        })
        .catch(err => {
          console.log('err', err);
          setLoading(false);
        });
    } else {
      Alert.alert('alert', 'plase enter something!');
    }
  };

  function clearTextInput() {
    flatlistRef.current?.clear();
  }

  return (
    <SafeAreaView style={{flex: 1, marginTop: 10, marginHorizontal: 2}}>
      <View style={{flex: 1, height: Dimensions.get('screen').height * 0.82}}>
        <FlatList
          data={messages}
          ref={messageListRef}
          renderItem={({item}) => {
            return (
              <View
                style={[
                  styles.msgContainer,
                  {
                    alignSelf:
                      item?.message?.role === 'user'
                        ? 'flex-end'
                        : 'flex-start',
                    backgroundColor:
                      item?.message?.role === 'user' ? '#1084ff' : 'grey',
                  },
                ]}>
                <Text style={styles.content}>{item?.message?.content}</Text>
              </View>
            );
          }}
        />
      </View>
      <View>
        {isLoading && (
          <ActivityIndicator
            size="small"
            color="#0000ff"
            style={styles.loaderText}
          />
        )}
        <View style={styles.container}>
          <TextInput
            style={styles.input}
            placeholder="Type your message..."
            ref={flatlistRef}
            onChangeText={text => setMessage(text)}
            autoFocus={false}
            onFocus={() =>
              messageListRef?.current?.scrollToEnd({animated: false})
            }
          />
          <TouchableOpacity style={styles.sendButton} onPress={sendMessageAPI}>
            <Text style={styles.sendButtonText}>Send</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  contentStyle: {
    paddingTop: 5,
    color: 'white',
    textAlign: 'justify',
    fontSize: 18,
  },
  conStyle: {
    paddingTop: 5,
    color: 'white',
    textAlign: 'justify',
    fontSize: 18,
  },
  queStyle: {
    paddingTop: 5,
    color: 'white',
    textAlign: 'justify',
    fontSize: 18,
  },
  item: {
    marginVertical: moderateScale(7, 2),
    flexDirection: 'row',
    alignSelf: 'flex-end',
    marginRight: 20,
  },
  itemIn: {
    marginLeft: 20,
  },
  balloon: {
    maxWidth: moderateScale(250, 2),
    paddingHorizontal: moderateScale(10, 2),
    paddingTop: moderateScale(5, 2),
    paddingBottom: moderateScale(7, 2),
    borderRadius: 20,
  },
  arrowContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
    flex: 1,
  },
  arrowLeftContainer: {
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },

  arrowRightContainer: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },

  arrowLeft: {
    left: moderateScale(-6, 0.5),
  },

  arrowRight: {
    right: moderateScale(-6, 0.5),
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: '#007BFF',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  msgContainer: {
    backgroundColor: '#F6F0F9',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    maxWidth: '80%',
    marginTop: 5
  },
  content: {
    fontSize: 14,
    lineHeight: 20,
    color :'#fff'
  },
  loaderText: {
    fontSize: 15,
    alignSelf: 'center',
    marginVertical: 5,
  },
});

export default ChatScreen;