import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({

    SafeAreaRegister: {
        flex: 1,
        paddingTop: '20%',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    SafeArea: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },

    TextHello: {
        paddingBottom: 10,
        fontSize: 18,
        fontWeight: 'bold'
    },

    TextResponse: {
        paddingTop: 10
    },

    textInput: {
        height: 40,
        borderColor: 'gray',
        borderRadius: 8,
        borderWidth: 1,
        width: 150,
        textAlign: 'center',
        marginBottom: 16,
    },

    form: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },

    buttonClickMe: {
        backgroundColor: 'darkcyan',
        borderRadius: 8,
        height: 50,
        width: 150,
        justifyContent: 'center',
        alignItems: 'center',
    },

    textButton: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold'
    },

    simpleText: {
        paddingTop: 10
    },

    backButton: {
        backgroundColor: 'red',
        borderRadius: 8,
        height: 45,
        width: 115,
        justifyContent: 'center',
        alignItems: 'center',
    }

});

export default styles;