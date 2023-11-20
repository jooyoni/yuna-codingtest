import { useNavigate } from 'react-router-dom';
import getToday from '../../common/getToday';
import styles from './Reservation.module.scss';
import { ReactComponent as PhoneIcon } from '../../assets/phone.svg';
import { ReactComponent as CalendarIcon } from '../../assets/event_available.svg';
import { ReactComponent as GroupIcon } from '../../assets/group.svg';
import { ReactComponent as EditIcon } from '../../assets/edit.svg';
import { ReactComponent as TrashIcon } from '../../assets/trash.svg';
import { timeConverter } from '../../common/timeConverter';
import { useAppDispatch } from '../../store/store';
import {
    deleteReservation,
    hideReservation,
} from '../../store/reservationSlice';

interface IPropsType {
    reservationKey: number;
    data: {
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
function Reservation({ reservationKey, data }: IPropsType) {
    const today = getToday();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    function handleDelete() {
        dispatch(deleteReservation({ reservationKey }));
    }
    function handleHide() {
        dispatch(hideReservation({ reservationKey }));
    }
    return (
        <article
            className={styles.reservation}
            onClick={() =>
                navigate('/edit-reservation', {
                    state: {
                        reservationKey,
                        ...data,
                    },
                })
            }
        >
            <div className={styles.reservatorInfoWrap}>
                <span>{data.name}</span>
                <div>
                    <PhoneIcon />
                    <span>{data.phone}</span>
                </div>
            </div>
            <div className={styles.reservationDate}>
                <CalendarIcon />
                <span>{`
                ${
                    today.year === data?.date?.year &&
                    today.month === data.date.month &&
                    today.date === data.date.date
                        ? 'Today'
                        : `${data?.date?.month}/${data?.date?.date}/${data?.date?.year}`
                }
            , ${data?.time?.hour}:${timeConverter(data?.time?.minute || 0)} ${
                data?.time?.isAm ? 'AM' : 'PM'
            }`}</span>
            </div>
            <div className={styles.headCount}>
                <GroupIcon />
                <span>{data.headCounter}</span>
            </div>
            <div className={styles.reservedTableInfo}>
                {(() => {
                    const FLOOR: Set<number> = new Set();
                    Object.keys(data.tableList).map((key) => {
                        FLOOR.add(data.tableList[key].floor);
                    });
                    const FLOORARRAY = Array.from(FLOOR);
                    return FLOORARRAY.length ? (
                        FLOORARRAY.map((floor) => {
                            const TABLES = Object.values(data.tableList)
                                .filter((val) => val!.floor! === floor)
                                .map((val) => val.table);
                            return (
                                <li key={floor}>
                                    Reserved Table{' '}
                                    <strong>
                                        {TABLES.sort((a, b) => a - b).join(',')}
                                    </strong>{' '}
                                    · Floor {floor}
                                </li>
                            );
                        })
                    ) : (
                        <span className={styles.noTable}>
                            No Selected Table
                        </span>
                    );
                })()}
            </div>
            <div className={styles.note}>
                <span>{data.note}</span>
                {data.note && <EditIcon />}
            </div>
            <div className={styles.buttonsWrap}>
                <button
                    type='button'
                    aria-label='delete'
                    onClick={(e) => {
                        e.stopPropagation();
                        handleDelete();
                    }}
                >
                    <TrashIcon />
                </button>
                <button
                    type='button'
                    onClick={(e) => {
                        e.stopPropagation();
                        handleHide();
                    }}
                >
                    Seated
                </button>
            </div>
        </article>
    );
}
export default Reservation;
