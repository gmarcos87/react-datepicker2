import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { persianNumber } from '../utils/persian';
import { leftArrow, rightArrow } from '../utils/assets';

export default class Heading extends Component {
  static propTypes = {
    month: PropTypes.object.isRequired,
    isGregorian: PropTypes.bool
  };

  static contextTypes = {
    styles: PropTypes.object,
    nextMonth: PropTypes.func.isRequired,
    prevMonth: PropTypes.func.isRequired,
    setCalendarMode: PropTypes.func.isRequired
  };

  handleMonthClick(event) {
    const { setCalendarMode } = this.context;
    event.preventDefault();
    setCalendarMode('monthSelector');
  }

  render() {
    const { nextMonth, prevMonth } = this.context;
    const { month, styles } = this.props;

    return (
      <div className={styles.heading}>
        {this.props.timePicker}
        {!this.props.isGregorian && (
          <React.Fragment>
            <button
              type="button"
              title="ماه قبل"
              className={styles.prev}
              onClick={prevMonth}
              dangerouslySetInnerHTML={rightArrow}
            />
            <button className={styles.title} onClick={this.handleMonthClick.bind(this)}>
              <span>
                {persianNumber(month.locale('fa').format('jMMMM jYYYY'))}
              </span>
              <span className={styles.subtitle}>
                {month.locale('en').format('MMMM YYYY')}
              </span>
            </button>
            <button
              type="button"
              title="ماه بعد"
              className={styles.next}
              onClick={nextMonth}
              dangerouslySetInnerHTML={leftArrow}
            />
          </React.Fragment>
        )}
        {this.props.isGregorian && (
          <React.Fragment>
            <button
              type="button"
              title="previous month"
              className={styles.next}
              onClick={prevMonth}
              dangerouslySetInnerHTML={leftArrow}
            />
            <button className={styles.title} onClick={this.handleMonthClick.bind(this)}>
              <span>
                {month.locale('en').format('MMMM YYYY')}
              </span>
              <small>
                {persianNumber(month.locale('fa').format('jMMMM jYYYY'))}
              </small>
            </button>
            <button
              type="button"
              title="next month"
              className={styles.prev}
              onClick={nextMonth}
              dangerouslySetInnerHTML={rightArrow}
            />
          </React.Fragment>
        )}
      </div>
    );
  }
}
