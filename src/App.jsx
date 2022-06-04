import { useState } from 'react'

import './App.css'

function App() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [page, setPage] = useState(undefined)
  const [totalPages, setTotalPages] = useState(undefined)
  const [loading, setLoading] = useState(false)

  const handleSearch = () => {
    if(query === '') {
      setResults([])
      alert("No has escrito nada en el buscador")
      return
    }
    setLoading(true)
    fetch("https://api.mercadolibre.com/sites/MCO/search?q="+query).then(res => res.json()).then(data => {
      setResults(data.results)
      setTotalPages(data.paging.limit)
      setPage(0)
      setLoading(false)
    })
  }

  const handlePage = (page) => {
    setPage(page)
    setLoading(true)
    fetch("https://api.mercadolibre.com/sites/MCO/search?q="+query+"&offset="+page).then(res => res.json()).then(data => {
      setResults(data.results)
      setLoading(false)
    })
  }

  return (
    <div className="App">
      <div className="Searcher">
      <p>Juan Manuel Grajales</p>
      <input type="text" placeholder='Buscar elemento en mercadolibre CO' value={query} onChange={(event)=>{
        setQuery(event.target.value)
      }}/>
      <button type="button" onClick={handleSearch}>buscar</button>
      </div>
      {    totalPages &&  
      <div className="Paginator">
        {page > 0 && 
          <button type="button" onClick={()=>{handlePage(page-1)}}>Anterior</button>}
          <p>{page}</p>
        {page < totalPages &&
          <button type="button" onClick={()=>{handlePage(page+1)}}>Siguiente</button>}
      </div>}
      {loading ? 
      <p>Cargando ...</p> :
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
      </div>}
      
    </div>
  )
}

export default App
