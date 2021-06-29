import React from 'react';
import {
    StyleSheet,
    Text
} from 'react-native';

import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import colors from '../../../styles/colors';

interface OptionButtonProps extends RectButtonProps {
    title: string,
    active?: boolean
}

const OptionButton = ({ title, active = false, ...rest }: OptionButtonProps) => {
    return (
        <RectButton style={styles.container}
            {...rest}>
            <Text style={styles.text}>
                {title}
            </Text>
        </RectButton>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        maxWidth: '45%',
        backgroundColor: colors.shape,
        borderRadius: 20,
        paddingVertical: 10,
        alignItems: 'center',
        margin: 10
    },
    text: {
        color: colors.redButton,
        marginVertical: 16
    }
});

export default OptionButton