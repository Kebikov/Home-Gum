import { View, StyleSheet } from 'react-native';
import React, { FC, useEffect, useState } from 'react';
import Gradient from '@/component/Gradient/Gradient';
import { IDataDays } from '@/data/dataDays';
import { useFocusEffect } from '@react-navigation/native';
//* SQL
import DBManagment from '@/SQLite/DBManagment';
import Configuration from '@/SQLite/DBManagment/сonfiguration';
//* component
import Day from '@/component/Day/Day';
//* redux
import { useAppSelector } from '@/redux/store/hooks';


//: DaysScreen
/**
 * @screen
 * Экран с карточками, дни с наборами упражнений.
 * @example <DaysScreen/>
 * @returns {JSX.Element}
 */
const DaysScreen: FC = () => {

    /**
     * @param stateDays Массив с данными дней.
     */
    const [stateDays, setStateDays] = useState<Array<IDataDays> | []>([]);

    const isUpdateToggle = useAppSelector(state => state.setsSlice.isUpdateToggle);
    /**
     * Массив элементов карточек с днями тренировак.
     */
    const days: JSX.Element[] = stateDays.map((item, i) => <Day day={item} key={i}/>);

useEffect(() => {
    async function getData() {
        const data: Array<IDataDays> | [] = await DBManagment.inset(`SELECT * FROM ${Configuration.TABLE__DAYS}`); 
        if(data.length !== 0) setStateDays(data);
    }

    getData();
},[isUpdateToggle]);


	return (
		<View style={style.main} >
            <Gradient text='Days Of Training' size={32} />
            {
                days
            }
		</View>
	);
};

const style = StyleSheet.create({
    main: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    maskedView: {
        width: '100%',
        flexDirection: 'row',
    },
    linearGradient: {
        width: '100%', 
        height: 30
    },
    text: {
        fontSize: 30,
        fontWeight: '500',
        textTransform: 'uppercase',
        fontFamily: 'Sport'
    }
});

export default DaysScreen;



