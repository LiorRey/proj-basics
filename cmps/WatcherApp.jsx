import { watcherService } from "../services/watcher.service.js"

const { useState, useEffect } = React

export function WatcherApp() {
  const [watchers, setWatchers] = useState(null)
  const [selectedWatcher, setSelectedWatcher] = useState(null)

  useEffect(() => {
    loadWatchers()
  }, [])

  function loadWatchers() {
    watcherService
      .query()
      .then(setWatchers)
      .catch(err => {
        console.log("Error:", err)
      })
  }

  function onAddWatcher() {
    const fullname = prompt("Enter watcher's full name :")
    if (!fullname) return

    const moviesStr = prompt("Enter a list of movies (separated by commas) :")
    const movies = moviesStr ? moviesStr.split(",").map(m => m.trim()) : []

    const newWatcher = watcherService.getEmptyWatcher(fullname, movies)
    watcherService
      .save(newWatcher)
      .then(newWatcher =>
        setWatchers(prevWatchers => [...prevWatchers, newWatcher])
      )
      .catch(err => {
        console.log(`Error occurred while adding new watcher:`, err)
      })
  }

  function onRemoveWatcher(watcherId) {
    watcherService
      .remove(watcherId)
      .then(() => {
        setWatchers(watchers =>
          watchers.filter(watcher => watcher.id !== watcherId)
        )
      })
      .catch(err => {
        console.log(`Error occurred while removing watcher ${watcherId}:`, err)
      })
  }

  function onSelectWatcher(watcherId) {
    watcherService
      .get(watcherId)
      .then(selectedWatcher => setSelectedWatcher(selectedWatcher))
      //   .then((selectedWatcher) => {
      //     setSelectedWatcher(selectedWatcher =>
      //       watchers.filter(watcher => watcher.id === watcherId)
      //     )
      //   })
      .catch(err => {
        console.log(`Error occurred while selecting watcher ${watcherId}:`, err)
      })
  }

  function closeModal() {
    setSelectedWatcher(null)
  }

  if (!watchers) return <div>Loading...</div>
  return (
    <React.Fragment>
      <section className={"watcher-app"}>
        <h3>Watcher App</h3>
        <button onClick={() => onAddWatcher()}>Add Watcher</button>
        <section className="watchers-container">
          {watchers.map(watcher => (
            <article key={watcher.id} className="watcher-preview">
              <div className="watcher-preview-image-container">
                <img
                  title={`Photo of ${watcher.fullname}`}
                  src={`https://robohash.org/${watcher.fullname}?set=set5`}
                  alt={`Photo of ${watcher.fullname}`}
                />
              </div>
              <h5>{watcher.fullname}</h5>
              <hr />
              <div>
                <button onClick={() => onRemoveWatcher(watcher.id)}>X</button>
                <button onClick={() => onSelectWatcher(watcher.id)}>
                  Select
                </button>
              </div>
            </article>
          ))}
        </section>
        {selectedWatcher && (
          <section className="modal">
            <h5>{selectedWatcher.fullname}</h5>
            <ul>
              {selectedWatcher.movies.map(movie => (
                <li key={movie}>{movie}</li>
              ))}
            </ul>
            <button onClick={() => closeModal()} className="btn-close">
              Close
            </button>
          </section>
        )}
      </section>
    </React.Fragment>
  )
}
