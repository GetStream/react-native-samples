import moment from 'moment'
import {isEmpty} from 'lodash'

export const parseDurationTextToMs = (durationText: string): number => {
  if (isEmpty(durationText)) return 0

  const ss = durationText?.slice(3, 5)
  const mm = durationText?.slice(0, 2)
  return moment
    .duration(ss, 'seconds')
    .add(moment.duration(mm, 'minutes'))
    .asMilliseconds()
}
