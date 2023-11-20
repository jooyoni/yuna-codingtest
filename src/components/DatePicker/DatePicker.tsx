import { useState } from 'react';
import styles from './DatePicker.module.scss';
import { ReactComponent as ClockIcon } from '../../assets/alarm_on.svg';
import { ReactComponent as CalendarIcon } from '../../assets/today.svg';
import { ReactComponent as UpIcon } from '../../assets/chevron-up.svg';
import { ReactComponent as DownIcon } from '../../assets/chevron-down.svg';
import { ReactComponent as TrashIcon } from '../../assets/trash.svg';
import { timeConverter } from '../../common/timeConverter';

interface IPropsType {
    setDatePickerOpen: React.Dispatch<React.SetStateAction<boolean>>;
    handleSetReservationDate: (
        date?: {
            year: number;
            month: number;
            date: number;
        },
        time?: {
            hour: number;
            minute: number;
            isAm: boolean;
        }
    ) => void;
}

function DatePicker({
    setDatePickerOpen,
    handleSetReservationDate,
}: IPropsType) {
    const [pickingInfo, setPickingInfo] = useState<'date' | 'time'>('date');
    const [year, setYear] = useState(2023);
    const [month, setMonth] = useState(11);
    const [date, setDate] = useState(20);

    const [hour, setHour] = useState(2);
    const [minute, setMinute] = useState(0);
    const [isAm, setIsAm] = useState(true);

    const isPickingDate = pickingInfo === 'date';

    function handleChangeButtonClick(order: number, isUp: boolean) {
        if (order === 1) {
            if (isUp) {
                if (isPickingDate)
                    setMonth((prev) => (prev === 12 ? 1 : prev + 1));
                else setHour((prev) => (prev === 11 ? 0 : prev + 1));
            } else if (isPickingDate)
                setMonth((prev) => (prev === 1 ? 12 : prev - 1));
            else setHour((prev) => (prev === 0 ? 11 : prev - 1));
        } else if (order === 2) {
            if (isUp) {
                if (isPickingDate)
                    setDate((prev) => (prev === 31 ? 1 : prev + 1));
                else setMinute((prev) => (prev === 59 ? 0 : prev + 1));
            } else if (isPickingDate)
                setDate((prev) => (prev === 1 ? 31 : prev - 1));
            else setMinute((prev) => (prev === 0 ? 59 : prev - 1));
        } else if (order === 3) {
            if (isUp) {
                if (isPickingDate) setYear((prev) => prev + 1);
                else setIsAm((prev) => !prev);
            } else if (isPickingDate)
                setYear((prev) => (prev === 0 ? 0 : prev - 1));
            else setIsAm((prev) => !prev);
        }
    }

    function handleCancel() {
        handleSetReservationDate();
        setDatePickerOpen(false);
    }
    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        handleSetReservationDate({ year, month, date }, { hour, minute, isAm });
        setDatePickerOpen(false);
    }
    return (
        <div className={styles.container}>
            <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
                <label>
                    <div className={styles.iconWrap}>
                        <CalendarIcon />
                    </div>
                    <input
                        type='text'
                        readOnly
                        onClick={() => setPickingInfo('date')}
                        className={pickingInfo === 'date' ? styles.hit : ''}
                        value={`${month}.${date}.${year}`}
                    />
                </label>
                <label className={styles.timeLabel}>
                    <div className={styles.iconWrap}>
                        <ClockIcon />
                    </div>
                    <input
                        type='text'
                        readOnly
                        onClick={() => setPickingInfo('time')}
                        className={pickingInfo === 'time' ? styles.hit : ''}
                        value={`${hour}:${timeConverter(minute)} ${
                            isAm ? 'AM' : 'PM'
                        }`}
                    />
                </label>
                <div className={styles.setDateWrap}>
                    <div>
                        <button
                            type='button'
                            aria-label='button'
                            onClick={() => handleChangeButtonClick(1, true)}
                        >
                            <UpIcon />
                        </button>
                        <span>
                            {isPickingDate
                                ? timeConverter(month)
                                : timeConverter(hour)}
                        </span>
                        <button
                            type='button'
                            aria-label='button'
                            onClick={() => handleChangeButtonClick(1, false)}
                        >
                            <DownIcon />
                        </button>
                    </div>
                    <div>
                        <button
                            type='button'
                            aria-label='button'
                            onClick={() => handleChangeButtonClick(2, true)}
                        >
                            <UpIcon />
                        </button>
                        <span>
                            {isPickingDate
                                ? timeConverter(date)
                                : timeConverter(minute)}
                        </span>
                        <button
                            type='button'
                            aria-label='button'
                            onClick={() => handleChangeButtonClick(2, false)}
                        >
                            <DownIcon />
                        </button>
                    </div>
                    <div>
                        <button
                            type='button'
                            aria-label='button'
                            onClick={() => handleChangeButtonClick(3, true)}
                        >
                            <UpIcon />
                        </button>
                        <span>{isPickingDate ? year : isAm ? 'AM' : 'PM'}</span>
                        <button
                            type='button'
                            aria-label='button'
                            onClick={() => handleChangeButtonClick(3, false)}
                        >
                            <DownIcon />
                        </button>
                    </div>
                </div>
                <div className={styles.buttonsWrap}>
                    <button
                        className={styles.cancelBtn}
                        type='button'
                        aria-label='cancelBtn'
                        onClick={handleCancel}
                    >
                        <TrashIcon />
                    </button>
                    <button className={styles.submitBtn} type='submit'>
                        Save
                    </button>
                </div>
            </form>
        </div>
    );
}
export default DatePicker;
