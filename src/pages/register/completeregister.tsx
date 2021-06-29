import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/core';
import { StyleSheet, Text, View, Alert, SafeAreaView, ScrollView, Platform, Button } from 'react-native';
import style from '../../styles/mainstyle';
import FormStyle from '../../styles/formstyle';
import { TextInput } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/AntDesign';
import DateTimePicker, { DateTimePickerResult } from '@react-native-community/datetimepicker';
import Loading from '../../components/loading/loading';
import { CustomButton } from '../../components/buttons/custombutton/custombutton';
import api from '../../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface RegisterConfig {
    nome: String,
    cpf: String,
    peso: Number,
    altura: Number,
    dataNascimento: Date,
    cidade: String,
    UF: String,
    JaTeveCovid: Boolean,
    email: String,
    urlImage?: String
}





export default function completeRegister() {

    const navigation = useNavigation();
    const [flLoading, setLoading] = React.useState(false);

    //variables for valitation
    const [cpf, setCpf] = React.useState('');
    const [peso, setPeso] = React.useState('');
    const [altura, setAltura] = React.useState('');
    const [Cidade, setCidade] = React.useState('');
    const [UF, setUF] = React.useState('');
    const [txtSenha, setSenha] = React.useState('');
    const [txtSenhaConfirm, setSenhaConfirm] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [nome, setNome] = React.useState('');

    const [show, setShow] = React.useState(false);
    const [mode, setMode] = React.useState<any>('date');
    const [date, setDate] = React.useState(new Date(1598051730000));
    const [noSelected, setNoSelected] = React.useState(false)
    const [yesSelected, setYesSelected] = React.useState(false)
    const [teveCovid, setTeveCovidValue] = React.useState<boolean>(false);

    //#region encolhe

    React.useEffect(() => {
        Alert.alert('Aviso', 'Seu cadastro está incompleto, favor, complete seu cadastro para continuar', [
            {
                text: 'Voltar',
                onPress: () => {
                    navigation.navigate('Login');
                }
            },
            {
                text: 'Continuar'
            }
        ]);
        loadStoredInformation();
    }, []);



    function onChange(event: any, selectedDate: any) {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
    };

    function showMode(currentMode: string) {
        setShow(true);
        setMode(currentMode);
    };

    function showDatepicker() {
        showMode('date');
    };

    async function loadStoredInformation() {
        let Email = await AsyncStorage.getItem('@Coronavac:email');
        let NomeUsuario = await AsyncStorage.getItem('@Coronavac:Username')
        setEmail(Email || '');
        setNome(NomeUsuario || '');
    }

    function naoCovidSelected() {
        setTeveCovidValue(false);
        setNoSelected(true);
        setYesSelected(false);
    }

    function simCovidSelected() {
        setTeveCovidValue(true);
        setNoSelected(false);
        setYesSelected(true);
    }

    if (flLoading) {
        return (<Loading />);
    }

    async function realizeRegister() {

        let errors: Array<string> = [];

        let cadastroOBJ: RegisterConfig = {
            nome: nome,
            cpf: cpf,
            peso: parseFloat(peso),
            altura: parseFloat(altura),
            dataNascimento: date,
            cidade: Cidade,
            UF: UF,
            JaTeveCovid: teveCovid,
            email: email,
        }


        if (txtSenha != txtSenhaConfirm) {
            errors.push('\n\nSenhas não coincidem')
        }
        if (txtSenhaConfirm.trim() === '' && txtSenha.trim() != '') {
            errors.push('\n\nÉ obrigatório digitar novamente a senha')
        }



        setLoading(true)
        await api.put(`/paciente/AtualizaCadastro`, cadastroOBJ)
            .then((res: any) => {
                setLoading(false);
                Alert.alert('Aviso', 'Cadastro Atualizado com sucesso!',);
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
    //#endregion

    return (
        <SafeAreaView style={style.SafeArea}>
            <Icon name='edit' size={75} color={'red'}></Icon>
            <Text></Text>
            <Text style={style.TextHello}>{'Atualize seu cadastro'}</Text>
            <Text></Text>
            <View>
                <View style={FormStyle.form}>
                    <TextInput
                        style={FormStyle.textInput}
                        placeholder={'Digite seu CPF'}
                        onChangeText={(text) => { setCpf(text) }}
                        value={cpf}
                        maxLength={11}
                    />
                    <TextInput
                        style={FormStyle.textInput}
                        placeholder={'Digite seu peso'}
                        onChangeText={(text) => { setPeso(text) }}
                        value={peso}
                        maxLength={4}
                    />
                    <TextInput
                        style={FormStyle.textInput}
                        placeholder={'Digite sua altura'}
                        onChangeText={(text) => { setAltura(text) }}
                        value={altura}
                        maxLength={4}
                    />
                    <TextInput
                        style={FormStyle.textInput}
                        placeholder={'Digite o nome da cidade'}
                        onChangeText={(text) => { setCidade(text) }}
                        value={Cidade}
                    />
                    <TextInput
                        style={FormStyle.textInput}
                        placeholder={'Digite o UF'}
                        onChangeText={(text) => { setUF(text) }}
                        value={UF}
                        maxLength={2}
                    />
                    <View>
                        <View>
                            <CustomButton onPress={showDatepicker} title="selecione data de nascimento" buttonStyle={Registerstyles.datePickerStyle} titleStyle={{ color: '#a3a3a3' }} />
                        </View>
                        {show && (
                            <DateTimePicker
                                testID="dateTimePicker"
                                value={date}
                                mode={mode}
                                display="spinner"
                                onChange={onChange}
                            />
                        )}
                    </View>

                    <View style={Registerstyles.covidButtonsContainer}>

                        <Text style={Registerstyles.covidViewTitle}>{'Já teve COVID?'}</Text>
                        <View style={Registerstyles.covidContainer}>
                            <CustomButton
                                title='Sim'
                                titleStyle={yesSelected ? Registerstyles.titleSelected : Registerstyles.titleNotSelected}
                                buttonStyle={yesSelected ? Registerstyles.covidButtonSelected : Registerstyles.covidButton}
                                onPress={() => { simCovidSelected() }}
                            />
                            <CustomButton
                                title='Não'
                                titleStyle={noSelected ? Registerstyles.titleSelected : Registerstyles.titleNotSelected}
                                buttonStyle={noSelected ? Registerstyles.covidButtonSelected : Registerstyles.covidButton}
                                onPress={() => { naoCovidSelected() }}
                            />
                        </View>
                    </View>
                </View>

            </View>
            <View style={Registerstyles.Container}>
                <CustomButton
                    title={'Atualizar Cadastro'}
                    onPress={realizeRegister}
                />
            </View>
        </SafeAreaView>
    );
}
const Registerstyles = StyleSheet.create({

    pickerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 40,
        borderWidth: 1,
        borderColor: 'gray',
        width: 250,
        marginBottom: 16,
        borderRadius: 10,
    },
    simpleContainer: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    scrollview: {
        paddingTop: '25%'
    },
    Container: {
        paddingTop: '5%'
    },
    RealizarLoginContainer: {
        paddingTop: '5%',
        flexDirection: 'row'
    },
    TextHello: {
        paddingBottom: 10,
        fontSize: 18,
        fontWeight: 'bold',
        paddingTop: '5%'
    },
    datePickerStyle: {
        backgroundColor: 'white',
        borderRadius: 10,
        borderWidth: 1,
        width: 250,
        borderColor: '#a3a3a3'
    },
    covidContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: 250,
        paddingBottom: '5%',
    },
    covidButton: {
        backgroundColor: 'white',
        borderRadius: 10,
        borderWidth: 1,
        width: 100,
        borderColor: '#a3a3a3',
    },
    covidButtonSelected: {
        backgroundColor: 'white',
        borderRadius: 10,
        borderWidth: 1,
        width: 100,
        borderColor: 'green',
    },
    titleSelected: {
        color: 'green'
    },
    titleNotSelected: {
        color: '#a3a3a3'
    },
    covidViewTitle: {
        color: '#a3a3a3',
        paddingBottom: '5%'
    },
    covidButtonsContainer: {
        marginTop: '5%',
        borderWidth: 1,
        borderColor: '#a3a3a3',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    }
})