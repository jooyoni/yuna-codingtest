import { useLocation, useNavigate } from 'react-router-dom';
import styles from './Header.module.scss';
import { ReactComponent as MathPlusIcon } from '../../assets/math-plus.svg';
import { ReactComponent as CloseIcon } from '../../assets/close.svg';
import { ReactComponent as BackSpaceIcon } from '../../assets/keyboard_backspace.svg';

interface IPropsType {
    title: string;
}
function Header({ title }: IPropsType) {
    const navigate = useNavigate();
    const location = useLocation();
    return (
        <header className={styles.header}>
            {location.pathname === '/' ? (
                <button
                    className={styles.createReservationBtn}
                    type='button'
                    onClick={() => navigate('/new-reservation')}
                >
                    <MathPlusIcon />
                    <span>New Reservation</span>
                </button>
            ) : (
                <button
                    className={styles.backBtn}
                    type='button'
                    onClick={() => navigate('/')}
                    aria-label='backBtn'
                >
                    <BackSpaceIcon />
                </button>
            )}
            <h3>{title}</h3>
            <CloseIcon className={styles.closeBtn} />
        </header>
    );
}
export default Header;
