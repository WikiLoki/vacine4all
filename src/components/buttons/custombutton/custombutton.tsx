import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TouchableOpacityProps
} from 'react-native';

import { Button, ButtonProps } from 'react-native-elements';



export function CustomButton({ title, ...rest }: ButtonProps) {

    return (
        <>
            <Button
                type={'outline'}
                buttonStyle={styles.ButtonStyle}
                titleStyle={styles.TextStyle}
                title={title}
                {...rest}
            />
        </>
    );
}


const styles = StyleSheet.create({
    ButtonStyle: {
        backgroundColor: '#00FF0C',
        borderRadius: 6,
        borderWidth: 0,
        height: 40,
        width: 230,
        justifyContent: 'center',
        alignItems: 'center',
    },
    TextStyle: {
        color: '#000000',
    },
});