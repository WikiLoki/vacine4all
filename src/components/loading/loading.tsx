import React from 'react';
import { View, ActivityIndicator, StyleSheet, Image } from 'react-native';

export default function Loading(){
    return(
        <View style={style.loadingContainer}>
            <Image style={style.imageStyle} source={require('../../resources/corona-loading.gif')}/>
        </View>
    );
}

const style = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
    },
    imageStyle: {
        marginLeft: '15%',
        width: '60%',
        height: '30%',
    }
});