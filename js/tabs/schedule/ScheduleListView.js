/**
 * @flow
 */
'use strict';

import { StackNavigator } from 'react-navigation';
var SMSessionCell = require('./SMSessionCell');
var FilterSessions = require('./filterSessions');

var React = require('React');
var SessionsSectionHeader = require('./SessionsSectionHeader');
var PureListView = require('../../common/PureListView');
var groupSessions = require('./groupSessions');

import type {Session} from '../../reducers/sessions';
import type {SessionsListData} from './groupSessions';

type Props = {
  day: number;
  sessions: Array<Session>;
  navigator: StackNavigator;
  renderEmptyList?: (day: number) => ReactElement;
};

type State = {
  todaySessions: SessionsListData;
};

class ScheduleListView extends React.Component {
  props: Props;
  state: State;
  _innerRef: ?PureListView;

  constructor(props: Props) {
    super(props);
    this.state = {
      todaySessions: groupSessions(FilterSessions.byDay(props.sessions, props.day)),
    };

    this._innerRef = null;

    (this: any).renderSectionHeader = this.renderSectionHeader.bind(this);
    (this: any).renderRow = this.renderRow.bind(this);
    (this: any).renderEmptyList = this.renderEmptyList.bind(this);
    (this: any).storeInnerRef = this.storeInnerRef.bind(this);
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.sessions !== this.props.sessions ||
        nextProps.day !== this.props.day) {
      this.setState({
        todaySessions: groupSessions(FilterSessions.byDay(nextProps.sessions, nextProps.day)),
      });
    }
  }

  render() {
    return (
      <PureListView
        ref={this.storeInnerRef}
        data={this.state.todaySessions}
        renderRow={this.renderRow}
        renderSectionHeader={this.renderSectionHeader}
        {...(this.props: any /* flow can't guarantee the shape of props */)}
        renderEmptyList={this.renderEmptyList}
      />
    );
  }

  renderSectionHeader(sectionData: any, sectionID: string) {
    return <SessionsSectionHeader title={sectionID} />;
  }

  renderRow(session: Session, day: number) {
    return (
      <SMSessionCell
        onPress={() => this.openSession(session, day)}
        session={session}
      />
    );
  }

  renderEmptyList(): ?ReactElement {
    const {renderEmptyList} = this.props;
    return renderEmptyList && renderEmptyList(this.props.day);
  }

  openSession(session: Session, day: number) {
    this.props.navigation.navigate('allSessions', { 
      day,
      session,
      allSessions: this.state.todaySessions,
    });
  }

  storeInnerRef(ref: ?PureListView) {
    this._innerRef = ref;
  }

  scrollTo(...args: Array<any>) {
    this._innerRef && this._innerRef.scrollTo(...args);
  }

  getScrollResponder(): any {
    return this._innerRef && this._innerRef.getScrollResponder();
  }
}

module.exports = ScheduleListView;
