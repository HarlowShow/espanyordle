const DAY_IN_MILLISECONDS = 86400000;

export type Countdown = {
  hoursUntil: number;
  minutesUntil: number;
  secondsUntil: number;
}

// this is just the testing version of this function which will return more info
export const getCountdown = (startDate: Date, currentDate: Date | number): Countdown => {

  // milliseconds for the start date
  const initTimeStamp = startDate.getTime();
  // get milliseconds for current date if not using Date.now()
  const newTimeStamp =
    typeof currentDate === "number" ? currentDate : currentDate.getTime();

  let diff = 0;

  if (newTimeStamp > initTimeStamp) {
    diff = newTimeStamp - initTimeStamp;
  } else {
    console.warn("error processing date");
  }

  const getFloatDifference = ((decimalNum: number) => {
      const roundedUp = Math.ceil(decimalNum)
      const difference = 1 - (roundedUp - decimalNum)
      return difference
  })
  
  // get the no. of days elapsed
  const days = diff / DAY_IN_MILLISECONDS;

  // calculate the individual hours, minutes and seconds based 
  const hoursDifference = getFloatDifference(days)
  const hours = 24 * hoursDifference
  
  const minutesDifference = getFloatDifference(hours)
  const minutes = 60 * minutesDifference
  
  const secondsDifference = getFloatDifference(minutes)
  const seconds = 60 * secondsDifference
  
  // const daysElapsed = Math.floor(days);

  const hoursElapsed = 24 - hours
  const hoursUntil = Math.floor(hoursElapsed)

  const minutesElapsed = 60 - minutes
  const minutesUntil = Math.floor(minutesElapsed)
  
  const secondsElapsed = 60 - seconds
  const secondsUntil = Math.floor(secondsElapsed)
  
  // console.log(daysElapsed, hoursElapsed, minutesElapsed, secondsElapsed)
  // console.log(newHoursUntil)

  return {
    hoursUntil,
    minutesUntil,
    secondsUntil
  }
  
};