import { useNavigation } from '@react-navigation/core';
import React from 'react';
import {
    Text,
    TouchableOpacity,
    View,
    Alert,
    SafeAreaView
} from 'react-native';
import styles from '../../styles/mainstyle';
import FormStyles from '../../styles/formstyle';
import { TextInput } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/AntDesign';
import api from '../../services/api';
import Loading from '../../components/loading/loading';
import { PasswordTextInput } from '../../components/textinputs/passwordinput/passwordinput';


interface ResetSenhaConfig {
    email: string,
    senha: string
}

export default function Register() {

    const [flLoading, setLoading] = React.useState(false);
    const [email, setEmail] = React.useState<string>('');
    const [senha, setSenha] = React.useState<string>('');
    const [senhaConfirm, setSenhaConfirm] = React.useState<string>('');
    const navigation = useNavigation();

    if (flLoading) {
        return (<Loading />);
    }

    function backToWelcome() {
        navigation.navigate('Login');
    }

    async function redefinirSenha() {
        let errors: Array<string> = [];
        let SenhaAlterada: ResetSenhaConfig = {
            "email": email,
            "senha": senha,
        }

        if (senha != senhaConfirm) {
            errors.push('\n\nSenhas não coincidem')
        }
        if (senhaConfirm.trim() === '' && senha.trim() != '') {
            errors.push('\n\nÉ obrigatório digitar novamente a senha')
        }

        setLoading(true)
        await api.put(`/paciente/RecuperaSenha`, SenhaAlterada)
            .then(() => {
                setLoading(false);
                Alert.alert('Aviso', 'Senha redefinida');
                navigation.navigate('Login');
            })
            .catch((e) => {
                if (e.response.data != undefined && e.response.data.errors != undefined) {
                    Object.values(e.response.data.errors).map((item: any) => {
                        errors.push(`\n\n${Object.values(item)}`);
                    })
                    Alert.alert('Aviso: Verifique os erros a seguir', `${errors}`)
                }
                else if (e.response.data.Message != null) {
                    Alert.alert('Aviso', `${e.response.data.Message}`)

                }
                setLoading(false)
            })
    }

    return (
        <SafeAreaView style={styles.SafeArea}>
            <Icon name='unlock' size={150} color={'red'}></Icon>
            <Text></Text>
            <Text style={styles.TextHello}>{'Redefinir senha'}</Text>
            <Text></Text>
            <View>
                <View style={FormStyles.form}>
                    <TextInput
                        style={FormStyles.textInput}
                        placeholder={'Digite seu email'}
                        onChangeText={(value) => { setEmail(value) }}
                        value={email}
                    ></TextInput>
                </View>
                <PasswordTextInput
                    placeholder={'Digite sua nova senha'}
                    onChangeText={(value) => { setSenha(value) }}
                    value={senha}
                ></PasswordTextInput>
                <PasswordTextInput
                    placeholder={'Digite novamente a nova senha'}
                    onChangeText={(value) => { setSenhaConfirm(value) }}
                    value={senhaConfirm}
                ></PasswordTextInput>
            </View>
            <TouchableOpacity
                style={FormStyles.buttonClickMe}
                activeOpacity={0.7}
                onPress={redefinirSenha}
            >
                <Text style={styles.textButton}>{'Redefinir'}</Text>
            </TouchableOpacity>
            <Text></Text>
            <TouchableOpacity
                style={FormStyles.buttonClickMe}
                activeOpacity={0.7}
                onPress={backToWelcome}
            >
                <Text style={styles.textButton}>{'Login'}</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}