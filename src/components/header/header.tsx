import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Alert, Button } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import colors from '../../styles/colors';
import AsyncStorage  from '@react-native-async-storage/async-storage';

export default function Header() {
    const navigation = useNavigation();
    const [userName, setUsername] = useState<string>('');
    const [userImage, setImage] = useState<string>('');

    async function loadStoreUserName() {
        const user: string = await AsyncStorage.getItem('@vacine4all:UserName') || '';
        setImage('../../resources/user-icon');
        setUsername(user);
    }

    useEffect(() => {
        loadStoreUserName();
    }, []);

    function goUserpage() {
        navigation.navigate('UserPage');
    }

    return(
        <View style={style.container}>
            <View>
                <TouchableOpacity onPress={() => { goUserpage() }}>
                    <Image source={require('../../resources/user-icon.png')} style={style.userImage} />
                </TouchableOpacity>
                <View style={style.greetingBox}>
                    <Text style={style.greeting}>Bem Vindo, </Text>
                    <Text style={style.userName}>{userName.split(' ').slice(0.1)}</Text>
                </View>
            </View>
        </View>
    );
}

const style = StyleSheet.create({
    container: {
        backgroundColor: '#9EFFCC',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'flex-start',
        paddingVertical: 20,
        marginTop: '10%',
    },
    userImage: {
        width: 75,
        height: 75,
        borderRadius: 40,
        alignSelf: 'center',
        marginBottom: '10%'
    },
    greeting: {
        fontSize: 32,
        color: '#FFFFFF',
    },
    userName: {
        fontSize: 32,
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
    greetingBox: {
        flexDirection: 'row',
    },
});