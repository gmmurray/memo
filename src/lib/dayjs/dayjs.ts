import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

export const formatSecondsDuration = (seconds: number) =>
  dayjs.duration(seconds * 1000).format('mm:ss');
