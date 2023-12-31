import { View, Text, StyleSheet, Pressable } from 'react-native';
import React, { FC, useState, useEffect } from 'react';
import { COLOR_ROOT_APP } from '@/data/colors';
import COMMAND_SQL from '@/SQLite/CommandSQL/commandSQL';
import { Audio } from 'expo-av';
//* redux
import { useAppSelector, useAppDispatch } from '@/redux/store/hooks';
import { setSlicePushSetId, setSliceIsStartTimer } from '@/redux/slice/sets.slice';
import { useDispatch } from 'react-redux';
import { IExercise } from '@/data/dataStartExercise';

interface ISet {
    /**
     * Количество повторов в подходе.
     */
    amount: number;
    /**
     * Обьект упражнения.
     */
    exercise: IExercise;
    /**
     * Уникальное имя поля.
     * - Формируется как обшее название упражнения + номер по очередности.
     * - Пример: 'EXERCISE_1' + 1.
     */
    id: string;
}


/**
 * @component
 * Блок с одним повтором упражнения.
 * @param amount - Количество повторов в подходе.
 * @param title - Титульный текст.
 * @param descriptions - Описание под титульным текстом.
 * @example <Set amount={#} title={#} descriptions={#} />
 * @returns {JSX.Element}
 */
//= Set 
const Set: FC<ISet> = ({amount, exercise, id}) => {

    /**
     * Формирование уникального id для подхода в упражнении.
     * @example "DAY_1#EXERCISE_1#0"
     */
    const createdId:string = exercise.day + '#' + exercise.exercise + '#' + id;

    const [loadedSound, setLoadedSound] = useState<Audio.Sound>();
    const dispatch = useDispatch();
    /**
     * Функция для проигрывания звука.
     */
    const playSound = async () => {
        const {sound} = await Audio.Sound.createAsync(require('@/source/audio/bip.mp3'));
        setLoadedSound(loadedSound);
        await sound.playAsync();
    };
    
    /**
     * Массив с нажатыми id.
     */
    const pushSetId = useAppSelector(state => state.setsSlice.pushSetId);
    /**
     * Переменная с результатом, есть ли совпадения в массиве с нажатыми id, нашего текушего id.
     */
    const isPush: boolean = pushSetId.includes(createdId);
    /**
     * Добавление id в массив нажатых кнопок.
     */
    const onPush = () => {
        dispatch(setSlicePushSetId(createdId));
        dispatch(setSliceIsStartTimer(true));
    }

    useEffect(() => {
        return () => {
            if(loadedSound) loadedSound.unloadAsync();
        }
    },[]);

    
	return (
		<Pressable
            style={[styles.container, isPush ? {borderColor: COLOR_ROOT_APP.LIME_70, borderWidth: 3} : null]} 
            onPress={() => {
                onPush();
                playSound();
            }} 
        >
            <View style={styles.rapBox} >
                <Text style={styles.textRap} >{amount}</Text>
            </View>
            <View style={styles.descriptionsBox} >
                <Text style={styles.textTitle} >{id === 'burpee' ? 'Burpee' : exercise.title}</Text>
                <Text style={styles.textDescriptions} >{id === 'burpee' ? 'с отжиманием и прыжком' : exercise.description}</Text>
            </View>
		</Pressable>
	);
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        height: 60,
        backgroundColor: COLOR_ROOT_APP.DARK_GREY,
        borderRadius: 10,
        marginTop: 15
    },
    rapBox: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 40,
        height: 40,
        borderRadius: 5,
        backgroundColor: COLOR_ROOT_APP.GREY,
        marginLeft: 10
    },
    descriptionsBox: {
        marginLeft: 10,
        padding: 3,
        justifyContent: 'center'
    },
    textRap: {
        fontFamily: 'Sport',
        fontSize: 30,
        color: COLOR_ROOT_APP.LIGHT_GREY
    },
    textTitle: {
        fontSize: 16,
        fontWeight: '500',
        color: '#fff',
        lineHeight: 18
    },
    textDescriptions: {
        fontSize: 14,
        fontWeight: '500',
        color: COLOR_ROOT_APP.MEDIUM_GREY,
        lineHeight: 16
    }
});

export default Set;


