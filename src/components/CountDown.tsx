import React, { useState, useEffect } from 'react'

interface CountdownProps {
  expiresAt: string | number | Date
}

const Countdown: React.FC<CountdownProps> = ({ expiresAt }) => {
  const calculateTimeLeft = () => {
    const target = new Date(expiresAt)
    const now = new Date()
    const difference = target.getTime() - now.getTime()

    let timeLeft = { hours: 0, minutes: 0, seconds: 0 }

    if (difference > 0) {
      timeLeft = {
        hours: Math.floor(difference / (1000 * 60 * 60)),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      }
    }

    return timeLeft
  }

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft())

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)
    return () => clearInterval(timer)
  }, [expiresAt])

  if (timeLeft.hours <= 0 && timeLeft.minutes <= 0 && timeLeft.seconds <= 0) {
    return <span>¡Tiempo expirado!</span>
  }

  return (
    <span>
      {String(timeLeft.hours).padStart(2, '0')}:
      {String(timeLeft.minutes).padStart(2, '0')}:
      {String(timeLeft.seconds).padStart(2, '0')}
    </span>
  )
}

export default Countdown
