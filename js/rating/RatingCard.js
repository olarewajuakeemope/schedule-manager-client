/**
 * @flow
 */
'use strict';

import React from 'react';
import {
  View,
  ScrollView,
} from 'react-native';
const StyleSheet = require('../common/SMStyleSheet');
import Header from './Header';
import RatingQuestion from './RatingQuestion';
import SMButton from '../common/SMButton';

import type {Question} from '../reducers/surveys';
import type {Session} from '../reducers/sessions';

type Props = {
  session: Session;
  questions: Array<Question>;
  onSubmit: (answers: Array<number>) => void;
  style?: any;
};

class RatingCard extends React.Component {
  props: Props;
  state: Object;

  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  render() {
    const questions = this.props.questions.map((question, ii) => (
      <RatingQuestion
        key={ii}
        style={styles.question}
        question={question}
        rating={this.state[ii]}
        onChange={(rating) => this.setState({[ii]: rating})}
      />
    ));
    const completed = Object.keys(this.state).length === this.props.questions.length;
    return (
      <View style={[styles.container, this.props.style]}>
        <ScrollView>
          <Header session={this.props.session} />
          {questions}
        </ScrollView>
        <SMButton
          style={styles.button}
          type={completed ? 'primary' : 'bordered'}
          caption="Submit Review"
          onPress={() => completed && this.submit()}
        />
      </View>
    );
  }

  submit() {
    const answers = this.props.questions.map((_, ii) => this.state[ii]);
    this.props.onSubmit(answers);
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  question: {
    padding: 40,
    paddingVertical: 25,
  },
  button: {
    marginHorizontal: 15,
    marginVertical: 20,
  }
});

module.exports = RatingCard;
