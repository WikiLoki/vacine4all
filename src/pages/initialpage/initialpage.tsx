import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/core';
import { Text, TouchableOpacity, View, Alert, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../../components/header/header';
import FormStyle from '../../styles/formstyle';
import OptionButton from '../../components/buttons/optionsbutton/optionsbutton';

interface vaccineType{
    title: string,
    active: boolean,
}

export default function initialPage() {
    const navigation = useNavigation();

    async function backToWelcome() {
        await AsyncStorage.clear();
        navigation.goBack();
    }

    function navigateToIMC() {
        navigation.navigate('IMC');
    }

    function navigateToAnotherPage() {
        navigation.navigate('AnotherPage');
    }

    const vaccineTypeList: vaccineType[] = [
        {
            title: '1° Dose Covid',
            active: false
        },
        {
            title: '2° Dose Covid',
            active: false
        },
    ]

    const [listVaccine, setListVaccine] = useState<vaccineType[]>(vaccineTypeList);

    return (
        <SafeAreaView style={{ flex: 1}}>
            <Header />
            <View style={style.container}>
                <View style={style.vaccineList}>
                    <FlatList data={listVaccine} renderItem={({ item }) => (
                        <OptionButton title={item.title} active onPress={() => { Alert.alert('Aviso:','Não pode tomar') }} />
                    )}
                    keyExtractor={(item, index) => index.toString()}
                    showsVerticalScrollIndicator={false}
                    numColumns={2}
                    contentContainerStyle={style.itemVaccine} />
                </View>
            </View>
        </SafeAreaView>
    );
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        marginTop: '20%',
    },
    header: {
        paddingHorizontal: 20
    },
    question: {
        fontSize: 17,
        color: 'white',
    },
    vaccineList:{
        marginTop: '20%',
    },
    itemVaccine: {

    }
});