const { useState, useEffect, useRef } = React

export function CountDown({ toTime, startFrom = 10, onDone }) {
  const [timer, setTimer] = useState(_determineInitialTimer())
  const intervalIdRef = useRef()

  useEffect(() => {
    intervalIdRef.current = setInterval(() => {
      if (toTime) {
        setTimer(timer => Math.max(timer - 1000, 0))
      } else {
        setTimer(timer => Math.max(timer - 1000, 0))
      }
      //   setTimer(timer => timer - 1)
    }, 1000)

    return () => clearInterval(intervalIdRef.current)
  }, [])

  useEffect(() => {
    if (timer <= 0) {
      clearInterval(intervalIdRef.current)
      onDone()
    }
  }, [timer])

  //   const timerPattern = _formatTimer(timer)
  //   function _formatTimer(ms) {
  //     // clamped: just a safety measure to prevent negative numbers from sneaking into timer calculations
  //     const clamped = Math.max(ms, 0)
  //     if (toTime) {
  //       const days = Math.floor(clamped / (1000 * 60 * 60 * 24))
  //       const hours = Math.floor((clamped / (1000 * 60 * 60)) % 24)
  //       const minutes = Math.floor((clamped / (1000 * 60)) % 60)
  //       const seconds = Math.ceil((clamped / 1000) % 60)

  //       return `${days} Days ${String(hours).padStart(2, "0")}:${String(
  //         minutes
  //       ).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`
  //     }

  //     return String(Math.ceil(clamped / 1000)).padStart(2, "0")
  //   }

  // clamped: just a safety measure to prevent negative numbers from sneaking into timer calculations
  const clamped = Math.max(timer, 0)
  const days = Math.floor(clamped / (1000 * 60 * 60 * 24))
  const hours = Math.floor((clamped / (1000 * 60 * 60)) % 24)
  const minutes = Math.floor((clamped / (1000 * 60)) % 60)
  const seconds = Math.floor((clamped / 1000) % 60)

  function _determineInitialTimer() {
    if (toTime) {
      const diff = toTime - Date.now()
      return Math.ceil(diff / 1000) * 1000 // snap to next full second
    }
    return startFrom * 1000
  }

  return (
    <React.Fragment>
      <section className={"count-down"}>
        <h3>
          <span>
            {toTime &&
              `${days} Days ${String(hours).padStart(2, "0")}:${String(
                minutes
              ).padStart(2, "0")}:`}
          </span>
          <span className={timer <= 6000 ? "last-six-seconds" : ""}>
            {String(seconds).padStart(2, "0")}
          </span>
        </h3>
      </section>
    </React.Fragment>
  )
}
