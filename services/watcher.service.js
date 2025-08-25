import { utilService } from "./util.service.js"
import { storageService } from "./async-storage.service.js"

const WATCHER_KEY = "watcherDB"
_createWatchers()

export const watcherService = {
  query,
  get,
  remove,
  save,
  getEmptyWatcher,
}

// For Debug (easy access from console):
// window.cs = watcherService

function query() {
  return storageService.query(WATCHER_KEY).then(watchers => watchers)
}

function get(watcherId) {
  return storageService.get(WATCHER_KEY, watcherId)
}

function remove(watcherId) {
  return storageService.remove(WATCHER_KEY, watcherId)
}

function save(watcher) {
  if (watcher.id) {
    return storageService.put(WATCHER_KEY, watcher)
  } else {
    return storageService.post(WATCHER_KEY, watcher)
  }
}

function getEmptyWatcher(fullname = "", movies = []) {
  return { fullname, movies }
}

function _createWatchers() {
  let watchers = utilService.loadFromStorage(WATCHER_KEY)
  if (!watchers || !watchers.length) {
    watchers = []

    watchers.push(
      _createWatcher("Puki Ba", [
        "Game of thrones",
        "Rocky Balboa",
        "Rambo (First Blood)",
        "Back to the Future",
      ])
    )

    watchers.push(
      _createWatcher("Muki Da", ["Breaking Bad", "Stranger Things"])
    )

    watchers.push(
      _createWatcher("Shuki Sa", ["Pulp Fiction", "Forrest Gump", "Fight Club"])
    )

    utilService.saveToStorage(WATCHER_KEY, watchers)
  }
}

function _createWatcher(fullname, movies) {
  const watcher = getEmptyWatcher(fullname, movies)
  watcher.id = utilService.makeId()
  return watcher
}
