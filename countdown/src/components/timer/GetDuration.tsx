import { DateTime as LuxonDateTime, DurationObjectUnits } from 'luxon'



export const GetDuration = (target: LuxonDateTime, offsetHours: number = 0, offsetMinutes: number = 0): DurationObjectUnits => {
  const now: LuxonDateTime = LuxonDateTime.now()
  offsetHours = 0;
  offsetMinutes = 0;

  let diff: DurationObjectUnits = target.diff(now, ['days', 'hours', 'minutes', 'seconds']).toObject()

  if (diff.seconds) {
    diff = {...diff, seconds: Math.floor(diff.seconds)};
  }
  

  return (
    diff
  )
}