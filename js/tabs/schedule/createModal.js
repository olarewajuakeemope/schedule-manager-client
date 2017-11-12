/**
 * @flow
 */
'use strict';

import React from 'React';
import { StackNavigator } from 'react-navigation';
import {
  StyleSheet,
  Image,
  View,
  TextInput,
  TouchableOpacity,
  Switch,
  DatePickerAndroid,
  Platform,
  ScrollView,
} from 'react-native';
import { connect } from 'react-redux';
import SMDatePicker from '../../common/SMDatePicker';
import SMColors from '../../common/SMColors';
import { Text } from '../../common/SMText';
import SMButton from '../../common/SMButton';
import { createSchedule } from '../../actions';

const initialState = {
  caption: '',
  loading: false,
  datePicker: {
    open: false,
    title: '',
    closeButton: null,
  },
  day: null,
  allDay: null,
  title: '',
  description: '',
  slug: '',
  speakers: '',
  onMySchedule: true,
  tags: '',
  date: new Date(),
  startTime: null,
  endTime: null,
  map: '',
  location: '',
}

class CreateModal extends React.Component {
  props: {
    navigator: StackNavigator;
    onLogin: () => void;
  };

  state = initialState;

  componentWillMount() {
    const { day } = this.props.navigation.state.params;
    if (day === 1) {
      this.setState({
        caption: 'Create New Public Schedule',
        day: 1,
      });
    } else if (day === 2) {
      this.setState({
        caption: 'Create New Shared Schedule',
        day: 2,
      });
    } else if (day === 3) {
      this.setState({
        caption: 'Create New Private Schedule',
        day: 3,
      });
    }
  }

  androidDatePicker = async (dateTitle) => {
    try {
      const { action, year, month, day } = await DatePickerAndroid.open({
        date: new Date()
      });
      if (action !== DatePickerAndroid.dismissedAction) {
        this.setState({
          date: {
            day,
            month,
            year,
          },
        });
      }
    } catch ({ code, message }) {
      console.warn('Cannot open date picker', message);
      alert(message);
    }
    this.androidSelectedDate(dateTitle);
  }

  handleDatePicker = (dateTitle) => {
    if (Platform.OS === 'android') {
      return this.androidDatePicker(dateTitle);
    }
    const { open } = this.state.datePicker;
    this.setState({
      datePicker: {
        open: !open,
        title: dateTitle,
        closeButton: (
          <SMButton
            type="secondary"
            caption="Done"
            onPress={() => this.handleDatePicker()}
          />
        )
      }
    });
  }

  iosSelectedDate = (date) => {
    const { title } = this.state.datePicker;
    this.setState({
      date,
    });
    if (title === 'End time') {
      this.setState({
        endTime: date.toDateString(),
      });
    } else {
      this.setState({
        startTime: date.toDateString(),
      });
    }  
  }

  androidSelectedDate = (clickedButton) => {
    const { day, month, year } = this.state.date;
    if (clickedButton === 'End time') {
      this.setState({
        endTime: `${year}-${month}-${day}`,
      });
    } else {
      this.setState({
        startTime: `${year}-${month}-${day}`,
      });
    }
  }

  submit = async () => {
    const { dispatch } = this.props;
    this.setState({
      loading: true,
    });
    try {
      await Promise.race([
        dispatch(createSchedule(this.state)),
        timeout(15000),
      ]);
      alert('Schedule successfully created');
      this.setState(initialState);
    } catch (e) {
      const message = e.message || e;
      if (message !== 'Timed out' && message !== 'Canceled by user') {
        alert(message);
        console.warn(e);
      } else {
        alert('Cannot connect to server.\nPlease check your network connection');
      }
      return;
    } finally {
      this.setState({ loading: false });
    }
  }

  render() {
    const {
      caption,
      loading,
      datePicker,
      allDay,
      title,
      description,
      slug,
      speakers,
      tags,
      date,
      startTime,
      endTime,
      map,
      location,
    } = this.state;

    let renderTimer;
    if (!allDay) {
      renderTimer = (
        <View>
          <SMButton
            type="bordered"
            caption={startTime || 'Start time'}
            onPress={() => this.handleDatePicker('Start time')}
            style={styles.dateButton}
          />
          <SMButton
            type="bordered"
            caption={endTime || 'End time'}
            onPress={() => this.handleDatePicker('End time')}
            style={styles.dateButton}
          />
        </View>
      );
    }

    if (datePicker.open) {
      const { closeButton } = datePicker;
      return (
        <SMDatePicker
          closeButton={closeButton}
          title={datePicker.title}
          selectedDate={this.iosSelectedDate}
          date={date}
        />
      );
    }

    const submitButton = loading ?
      <SMButton
        caption="Please Wait..."
        style={{ marginTop: 30 }}
        onPress={() => {}}
      /> :
      <SMButton
        caption="Create Schedule"
        style={{ marginTop: 30 }}
        onPress={() => this.submit()}
    />;

    return (
      <ScrollView>
        <View style={styles.container}>
          <TouchableOpacity
            accessibilityLabel="Cancel"
            accessibilityTraits="button"
            style={styles.skip}
            onPress={() => this.props.navigation.goBack()}
          >
            <Image
              source={require('../../login/img/x.png')}
            />
          </TouchableOpacity>
          <Image
            style={styles.titleBg}
            source={require('../../login/img/login-background.png')}
          >
            <Text style={styles.h1}>
              {caption}
            </Text>
          </Image>
          <View style={styles.inputContainer}>
            <TextInput
              value={title}
              style={styles.input}
              placeholder="Schedule Title"
              onChangeText={text => this.setState({ title: text })}
            />
            <TextInput
              value={description}
              style={styles.input}
              autoCapitalize="none"
              placeholder="Description"
              onChangeText={text => this.setState({ description: text })}
            />
            <TextInput
              value={slug}
              style={styles.input}
              placeholder="Short Description"
              onChangeText={text => this.setState({ slug: text })}
            />
            <TextInput
              value={location}
              style={styles.input}
              placeholder="Location"
              onChangeText={text => this.setState({ location: text })}
            />
            <TextInput
              value={tags}
              style={styles.input}
              autoCapitalize="none"
              placeholder="Enter tags seperated commas"
              onChangeText={text => this.setState({ tags: text })}
            />
            <View style={styles.switchWrapper}>
              <Text style={styles.text}>
                All Day Schedule?
              </Text>
              <Switch
                accessibilityLabel="Scheduled for everyday?"
                style={styles.switch}
                value={allDay}
                onValueChange={enabled => this.setState({ allDay: enabled })}
                onTintColor="#00E3AD"
              />
            </View>
            {renderTimer}
          </View>
          {submitButton}
        </View>
      </ScrollView>
    );
  }
}

async function timeout(ms: number): Promise {
  return new Promise((resolve, reject) => {
    setTimeout(() => reject(new Error('Timed out')), ms);
  });
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(255, 255, 255)',
    justifyContent: 'center',
    padding: 20,
  },
  inputContainer: {
    paddingTop: 100,
    textAlign: 'left',
    alignItems: 'flex-start',
    width: 270,
  },
  input: {
    marginTop: 30,
    height: 40,
    width: 270,
  },
  switchWrapper: {
    marginTop: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },
  switch: {
    margin: 10,
  },
  content: {
    padding: 30,
    backgroundColor: 'transparent',
    borderRadius: 3,
    alignItems: 'center',
    // Image's source contains explicit size, but we want
    // it to prefer flex: 1
    width: undefined,
    height: undefined,
  },
  skip: {
    position: 'absolute',
    right: 0,
    top: 20,
    padding: 15,
    zIndex: 2,
  },
  titleBg: {
    position: 'absolute',
    right: 0,
    top: 20,
    padding: 15,
  },
  h1: {
    fontSize: 22,
    fontWeight: 'bold',
    color: SMColors.darkText,
    textAlign: 'center',
    marginTop: 20,
  },
  h2: {
    fontSize: 18,
    lineHeight: 22,
    color: SMColors.darkText,
    textAlign: 'center',
    marginBottom: 20,
  },
  h3: {
    fontSize: 18,
    lineHeight: 22,
    color: SMColors.darkText,
    marginTop: 20,
    textAlign: 'center',
  },
  text: {
    fontSize: 20,
    color: 'rgb(199, 199, 205)',
    textAlign: 'center',
  },
  dateButton: {
    height: 40,
    width: 200,
    marginTop: 30
  }
});

module.exports = connect()(CreateModal);
