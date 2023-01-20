import React from 'react'
import { useState, useEffect } from 'react'

const Timer = (props: any) => {
  const { initialMinute = 0, initialSeconds = 0, active, setActive } = props
  const [minutes, setMinutes] = useState(initialMinute)
  const [seconds, setSeconds] = useState(initialSeconds)
  useEffect(() => {
    if (!active) {
      let myInterval = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1)
        }
        if (seconds === 0) {
          if (minutes === 0) {
            clearInterval(myInterval)
            setMinutes(initialMinute)
            setSeconds(initialSeconds)
            setActive(true)
          } else {
            setMinutes(minutes - 1)
            setSeconds(59)
          }
        }
      }, 1000)
      return () => {
        clearInterval(myInterval)
      }
    }
  })

  return (
    <>
      {minutes < 10 ? `0${minutes}` : seconds}:{seconds < 10 ? `0${seconds}` : seconds}
    </>
  )
}

export default Timer
