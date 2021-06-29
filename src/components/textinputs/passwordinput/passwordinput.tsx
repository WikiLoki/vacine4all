import React from 'react';
import { View, ActivityIndicator, StyleSheet, TextInput, TextInputProps } from 'react-native';
import FormStyles from '../../../styles/formstyle';
import { Feather } from '@expo/vector-icons';


interface PasswordConfig {
    flShowPass: boolean,
    iconPass: any
}

interface PasswordTextInputProps extends TextInputProps {
    placeholder: string
}


export function PasswordTextInput({ ...rest }: PasswordTextInputProps) {

    const [objPasswordConfig, setConfigForm] = React.useState<PasswordConfig>({ flShowPass: true, iconPass: 'eye-off' });

    function handleChangeIcon() {
        let icone = objPasswordConfig.iconPass === "eye" ? "eye-off" : "eye";
        let flShowPass = !objPasswordConfig.flShowPass;
        setConfigForm({ iconPass: icone, flShowPass });
    }
    return (
        <View style={FormStyles.FormContainer}>
            <TextInput
                style={FormStyles.textInputPassword}
                secureTextEntry={objPasswordConfig.flShowPass}
                {...rest}
            />
            <Feather
                style={styles.iconEye}
                name={objPasswordConfig.iconPass}
                size={25}
                color={'#007F04'}
                onPress={handleChangeIcon}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#eb2a2a',
        flex: 1,
    },
    FormContainer: {
        marginTop: '35%',
        marginBottom: '-30%',
        marginLeft: '10%',
        marginRight: '10%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        borderRadius: 50
    },

    textTitle: {
        color: 'red',
        fontSize: 28,
        marginBottom: 8
    },
    textInput: {
        height: 40,
        borderColor: 'gray',
        borderRadius: 8,
        borderWidth: 1,
        width: '70%',
        marginBottom: 16,
        paddingHorizontal: 8
    },
    buttonIn: {
        backgroundColor: 'red',
        borderRadius: 8,
        height: 50,
        width: '70%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonTextIn: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold'
    },
    iconEye: {
        paddingHorizontal: 8,
        marginTop: 6
    },

});