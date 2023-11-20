import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IStateType {
    [id: number]: {
        name: string;
        phone: string;
        date: undefined | { year: number; month: number; date: number };
        time: undefined | { hour: number; minute: number; isAm: boolean };
        headCounter: number;
        tableList:
            | undefined
            | { [key: string]: { floor: number; table: number } };
        note: string;
        isShowing: true;
    };
}
interface IPayloadType {
    id: number;
    name: string;
    phone: string;
    date: undefined | { year: number; month: number; date: number };
    time: undefined | { hour: number; minute: number; isAm: boolean };
    headCounter: number;
    tableList: { [key: string]: { floor: number; table: number } };
    note: string;
}

const initialState: IStateType = {};

export const reservationSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        addReservation(state, action: PayloadAction<IPayloadType>) {
            state[action.payload.id] = {
                name: action.payload.name,
                phone: action.payload.phone,
                date: action.payload.date,
                time: action.payload.time,
                headCounter: action.payload.headCounter,
                tableList: action.payload.tableList,
                note: action.payload.note,
                isShowing: true,
            };
        },
    },
});

export const { addReservation } = reservationSlice.actions;

export default reservationSlice;
