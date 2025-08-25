const { useState, useEffect, useRef } = React

// let isDark = false
export function SeasonClock() {
  const [isDark, setIsDark] = useState(false)
  const [nowDate, setNowDate] = useState(new Date())

  useEffect(() => {
    const intervalId = setInterval(() => {
      const currDate = new Date()
      // setNowDate(nowDate => currDate)

      setNowDate(currDate)
      // setNowDate(nowDate => {
      //   const currDate = new Date(nowDate)
      //   currDate.setSeconds(currDate.getSeconds() + 1)
      //   return currDate
      // })
    }, 1000)

    return () => clearInterval(intervalId)
  }, [])

  useEffect(() => {
    onToggleDarkMode()
    // nowDateTimeRef.current = nowDate.toLocaleTimeString([], {
    //   hour12: false,
    //   hour: "2-digit",
    //   minute: "2-digit",
    //   second: "2-digit",
    // })

    // monthName.current = nowDate.toLocaleString("en-US", { month: "long" })

    // seasonName.current = _getSeasonName(nowDate.getMonth())

    // monthName = nowDateTime.toLocaleString("en-US", { month: "long" })

    // console.log(monthName)

    return () => {
      // console.log("isDark before:", isDark)
    }
  }, [nowDate])

  const monthName = nowDate.toLocaleString("en-US", { month: "long" })
  const seasonName = _getSeasonName(nowDate.getMonth())
  const weekdayName = nowDate.toLocaleString("en-US", { weekday: "long" })
  const nowDateTimeRef = nowDate.toLocaleTimeString([], {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  })

  function onToggleDarkMode() {
    setIsDark(isDark => !isDark)
    // console.log("isDark after:", isDark)
  }

  function _getSeasonName(monthIdx) {
    if (monthIdx >= 2 && monthIdx <= 4) return "Spring"
    if (monthIdx >= 5 && monthIdx <= 7) return "Summer"
    if (monthIdx >= 8 && monthIdx <= 10) return "Autumn"
    return "Winter"
  }

  return (
    <React.Fragment>
      <section
        className={`season-clock ${isDark ? "dark" : ""}`}
        onClick={onToggleDarkMode}
      >
        <h4>
          {monthName} ({seasonName})
        </h4>
        <img
          src={`./assets/img/season-imgs/${seasonName.toLowerCase()}.png`}
          alt={seasonName}
          title={seasonName}
        />
        <h3>{weekdayName}</h3>
        <p>{nowDateTimeRef}</p>
      </section>
    </React.Fragment>
  )
}
