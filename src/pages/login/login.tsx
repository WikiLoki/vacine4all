import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/core';
import { StyleSheet, Text, View, Image, Alert, SafeAreaView, ImageBackground, PanResponder } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { TextInput } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../services/api';
import style from '../../styles/mainstyle';
import FormStyles from '../../styles/formstyle';
import Loading from '../../components/loading/loading';
import { CustomButton } from '../../components/buttons/custombutton/custombutton';
import { TextButton } from '../../components/buttons/textbutton/textbutton';
import { PasswordTextInput } from '../../components/textinputs/passwordinput/passwordinput';

interface LoginProps {
    email: string,
    senha: string
}

export default function Login() {
    const navigation = useNavigation();
    const [txtEmail, setLogin] = useState('');
    const [txtSenha, setSenha] = useState('');
    const [loading, setLoading] = useState(false);

    async function RealizeLogin() {
        let errors: Array<string> = []
        let objLogin: LoginProps = { email: txtEmail, senha: txtSenha };
        if(txtEmail.trim() === ''){
            Alert.alert('Atenção: Falha no login', 'Usuário é obrigatório');
            return;
        }
        if(txtSenha.trim() === ''){
            Alert.alert('Atenção Falha no Login', 'Senha é obrigatório');
            return;
        }

        setLoading(true)
        try{
            const response = await api.post('/paciente/Login', objLogin);
            if(response.data != undefined && response.data.needMoreInfo != undefined && response.data.needMoreInfo) {
                await AsyncStorage.setItem('@Coronavac:email', txtEmail)
                await AsyncStorage.setItem('@Coronavac:Username', response.data.usuarioRetorno.nome)
                    .then(() => {
                        navigation.navigate('completeRegister');
                        setLoading(false)
                    })
            } else {
                Alert.alert('Aviso', 'Algo deu errado, favor tentar novamente')
            }
        } catch(e) {
            if(e.response != undefined && e.response.data != undefined) {
                Object.values(e.response.data).map((item) => {
                    errors.push(`${item}`);
                })
                setLoading(false)
                Alert.alert('Aviso', `${errors}`)
            }
            else {
                setLoading(false)
                Alert.alert('Aviso', `${e}`)
            }
        }
    }

    function navigateToResetPassword(){
        navigation.navigate('ResetPassowrd');
    }

    function navigateToRegister(){
        navigation.navigate('Register');
    }

    if(loading) {
        return (<Loading/>);
    }

    return (
        <SafeAreaView style={LoginStyle.container}>
            <View style={LoginStyle.FormContainer}>
                <Image style={{ width: '50%', height: '30%', justifyContent: 'center', position: 'relative' }} source={require('../../resources/injection.gif')} />
                <View style={{ paddingBottom: '5%' }}>
                    <Text style={style.TextHello}>{'Bem Vindo ao Vacine4All'}</Text>
                </View>
                <View style={FormStyles.form}>
                    <View style={FormStyles.FormContainer}>
                        <TextInput style={FormStyles.textInputUser} placeholder={'Digite o seu email'} onChangeText={text => setLogin(text)} value={txtEmail}/>
                    </View>
                    <PasswordTextInput placeholder="Senha" onChangeText={text => setSenha(text)} value={txtSenha}></PasswordTextInput>
                </View>
                <CustomButton title={'Entrar'} onPress={RealizeLogin} />
                <TextButton title={'Esqueceu a senha'} onPress={navigateToResetPassword} style={{ paddingTop: '5%', height: 40}} />
                <View style={{ flexDirection: 'row', paddingTop: '2%'}}>
                    <Text style={{ color: '#000000' }}>{'Ainda não é membro ?'}</Text>
                    <TextButton title={'Cadastre-se'} onPress={navigateToRegister} style={{ height: 40 }}/>
                </View>
            </View>
        </SafeAreaView>
    );
}

const LoginStyle = StyleSheet.create({
    container: {
        backgroundColor: '#00FF15',
        flex: 1,
    },
    FormContainer: {
        marginTop: '35%',
        marginBottom: '-30%',
        marginLeft: '10%',
        marginRight: '10%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 50
    },
    textTitle: {
        color: '#FF0000',
        fontSize: 28,
        marginBottom: 8
    },
    textInput: {
        height: 40,
        borderColor: '#808080',
        borderRadius: 8,
        borderWidth: 1,
        width: '70%',
        marginBottom: 16,
        paddingHorizontal: 8
    },
    buttonIn: {
        backgroundColor: '#FF0000',
        borderRadius: 8,
        height: 50,
        width: '70%',
        justifyContent: 'center',
        alignItems: 'center', 
    },
    buttonTextIn: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    iconEye: {
        paddingHorizontal: 8,
        marginTop: 6
    },
});