import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import styles from './PostReservation.module.scss';
import { ReactComponent as CalendarIcon } from '../../assets/event_available.svg';
import { ReactComponent as PlusIcon } from '../../assets/math-plus.svg';
import { ReactComponent as MinusIcon } from '../../assets/math-minus.svg';
import { ReactComponent as DropDownIcon } from '../../assets/arrow_drop_down.svg';
import { ReactComponent as CloseIcon } from '../../assets/close.svg';
import DatePicker from '../../components/DatePicker/DatePicker';
import { timeConverter } from '../../common/timeConverter';
import tableData from '../../common/tableData.json';
import { useAppDispatch } from '../../store/store';
import { postReservation } from '../../store/reservationSlice';
import getToday from '../../common/getToday';

function PostReservation() {
    const { state } = useLocation();
    console.log(state);

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const today = getToday();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        getValues,
        setValue,
        trigger,
    } = useForm<{
        name: string;
        phone: string;
        date: undefined | { year: number; month: number; date: number };
        time: undefined | { hour: number; minute: number; isAm: boolean };
        headCounter: number;
        tableList: { [key: string]: { floor: number; table: number } };
        note: string;
    }>({
        defaultValues: {
            name: state?.name || '',
            phone: state?.phone || '',
            date: state?.date || undefined,
            time: state?.time || undefined,
            headCounter: state?.headCounter || 1,
            tableList: state?.tableList || {},
            note: state?.note || '',
        },
    });
    const [tableListOpen, setTableListOpen] = useState(false);
    function handleSetReservationDate(
        date?: { year: number; month: number; date: number },
        time?: { hour: number; minute: number; isAm: boolean }
    ) {
        if (date)
            setValue('date', {
                year: date.year,
                month: date.month,
                date: date.date,
            });
        if (time)
            setValue('time', {
                hour: time.hour,
                minute: time.minute,
                isAm: time.isAm,
            });
        if (!date && !time) {
            setValue('date', undefined);
            setValue('time', undefined);
        }
        trigger('date');
        trigger('time');
    }
    const [datePickerOpen, setDatePickerOpen] = useState(false);

    function onSubmit() {
        dispatch(
            postReservation({
                id: state?.reservationKey || new Date().getTime(),
                name: getValues('name'),
                phone: getValues('phone'),
                date: getValues('date'),
                time: getValues('time'),
                headCounter: getValues('headCounter'),
                tableList: getValues('tableList'),
                note: getValues('note'),
            })
        );
        navigate('/');
    }
    return (
        <>
            <Header title={state ? 'Edit Reservation' : 'New Reservation'} />
            <div className={styles.container}>
                <form
                    className={styles.reservationForm}
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <div className={styles.firstLine}>
                        <label className={styles.label}>
                            {getValues('name') === '' && (
                                <span className={styles.placeholder}>Name</span>
                            )}
                            <input
                                type='text'
                                {...register('name', {
                                    required: 'name is required',
                                })}
                            />
                            {errors.name && (
                                <span className={styles.errorMessage}>
                                    {errors.name.message}
                                </span>
                            )}
                        </label>
                        <label className={styles.label}>
                            {getValues('phone') === '' && (
                                <span className={styles.placeholder}>
                                    Phone
                                </span>
                            )}
                            <input
                                type='text'
                                {...register('phone', {
                                    required: 'phone is required',
                                })}
                            />
                            {errors.phone && (
                                <span className={styles.errorMessage}>
                                    {errors.phone.message}
                                </span>
                            )}
                        </label>
                        <button
                            type='button'
                            onClick={() => setDatePickerOpen(true)}
                            {...register('date', {
                                required:
                                    'reservation date and time is required.',
                            })}
                            // {...register('time', {
                            //     required:
                            //         'reservation date and time is required.',
                            // })}
                        >
                            <CalendarIcon />
                            <span className={styles.selectedDateInfo}>
                                {getValues('date') && getValues('time')
                                    ? `
                                    ${
                                        today.year === getValues('date.year') &&
                                        today.month ===
                                            getValues('date.month') &&
                                        today.date === getValues('date.date')
                                            ? 'Today'
                                            : `${timeConverter(
                                                  getValues('date.month')
                                              )}/${timeConverter(
                                                  getValues('date.date')
                                              )}/${getValues('date.year')}`
                                    },
                                    ${timeConverter(
                                        getValues('time.hour')
                                    )}:${timeConverter(
                                        getValues('time.minute')
                                    )} ${getValues('time.isAm') ? 'AM' : 'PM'}`
                                    : 'Select Date'}
                            </span>
                            {(errors.date || errors.time) && (
                                <span className={styles.errorMessage}>
                                    {errors.date?.message ||
                                        errors.time?.message}
                                </span>
                            )}
                        </button>
                    </div>
                    <div className={styles.secondLine}>
                        <div className={styles.headCountWrap}>
                            <span>Guests</span>
                            <div className={styles.counter}>
                                <button
                                    type='button'
                                    onClick={() => {
                                        setValue(
                                            'headCounter',
                                            getValues('headCounter') - 1 || 1
                                        );
                                    }}
                                    aria-label='headCountPlusBtn'
                                >
                                    <MinusIcon />
                                </button>
                                <span>{watch().headCounter}</span>
                                <button
                                    type='button'
                                    onClick={() => {
                                        setValue(
                                            'headCounter',
                                            getValues('headCounter') + 1
                                        );
                                    }}
                                    aria-label='headCountMinusBtn'
                                >
                                    <PlusIcon />
                                </button>
                            </div>
                        </div>
                        <div
                            className={`${styles.selectedTableWrap} ${
                                tableListOpen ? styles.opened : ''
                            }`}
                            onClick={() => setTableListOpen((prev) => !prev)}
                        >
                            {!Object.keys(getValues('tableList')).length ? (
                                <span>Select table</span>
                            ) : (
                                <ul className={styles.selectedTableList}>
                                    {Object.keys(getValues('tableList')).map(
                                        (tableInfo) => {
                                            const FLOOR =
                                                getValues('tableList')[
                                                    tableInfo
                                                ].floor;
                                            const TABLE =
                                                getValues('tableList')[
                                                    tableInfo
                                                ].table;
                                            return (
                                                <li key={`${tableInfo}`}>
                                                    <span>
                                                        TABLE {TABLE} · FLOOR{' '}
                                                        {FLOOR}
                                                    </span>
                                                    <button
                                                        type='button'
                                                        aria-label='deleteTableButton'
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setValue(
                                                                'tableList',
                                                                (() => {
                                                                    const tables =
                                                                        {
                                                                            ...getValues(
                                                                                'tableList'
                                                                            ),
                                                                        };
                                                                    delete tables[
                                                                        tableInfo
                                                                    ];
                                                                    return {
                                                                        ...tables,
                                                                    };
                                                                })()
                                                            );
                                                        }}
                                                    >
                                                        <CloseIcon />
                                                    </button>
                                                </li>
                                            );
                                        }
                                    )}
                                </ul>
                            )}
                            <DropDownIcon />
                            {tableListOpen && (
                                <ul className={styles.tableLists}>
                                    {tableData.map((tableInfo, idx) => {
                                        const key = `${tableInfo.floor}-${tableInfo.table}`;
                                        const selectedTableList = Object.keys(
                                            getValues('tableList')
                                        );
                                        return (
                                            <li
                                                key={idx}
                                                className={
                                                    selectedTableList.includes(
                                                        key
                                                    )
                                                        ? styles.hit
                                                        : ''
                                                }
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    if (
                                                        selectedTableList.includes(
                                                            key
                                                        )
                                                    )
                                                        setValue(
                                                            'tableList',
                                                            (() => {
                                                                const value = {
                                                                    ...getValues(
                                                                        'tableList'
                                                                    ),
                                                                };
                                                                delete value[
                                                                    key
                                                                ];
                                                                return value;
                                                            })()
                                                        );
                                                    else
                                                        setValue('tableList', {
                                                            ...getValues(
                                                                'tableList'
                                                            ),
                                                            [key]: {
                                                                floor: tableInfo.floor,
                                                                table: tableInfo.table,
                                                            },
                                                        });
                                                }}
                                            >
                                                Floor {tableInfo.floor} / Table{' '}
                                                {tableInfo.table}
                                            </li>
                                        );
                                    })}
                                </ul>
                            )}
                        </div>
                    </div>
                    <div className={styles.noteWrap}>
                        <textarea
                            className={styles.note}
                            {...register('note')}
                        />
                        <p
                            className={
                                !getValues('note') ? styles.placeholder : ''
                            }
                            dangerouslySetInnerHTML={{
                                __html: `${
                                    getValues('note').replace(/ /g, '&nbsp;') ||
                                    'Add Note...'
                                }`,
                            }}
                        />
                    </div>
                    <button
                        type='submit'
                        className={`${styles.submitBtn} ${
                            !Object.keys(errors).length ? styles.hit : ''
                        }`}
                    >
                        Save
                    </button>
                </form>
                {datePickerOpen && (
                    <DatePicker
                        propsDate={
                            getValues('date') && {
                                year: getValues('date.year'),
                                month: getValues('date.month'),
                                date: getValues('date.date'),
                            }
                        }
                        propsTime={
                            getValues('time') && {
                                hour: getValues('time.hour'),
                                minute: getValues('time.minute'),
                                isAm: getValues('time.isAm'),
                            }
                        }
                        setDatePickerOpen={setDatePickerOpen}
                        handleSetReservationDate={handleSetReservationDate}
                    />
                )}
            </div>
        </>
    );
}
export default PostReservation;
