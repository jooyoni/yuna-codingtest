import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IReservationType {
    [key: number]: {
        name: string;
        phone: string;
        date: undefined | { year: number; month: number; date: number };
        time: undefined | { hour: number; minute: number; isAm: boolean };
        headCounter: number;
        tableList: { [key: string]: { floor: number; table: number } };
        note: string;
        isShowing: boolean;
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

const initialState: IReservationType = {};

export const reservationSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        postReservation(state, action: PayloadAction<IPayloadType>) {
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
        deleteReservation(
            state,
            action: PayloadAction<{ reservationKey: number }>
        ) {
            delete state[action.payload.reservationKey];
        },
        hideReservation(
            state,
            action: PayloadAction<{ reservationKey: number }>
        ) {
            state[action.payload.reservationKey].isShowing = false;
        },
    },
});

export const { postReservation, deleteReservation, hideReservation } =
    reservationSlice.actions;

export default reservationSlice;
