import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import dayjs from 'dayjs';
import capitalize from 'lodash/capitalize';
import localeEs from 'dayjs/locale/es';
import isoWeek from 'dayjs/plugin/isoWeek';

dayjs.extend(isoWeek);
dayjs.locale(localeEs);

export const CalendarUI = () => {
  const [currentWeek, setCurrentWeek] = useState(dayjs());

  const startOfWeek = currentWeek.startOf('isoWeek');
  const days = Array.from({ length: 7 }, (_, i) => startOfWeek.add(i, 'day'));

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
    console.log(`Pressed ${day.format('YYYY-MM-DD')} at ${time}:00`);
  };

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
              if (columnIndex === days.length - 1) {
                squareStyles.push(styles.columnBorder);
              }

              if (rowIndex === 12) {
                squareStyles.push(styles.rowBorder);
              }

              return (
                <TouchableOpacity
                  key={day.format('D') + time}
                  style={squareStyles}
                  onPress={() => handleSquarePress(day, time)}
                />
              );
            })}
          </View>
        ))}
      </View>
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
    margin: -6
  },
  square: {
    width: '13%',
    height: 60,
    borderLeftWidth: 1,
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  columnBorder: {
    borderRightWidth: 1,
    borderColor: '#ddd',
  },
  rowBorder: {
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
});
