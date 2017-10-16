/**
 * @flow
 */
'use strict';

import React from 'react';
import SMColors from '../common/SMColors';
import {
  Text,
  Image,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

export type Question = {
  text: string;
  lowLabel: string;
  highLabel: string;
};

type Props = {
  question: Question;
  rating: ?number;
  onChange: (newRating: number) => void;
  style?: any;
};

function RatingQuestion({question, rating, onChange, style}: Props) {
  const stars = [1, 2, 3, 4, 5].map(
    (value) => (
      <Star
        key={value}
        value={value}
        isFull={rating && value <= rating}
        onPress={() => onChange(value)}
      />
    )
  );
  return (
    <View style={style}>
      <Text style={styles.text}>
        {question.text}
      </Text>
      <View style={styles.stars}>
        {stars}
      </View>
      <View style={styles.labels}>
        <Text style={styles.label}>
          {question.lowLabel}
        </Text>
        <Text style={styles.label}>
          {question.highLabel}
        </Text>
      </View>
    </View>
  );
}

function Star({isFull, value, onPress}) {
  const source = isFull
    ? require('./img/full-star.png')
    : require('./img/empty-star.png');

  const accessibilityTraits = ['button'];
  if (isFull) {
    accessibilityTraits.push('selected');
  }

  return (
    <TouchableOpacity
      accessibilityLabel={`${value} stars`}
      accessibilityTraits={accessibilityTraits}
      style={styles.star}
      activeOpacity={0.8}
      onPress={onPress}>
      <Image source={source} />
    </TouchableOpacity>
  );
}

var styles = StyleSheet.create({
  text: {
    fontSize: 15,
    color: SMColors.darkText,
    textAlign: 'center',
  },
  star: {
    flex: 1,
    padding: 10,
    paddingVertical: 15,
    alignItems: 'center',
  },
  stars: {
    marginHorizontal: -10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  labels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    fontSize: 12,
    color: SMColors.lightText,
  },
});

module.exports = RatingQuestion;
module.exports.__cards__ = (define) => {
  const MOCK_QUESTION = {
    text: 'How likely are you to implement React Native sometime soon?',
    lowLabel: 'Not Likely',
    highLabel: 'Very Likely',
  };
  define('Empty', (state = null, update) => (
    <RatingQuestion
      question={MOCK_QUESTION}
      rating={state}
      onChange={update}
    />
  ));
  define('3 stars', (state = 3, update) => (
    <RatingQuestion
      question={MOCK_QUESTION}
      rating={state}
      onChange={update}
    />
  ));
};
