import Header from '../../components/Header/Header';
import { useAppSelector } from '../../store/store';
import styles from './Main.module.scss';

import Reservation from '../../components/Reservation/Reservation';

function Main() {
    const reservationData = useAppSelector((state) => state.reservation);
    return (
        <>
            <Header title='Reservation' />
            <div className={styles.container}>
                <section className={styles.reservationListArea}>
                    <ul>
                        {Object.keys(reservationData)
                            .filter(
                                (key) => reservationData[Number(key)].isShowing
                            )
                            .map((key) => {
                                const KEY = Number(key);
                                const DATA = reservationData[KEY];
                                return (
                                    <li key={KEY}>
                                        <Reservation
                                            reservationKey={KEY}
                                            data={DATA}
                                        />
                                    </li>
                                );
                            })}
                    </ul>
                </section>
            </div>
        </>
    );
}
export default Main;
