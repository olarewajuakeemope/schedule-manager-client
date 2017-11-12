/**
 * @flow
 */


import React from 'React';
import {
  StyleSheet,
  View,
  Text,
  DatePickerIOS,
} from 'react-native';
import SMColors from './SMColors';

class SMDatePicker extends React.Component {

  renderDatePicker = () => {
    const { selectedDate, date } = this.props;
    return (
        <DatePickerIOS
          date={date}
          mode="datetime"
          onDateChange={selectedDate}
          minuteInterval={10}
        />
    );
  }
  render() {
    const { title, closeButton } = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.h1}>
          {title}
        </Text>
        {this.renderDatePicker()}
        {closeButton}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    padding: 20,
  },
  h1: {
    fontSize: 22,
    fontWeight: 'bold',
    color: SMColors.darkText,
    textAlign: 'center',
    marginTop: 20,
  },
});

module.exports = SMDatePicker;
