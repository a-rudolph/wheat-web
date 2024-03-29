import _isUndefined from 'lodash/isUndefined'

export default function formatTime(n: number): string {
  const h = Math.floor(n)
  const d = n - h
  const m = d * 60

  const min = m < 10 ? `0${m}` : `${m}`

  if (h === 0) return `${min}min`

  return `${h}h ${min}m`
}

export const normalizeTimeValue = (value: TimeValue): Required<TimeValue> => {
  return {
    hh: padNumber(value.hh || '00'),
    mm: padNumber(value.mm || '00'),
    ss: padNumber(value.ss || '00'),
  }
}

/**
 * give me time, I give you seconds
 * @param timeValue TimeValue
 * @returns Seconds
 */
export const timeToSeconds = ({
  hh = 0,
  mm = 0,
  ss = 0,
}: TimeValue): number => {
  return Number(hh) * 60 * 60 + Number(mm) * 60 + Number(ss)
}

export const sumTime = (...args: TimeValue[]) => {
  return args.reduce(addTime, {})
}

export const addTime = (t1: TimeValue, t2: TimeValue) => {
  const s1 = timeToSeconds(t1)
  const s2 = timeToSeconds(t2)

  return secondsToTime(s1 + s2)
}

export const secondsToTime = (seconds: number = 0) => {
  const hh = Math.floor(seconds / 3600)
  const rem = seconds - hh * 3600

  const mm = Math.floor(rem / 60)

  const ss = rem - mm * 60

  const ret = {
    hh: padNumber(hh),
    mm: padNumber(mm),
    ss: padNumber(ss),
  }

  return ret
}

export const dateToTime = (date: Date) => {
  return {
    hh: padNumber(date.getHours()),
    mm: padNumber(date.getMinutes()),
    ss: padNumber(date.getSeconds()),
  }
}

export const getTimeToEndTime = (endTime: number | null): TimeValue => {
  const secondsLeft = getSecondsToEndTime(endTime)

  return secondsToTime(secondsLeft)
}

export const getNow = () => {
  return new Date().getTime()
}

/**
 * Give me seconds, I give you end time unix
 * @param seconds
 * @returns unix
 */
export const getEndTime = (seconds: number): number => {
  const now = getNow()

  return now + seconds * 1000
}

export const getSecondsToEndTime = (end: number | null) => {
  if (!end) return 0

  const now = getNow()

  return Math.ceil((end - now) / 1000)
}

export const padNumber = (n?: number | string) => {
  if (_isUndefined(n)) return '00'

  const s = String(n)

  if (s.length < 2) return `0${s}`

  return s
}
