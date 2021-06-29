import { useNavigation } from '@react-navigation/core';
import React from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    SafeAreaView,
    KeyboardAvoidingView,
    Platform
} from 'react-native';

import styles from '../../styles/mainstyle'


export default function Page1() {
    const [txtIdadeAnos, SetIdade] = React.useState('');
    const [fl_Visualiza, SetFl_Visualiza] = React.useState(false);

    const [txtPeso, SetPeso] = React.useState('');
    const [txtAltura, SetAltura] = React.useState('');
    const [classificacao, SetClassificacao] = React.useState('');
    const [TextColor, SetColor] = React.useState('white');
    const [bgcolor, Setbgcolor] = React.useState('black');

    const navigation = useNavigation();
    function backToWelcome() {
        navigation.goBack();
    }

    function BTN_CalculaIMC() {
        const imc: number = Number(txtPeso) / (Number(txtAltura) * Number(txtAltura));
        if (imc < 18.5) {
            SetClassificacao('Peso Baixo');
            SetColor('yellow');
        }
        else if (imc >= 18.5 && imc <= 24.9) {
            SetClassificacao('Peso Normal');
            SetColor('green');
        }
        else if (imc >= 25.0 && imc <= 29.9) {
            SetClassificacao('Sobrepeso');
            SetColor('#dbc3b4');
        }
        else if (imc >= 30.0 && imc <= 34.9) {
            SetClassificacao('Obesidade (Grau I)');
            SetColor('orange');
        }
        else if (imc >= 35.0 && imc <= 39.9) {
            SetClassificacao('Obesidade Severa (Grau II)');
            SetColor('#bf6862');
        }
        else if (imc >= 40) {
            SetClassificacao('Obesidade Mórbida (Grau III)');
            SetColor('red');
        }
        else {
            SetClassificacao('desconhecido');
            SetColor('White');
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView style={styles.container}>
                <View style={styles.container}>
                    <View style={styles.form}>
                        <Text style={styles.TextHello}>Olá Luan</Text>
                        <TextInput
                            placeholder="Digite Peso"
                            style={styles.textInput}
                            onChangeText={(text) => { SetPeso(text); }}
                            value={txtPeso}
                        ></TextInput>
                        <TextInput
                            placeholder="Digite Altura"
                            style={styles.textInput}
                            onChangeText={(text) => { SetAltura(text); }}
                            value={txtAltura}
                        ></TextInput>
                        <TouchableOpacity
                            style={styles.buttonClickMe}
                            activeOpacity={0.7}
                            onPress={BTN_CalculaIMC}
                        >
                            <Text style={styles.textButton}>Calcular IMC</Text>
                        </TouchableOpacity>
                        <Text></Text>
                        <Text style={{ color: TextColor, backgroundColor: bgcolor, fontSize: 18 }}>{classificacao}</Text>
                        <Text></Text>
                        <TouchableOpacity
                            style={styles.backButton}
                            activeOpacity={0.7}
                            onPress={backToWelcome}
                        >
                            <Text style={styles.textButton}>voltar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}