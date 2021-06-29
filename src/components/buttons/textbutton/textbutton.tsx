import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TouchableOpacityProps } from 'react-native';

interface TextButtonProps extends TouchableOpacityProps{
    title: String
}

export function TextButton({ title, ...rest }: TextButtonProps){
    return (
        <>
        <TouchableOpacity activeOpacity={0.7} {...rest}>
            <Text style={style.TextStyle}>{title}</Text>
        </TouchableOpacity>
        </>
    );
}

const style = StyleSheet.create({
    TextStyle: {
        color: '#007F04'
    },
});