import { AnimalList } from "./AnimalList.jsx"
import { SeasonClock } from "./SeasonClock.jsx"
import { CountDown } from "./CountDown.jsx"
import { WatcherApp } from "./WatcherApp.jsx"

const { useState, useEffect } = React

export function Home() {
  // Challenge #1
  const animalInfos = [
    { type: "Malayan Tiger", count: 787 },
    { type: "Mountain Gorilla", count: 212 },
    { type: "Fin Whale", count: 28 },
  ]

  // Challenge #2
  const [isSeasonClockShown, setSeasonClockShown] = useState(false)

  function toggleSeasonClock() {
    setSeasonClockShown(isSeasonClockShown => !isSeasonClockShown)
  }

  // Challenge #3
  const [isCountDownShown, setCountDownShown] = useState(false)
  const startFrom = 10
  const toTime = Date.now() + 1000 * 10
  // const toTime = undefined
  // const toTime = new Date(2025, 7, 26, 18, 32, 20, 0)

  function onDone() {
    console.log("Done!")
  }

  function toggleCountDown() {
    setCountDownShown(isCountDownShown => !isCountDownShown)
  }

  return (
    <React.Fragment>
      <section className="home">
        <h2>Home Sweet Home</h2>
      </section>
      <hr />
      <section>
        <h3>Animal List</h3>
        <AnimalList animalInfos={animalInfos} />
      </section>
      <hr />
      <section>
        <h3>Season Clock</h3>
        <button onClick={toggleSeasonClock}>
          {isSeasonClockShown ? "Hide" : "Show"}
        </button>
        <div>{isSeasonClockShown && <SeasonClock />}</div>
      </section>
      <hr />
      <section>
        <h3>Count Down</h3>
        <button onClick={toggleCountDown}>
          {isCountDownShown ? "Hide" : "Show"}
        </button>
        <div>
          {isCountDownShown && (
            <CountDown toTime={toTime} startFrom={startFrom} onDone={onDone} />
          )}
        </div>
      </section>
      <hr />
      <section>
        <h3>Watcher App</h3>
        <WatcherApp />
      </section>
    </React.Fragment>
  )
}
