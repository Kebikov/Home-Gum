export interface IDataDays {
    /**
     * Уникальный id набора упражнений.
     */
    id: string;
    /**
     * Изображение фоновое.
     */
    img: number;
    /**
     * Дата последнего занятия по данной программе.
     */
    date: string;
    /**
     * Титульное название для дня занятий.
     */
    title: string;
    /**
     * Описание для дня занятий, внизу блока.
     */
    description: string;
    /**
     * Отметка последнего дня занятий, по которому занимался.
     */
    lastExercise: boolean;
}

/**
 * Массив данный для элементов дней занятий.
 */
export const DATA_DAYS: Array<IDataDays> = [
    {
        id: 'Day-1',
        img: require(`@/source/img/1.jpg`),
        date: '23.12.2023',
        title: 'Day One',
        description: 'Битепс / Ноги / Грудь',
        lastExercise: false
    },
    {
        id: 'Day-2',
        img: require(`@/source/img/2.jpg`),
        date: '23.12.2023',
        title: 'Day Two',
        description: 'Грудь / Битепс / Плечи',
        lastExercise: true
    },
    {
        id: 'Day-3',
        img: require(`@/source/img/3.jpg`),
        date: '23.12.2023',
        title: 'Day Three',
        description: 'Битепс / Грудь / Ноги',
        lastExercise: false
    },
    {
        id: 'Day-4',
        img: require(`@/source/img/4.jpg`),
        date: '23.12.2023',
        title: 'Day Four',
        description: 'Плечи / Грудь / Битепс',
        lastExercise: false
    },
    {
        id: 'Day-5',
        img: require(`@/source/img/5.jpg`),
        date: '23.12.2023',
        title: 'Day Five',
        description: 'Грудь / Плечи / Спина',
        lastExercise: false
    }
];