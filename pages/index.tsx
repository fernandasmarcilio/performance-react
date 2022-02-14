import Head from 'next/head'
import { FormEvent, useState } from 'react'
import { SearchResults } from '../components/SearchResults';

export default function Home() {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async (event: FormEvent) => {
    event.preventDefault();

    if(!search.trim()) {
      return;
    }

    const response = await fetch(`http://localhost:3333/products?q=${search}`)
    const data = await response.json()
    setResults(data);
  }
  
  return (
    <div>
      <Head>
        <title>Performando React</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <h1>Pesquisar</h1>

        <form onSubmit={handleSearch}>
          <input type="text" value={search} onChange={e => setSearch(e.target.value)}/>
          <button type="submit">Pesquisar</button>
        </form>

        <SearchResults results={results} />        
      </div>

    </div>
  )
}