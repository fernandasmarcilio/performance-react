import Head from 'next/head'
import { FormEvent, useCallback, useState } from 'react'
import { SearchResults } from '../components/SearchResults';

type Results = {
  totalPrice: number;
  data: Array<{
    id: number;
    price: number;
    title: string;
    priceFormatted: string;
  }>
}

export default function Home() {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState<Results>({
    totalPrice: 0,
    data: []
  });

  const handleSearch = async (event: FormEvent) => {
    event.preventDefault();

    if(!search.trim()) {
      return;
    }

    const response = await fetch(`http://localhost:3333/products?q=${search}`)
    const data = await response.json()

    // ---- FORMATAÇÃO DE DADOS ----
    // Formatar os dados quando busca eles e não na hora de renderizar
    // Por exemplo: evitar o totalPrice no SearchResults, pois mesmo usando o useMemo
    // ainda tem um gasto de processamento para comparar

    const formatter = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    })

    const products = data.map(product => {
      return {
        id: product.id,
        title: product.title,
        price: product.price,
        priceFormatted: formatter.format(product.price),
      }
    })


    const totalPrice = data.reduce((total, product) => {
      return total + product.price
    }, 0);

    setResults({ totalPrice, data: products });

  }

  const addToWishList = useCallback(async (id:number) => {
    console.log(id);
  }, [])
  
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

        <SearchResults results={results.data} totalPrice={results.totalPrice} onAddToWishList={addToWishList} />        
      </div>

    </div>
  )
}
