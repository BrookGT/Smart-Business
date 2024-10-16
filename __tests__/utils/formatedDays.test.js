import moment from 'moment';
import {
  CurrentDatee,
  currentDate,
  nextday,
  today,
  todayTime,
  tomorrow,
} from '../../src/utils/formatedDays';

describe('formatedDays', () => {
  it('exports consistent moment-based values', () => {
    expect(currentDate).toMatch(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/);
    expect(nextday).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    expect(today).toBe(moment(currentDate).format('dddd'));
    expect(tomorrow).toBe(moment(nextday).format('dddd'));
    expect(CurrentDatee).toBe(moment().format());
    expect(todayTime).toBe(moment(CurrentDatee).format('HH:mm'));
  });
});
