import { DateTime as LuxonDateTime, DurationObjectUnits } from 'luxon'



export const GetDuration = (target: LuxonDateTime): DurationObjectUnits => {
  const now: LuxonDateTime = LuxonDateTime.now().toUTC();


  let diff: DurationObjectUnits = target.diff(now, ['days', 'hours', 'minutes', 'seconds']).toObject()

  if (diff.seconds) {
    diff = {...diff, seconds: Math.floor(diff.seconds)};
  }
  

  return (
    diff
  )
}