import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import dayjs from 'dayjs';
import capitalize from 'lodash/capitalize';
import localeEs from 'dayjs/locale/es';
import isoWeek from 'dayjs/plugin/isoWeek';
import { useLocalSearchParams } from 'expo-router';
import {
  AppointmentForm,
  AppointmentFormSubmit,
} from '../../../src/components/appointment-form';
import { client } from '../../../src/db/client';

dayjs.extend(isoWeek);
dayjs.locale(localeEs);

const getExistingAppointment = (
  appointments: {
    id: number;
    type: string;
    location: string;
    date: string;
  }[],
  day: dayjs.Dayjs,
  time: number
) => {
  const id = day
    .startOf('day')
    .add(time, 'hours')
    .toISOString()
    .replace('.000Z', '');
  return appointments.find((appointment) => appointment.date === id);
};

const Calendar = () => {
  const { id: calendarId } = useLocalSearchParams();
  const [selectedSlot, setSelectedSlot] = useState<{
    day: dayjs.Dayjs;
    time: number;
  } | null>(null);
  const [currentWeek, setCurrentWeek] = useState(dayjs());
  const [appointments, setAppointments] = useState<
    {
      id: number;
      type: string;
      location: string;
      date: string;
    }[]
  >([]);

  const startOfWeek = currentWeek.startOf('isoWeek');
  const startOfWeekISOString = startOfWeek.toISOString();
  const days = Array.from({ length: 7 }, (_, i) => startOfWeek.add(i, 'day'));
  const selectedSlotAppointment = selectedSlot
    ? getExistingAppointment(appointments, selectedSlot.day, selectedSlot.time)
    : undefined;

  const handlePrevWeek = () => {
    setCurrentWeek(currentWeek.subtract(1, 'week'));
  };

  const handleNextWeek = () => {
    setCurrentWeek(currentWeek.add(1, 'week'));
  };

  const handleToday = () => {
    setCurrentWeek(dayjs());
  };

  const handleSquarePress = (day: dayjs.Dayjs, time: number) => {
    setSelectedSlot({ day, time });
  };

  const handleCloseModal = () => {
    setSelectedSlot(null);
  };

  const handleAppointmentSubmit: AppointmentFormSubmit = async (values) => {
    const existingAppointment = selectedSlot
      ? getExistingAppointment(
          appointments,
          selectedSlot.day,
          selectedSlot.time
        )
      : null;

    if (existingAppointment) {
      const { data } = await client
        .from('appointments')
        .update(values)
        .eq('id', existingAppointment.id)
        .select()
        .single();
      setAppointments((prevAppointments) => {
        const nextAppointments = [...prevAppointments];
        const index = nextAppointments.indexOf(existingAppointment);
        nextAppointments[index] = data;
        return nextAppointments;
      });
    } else {
      const newAppointment = {
        ...values,
        calendarId,
        date: selectedSlot?.day
          .startOf('day')
          .add(selectedSlot.time, 'hours')
          .toDate(),
      };

      const { data } = await client
        .from('appointments')
        .insert(newAppointment)
        .select()
        .single();
      setAppointments((prevAppointments) => [...prevAppointments, data]);
    }

    setSelectedSlot(null);
  };

  useEffect(() => {
    const fetchAppointments = async () => {
      const currentStartOfWeek = dayjs(startOfWeekISOString);
      const { data } = await client
        .from('appointments')
        .select('id, date, type, location')
        .eq('calendarId', calendarId)
        .lt('date', currentStartOfWeek.add(1, 'week').toISOString())
        .gte('date', currentStartOfWeek.toISOString());

      setAppointments(data || []);
    };

    fetchAppointments();
  }, [startOfWeekISOString]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.month}>
          {capitalize(currentWeek.format('MMMM YYYY'))}
        </Text>
        <View style={styles.actionsContainer}>
          <TouchableOpacity onPress={handleToday}>
            <Text style={styles.todayButton}>Hoy</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handlePrevWeek}>
            <Icon
              style={styles.navButton}
              name="angle-left"
              size={24}
              color="#fff"
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleNextWeek}>
            <Icon
              style={styles.navButton}
              name="angle-right"
              size={24}
              color="#fff"
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.weekDays}>
        <View style={styles.hourColumn}>
          <Text style={styles.hour} />
        </View>
        {days.map((day) => (
          <Text key={day.format('D')} style={styles.day}>
            {capitalize(day.format('dd'))} {day.format('D')}
          </Text>
        ))}
      </View>
      <View>
        {Array.from({ length: 13 }, (_, i) => i + 8).map((time, rowIndex) => (
          <View key={time} style={styles.row}>
            <View style={styles.hourColumn}>
              <Text style={styles.hour}>{time}:00</Text>
            </View>
            {days.map((day, columnIndex) => {
              const squareStyles: Record<string, unknown>[] = [styles.square];
              const existingAppointment = getExistingAppointment(
                appointments,
                day,
                time
              );

              if (columnIndex === days.length - 1) {
                squareStyles.push(styles.columnBorder);
              }

              if (rowIndex === 12) {
                squareStyles.push(styles.rowBorder);
              }

              if (existingAppointment) {
                squareStyles.push(styles.selectedSquare);
              }

              return (
                <TouchableOpacity
                  key={day.format('D') + time}
                  style={squareStyles}
                  onPress={() => handleSquarePress(day, time)}
                >
                  <Text style={styles.squareText}>
                    {existingAppointment ? 'Cita' : null}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        ))}
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={Boolean(selectedSlot)}
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                {selectedSlot &&
                  `${capitalize(selectedSlot.day.format('dddd DD/MM'))}, ${
                    selectedSlot.time
                  }:00 - ${selectedSlot.time}:59`}
              </Text>
              <Icon name="close" size={24} onPress={handleCloseModal} />
            </View>
            <AppointmentForm
              typeId={selectedSlotAppointment?.type}
              locationId={String(selectedSlotAppointment?.location || '')}
              onSubmit={handleAppointmentSubmit}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  navButton: {
    fontSize: 20,
    color: '#007AFF',
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginLeft: 16,
  },
  month: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#444',
  },
  todayButton: {
    fontSize: 16,
    color: '#007AFF',
    alignSelf: 'center',
    marginVertical: 10,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  calendarContent: {
    flexDirection: 'column',
  },
  weekDays: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 5,
  },
  day: {
    flex: 1,
    textAlign: 'center',
    fontSize: 12,
    color: '#444',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  hourColumn: {
    width: '10%',
  },
  hour: {
    fontSize: 12,
    textAlign: 'center',
    color: '#444',
    margin: -6,
  },
  square: {
    width: '13%',
    height: 60,
    borderLeftWidth: 1,
    borderTopWidth: 1,
    borderColor: '#ddd',
    padding: 4,
  },
  selectedSquare: {
    backgroundColor: '#724ef7',
  },
  squareText: {
    color: '#fff',
  },
  columnBorder: {
    borderRightWidth: 1,
    borderColor: '#ddd',
  },
  rowBorder: {
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#444',
  },
});

export default Calendar;
