import dayjs from 'dayjs';
import calendar from 'dayjs/plugin/calendar';
dayjs.extend(calendar);

export function formatLatestMessageDate(date?: Date | string) {
  return dayjs(date).calendar(undefined, {
    lastDay: '[Yesterday]', // The day before ( Yesterday )
    sameDay: 'HH:mm', // The same day ( 17:30 )
    lastWeek: 'dddd', // Last week ( Monday)
    sameElse: 'DD/MM/YYYY', // Everything else ( 17/10/2011 )
  });
}
