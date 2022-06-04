import { useState } from 'react'

import './App.css'

function App() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])

  const handleSearch = (e) => {
    if(query === '') {
      setResults([])
      alert("No has escrito nada en el buscador")
      return
    }

    fetch("https://api.mercadolibre.com/sites/MCO/search?q="+query).then(res => res.json()).then(data => {
      console.log(data.results)
      setResults(data.results)
    })
  }

  return (
    <div className="App">
      <div className="Searcher">
      <input type="text" placeholder='Buscar elemento en mercadolibre CO' value={query} onChange={(event)=>{
        setQuery(event.target.value)
      }}/>
      <button type="button" onClick={handleSearch}>buscar</button>
      </div>
      <div className="Results">
        {results.map(result => (
          <div className='Card' key={result.id}>
            <img src={result.thumbnail} alt={result.title}/>
            <div className='description'>
              <p>{result.title}</p>
              <p>{result.price} COP</p>
              <a href={result.permalink}>Ver producto</a>
            </div>
          </div>))}
        </div>
    </div>
  )
}

export default App
