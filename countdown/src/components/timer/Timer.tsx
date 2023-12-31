import { useEffect, useState, useMemo, useRef } from 'react'
import './Timer.css'
import { GetDuration } from './GetDuration.tsx';
import { DurationObjectUnits } from 'luxon'

import { useNavigate, useParams } from 'react-router-dom';
import { countdownData } from '../../assets/countdownData.tsx';
import { DateTime as LuxonDateTime } from 'luxon';




const getLabels = (days: number, hours: number, minutes: number, seconds: number) => {
  let dayLabel = 'Day'
  let hourLabel = 'Hour'
  let minuteLabel = 'Minute'
  let secondLabel = 'Second'

  if (days === 0 || days! > 1) {
    dayLabel = `${dayLabel}s`
  }
  if (hours === 0 || hours! > 1) {
    hourLabel = `${hourLabel}s`
  } 
  if (minutes === 0 || minutes! > 1) {
    minuteLabel = `${minuteLabel}s`
  } 
  if (seconds === 0 || seconds! > 1) {
    secondLabel = `${secondLabel}s`
  } 
  

  return (
    {
      day: dayLabel,
      hour: hourLabel,
      minute: minuteLabel,
      second: secondLabel
    }
  )
}





interface ILabels {
  day: string,
  hour: string,
  minute: string,
  second: string
}





let noDataClass = ''

const getTarget = (urlId?: string): LuxonDateTime | undefined => {
  if (!urlId) return;
  const target: string | undefined | null = countdownData.find(i => i.urlName === urlId)?.target

  if (target) {
    try {
      return LuxonDateTime.fromISO(target, {zone: 'utc'})
    } catch {

      return undefined;
    }
  }
}

const getTargetDateTimeLabel = (target: LuxonDateTime | undefined): string | undefined => {
  if (!target) return;
  return `${target?.toFormat("cccc',' d LLLL y 'at' HH:mm '(UTC'ZZ')'")}`;
}

const getDocTitle = (urlId: string | undefined): string => {
  let docTitle: string = 'Unknown Countdown';
  if (!urlId) return docTitle;
  try {
    const displayName: string | undefined = countdownData.find(i => i.urlName ===urlId)?.displayNameShort;
    if (displayName) {
      docTitle = `${displayName} Countdown`;
    } 
  } catch {
    return docTitle;
  } finally {
    return docTitle;
  }
  return docTitle;
}

const setDocTitle = (docTitle: string): void => {
  try {
    document.title = docTitle
  } catch {
    document.title = 'Unknown Countdown'
  }
}


export const Timer = () => {
  const [labels, setLabels] = useState<ILabels>();
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  const refCount = useRef(0); refCount.current++
  const navigate = useNavigate();
  const { id } = useParams(); //fkn amazing, it took so long, always read docs
  const urlId = id?.toLowerCase()
 



  const target: LuxonDateTime | undefined = useMemo(() => getTarget(urlId), [urlId]);

  let targetDateTimeLabel: string | undefined = useMemo(() => getTargetDateTimeLabel(target), [target]);
  const docTitle: string = useMemo(() => getDocTitle(urlId), [urlId]);

  
 

  useEffect(() => {
    if (refCount.current >= 2) return;
    setDocTitle(docTitle);
    
  },[])


  const setTimes = (target: LuxonDateTime) => {
    if (!target) return;
    const durations: DurationObjectUnits = GetDuration(target);
    setDays(durations.days!);
    setHours(durations.hours!);
    setMinutes(durations.minutes!);
    setSeconds(durations.seconds!);
    setLabels(getLabels(days, hours, minutes, seconds));
  }

  useEffect(() => {
    if (!target) return;
    const interval = setInterval(() => setTimes(target), 200);
    return () => clearInterval(interval);
  }, []);

  //(days === 0 && hours === 0 && minutes === 0 && seconds === 0


  useEffect(() => {
    setIsLoaded(true);
  })


  if (!isLoaded) {
    return (<></>)
  } 


  else if (target && (days === 0 && hours === 0 && minutes === 0 && seconds === 0)){
    return (<></>)
  }
  

  else if (!target && (days === 0 && hours === 0 && minutes === 0 && seconds === 0)) {
    return (
      <div className="timer-wrapper">
        <button className='back-button' onClick={() => navigate('/')} title='back-button'>◀ Back</button>
        <div  className={'times'}>
          <span className='timer-value'>Countdown not found</span>
        </div>      
      </div>
    )
  } 
  
  



  else if (target) {
    return (
      <div className="timer-wrapper">
  
        <button className='back-button' onClick={() => navigate('/')} title='back-button'>◀ Back</button>
  
  
        <div  className={'times' + noDataClass}>
          <div className="day timer-item">
            <span className='timer-value'>{days}</span>
            <span className='timer-label'>{labels?.day}</span>
          </div>
          <div className="minute timer-item">
            <span className='timer-value'>{hours}</span>
            <span className='timer-label'>{labels?.hour}</span>
          </div>
          <div className="hour timer-item">
            <span className='timer-value'>{minutes}</span>
            <span className='timer-label'>{labels?.minute}</span>
          </div>
          <div className="second timer-item">
            <span className='timer-value'>{seconds}</span>
            <span className='timer-label'>{labels?.second}</span>
          </div>
        </div>
        <div className="date timer-label timer-item">{targetDateTimeLabel}</div>
      </div>
    )
  }
    
  
  
  

}