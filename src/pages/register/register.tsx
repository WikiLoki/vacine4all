import { useNavigation } from '@react-navigation/core';
import React, {useState} from 'react';
import {
    Text,
    View,
    Alert,
    StyleSheet,
    SafeAreaView,
    ScrollView
} from 'react-native';
import styles from '../../styles/mainstyle';
import FormStyles from '../../styles/formstyle';
import { TextInput } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/AntDesign';

//components
import { TextButton } from '../../components/buttons/textbutton/textbutton';
import Loading from '../../components/loading/loading';
import { CustomButton } from '../../components/buttons/custombutton/custombutton';
import { PasswordTextInput } from '../../components/textinputs/passwordinput/passwordinput';

import api from '../../services/api';


interface RegisterConfig {
    nome: string;
    email: string;
    senha: string;
}



export default function Register() {
    const navigation = useNavigation();
    //variables for valitation
    const [txtUser, setUser] = useState('');
    const [txtEmail, setEmail] = useState('');
    const [txtSenha, setSenha] = useState('');
    const [txtSenhaConfirm, setSenhaConfirm] = useState('');
    const [flLoading, setLoading] = useState(false)

    function backToWelcome() {
        navigation.navigate('Login');
    }

    if (flLoading) {
        return (<Loading />);
    }

    async function realizeRegister() {
        let errors: Array<string> = [];
        let cadastroOBJ: RegisterConfig = {
            "nome": txtUser,
            "email": txtEmail,
            "senha": txtSenha,
        }

        if (txtSenha != txtSenhaConfirm) {
            errors.push('\n\nSenhas não coincidem')
        }
        if (txtSenhaConfirm.trim() === '' && txtSenha.trim() != '') {
            errors.push('\n\nÉ obrigatório digitar novamente a senha')
        }



        setLoading(true)
        await api.post(`/paciente/Register`, cadastroOBJ)
            .then((res: any) => {
                setLoading(false);
                Alert.alert('Aviso', 'Cadastro realizado com sucesso!',);
                navigation.goBack();
            })
            .catch((e) => {
                if (e.response.data != undefined && e.response.data.errors != undefined) {
                    Object.values(e.response.data.errors).map((item: any) => {
                        errors.push(`\n\n${Object.values(item)}`);
                    })
                    Alert.alert('Aviso: Verifique os erros a seguir', `${errors}`)
                }
                setLoading(false)
            })
    }

    return (
        <SafeAreaView style={styles.SafeArea}>
            <Icon name='adduser' size={150} color={'#007F04'}></Icon>
            <Text></Text>
            <Text style={styles.TextHello}>{'Realize seu cadastro'}</Text>
            <Text></Text>
            <View>
                <View style={FormStyles.form}>
                    <TextInput
                        style={FormStyles.textInput}
                        placeholder={'Digite seu nome completo'}
                        onChangeText={text => setUser(text)}
                        value={txtUser}
                    />
                    <TextInput
                        style={FormStyles.textInput}
                        placeholder={'Digite seu email'}
                        onChangeText={text => setEmail(text)}
                        value={txtEmail}
                    />
                </View>
                <PasswordTextInput
                    placeholder={'Digite sua Senha'}
                    onChangeText={text => setSenha(text)}
                    value={txtSenha}
                ></PasswordTextInput>
                <PasswordTextInput
                    placeholder={'Digite novamente sua senha'}
                    onChangeText={text => setSenhaConfirm(text)}
                    value={txtSenhaConfirm}
                ></PasswordTextInput>
            </View>
            <View style={Registerstyles.Container}>
                <CustomButton
                    title={'Cadastrar'}
                    onPress={realizeRegister}
                />
            </View>
            <View style={Registerstyles.RealizarLoginContainer}>
                <Text>Já é membro? </Text>
                <TextButton
                    title={'Realizar Login agora'}
                    onPress={backToWelcome}
                    style={{ height: 40 }}
                />
            </View>
        </SafeAreaView>
    );
}
const Registerstyles = StyleSheet.create({
    Container: {
    },
    RealizarLoginContainer: {
        paddingTop: '5%',
        flexDirection: 'row'
    }
})