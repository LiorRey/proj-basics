export function AnimalList({ animalInfos }) {
  return (
    <React.Fragment>
      <section className="animal-list">
        <h4>Rare Animals</h4>
        <table className="animals-table">
          <tbody>
            {animalInfos.map(animal => (
              <tr key={animal.type}>
                <td>{animal.type}</td>
                <td>{animal.count}</td>
                <td>
                  <a
                    href={`https://www.google.com/search?q=${animal.type}`}
                    className="animal-search-link"
                  >
                    Search
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </React.Fragment>
  )
}
