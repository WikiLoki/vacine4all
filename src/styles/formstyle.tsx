import { StyleSheet } from 'react-native';

const FormStyles = StyleSheet.create({
    form: {
        color: 'black',
        fontFamily: 'Arial',
        fontSize: 16,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonClickMe: {
        backgroundColor: 'red',
        borderRadius: 6,
        height: 40,
        width: 230,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textInput: {
        height: 40,
        borderWidth: 1,
        borderColor: 'gray',
        width: 250,
        marginBottom: 16,
        paddingHorizontal: 8,
        borderRadius: 10
    },
    textInputUser: {
        height: 40,
        borderWidth: 0,
        width: 250,
        marginBottom: 16,
        paddingHorizontal: 8,
    },
    textInputPassword: {
        height: 40,
        borderWidth: 0,
        width: '80%',
        marginBottom: 16,
        marginLeft: 10
    },
    FormContainer: {
        marginBottom: 16,
        height: 40,
        borderColor: 'gray',
        borderRadius: 8,
        borderWidth: 1,
        width: 250,
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
});

export default FormStyles