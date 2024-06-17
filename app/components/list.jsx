import Link from "next/link";
import { LIMIT } from "../consts/const";
import ListItem from "./listItem";

const getData = async (offset) => {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${LIMIT}&offset=${offset}`)
    const json = await res.json();
    console.log(json)

    const fetchPokemonDetail = async (url) => {
        const pokemonDetails = await fetch(url)
        return await pokemonDetails.json()
    }

    const pokemonDetailPromise = json.results.map(async (item) => {
        const pokeDetail = await fetchPokemonDetail(item.url)
        item.info = pokeDetail
        return item
    })

    json.results = await Promise.all(pokemonDetailPromise)
    console.log(json)
    return json
}



const List = async ({ offset }) => {
    const data = await getData(offset)
    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center gap-6">
                <div className="flex gap-2 flex-col sm:flex-row">
                    <h1 className="text-2xl text-white border p-1 rounded-lg ">Total : {data.count}</h1>
                    <h1 className="text-2xl text-white border p-1 rounded-lg ">Now Listed : {LIMIT}</h1>
                    <h1 className="text-2xl text-white border p-1 rounded-lg ">Total Page : {Math.round(data.count / LIMIT)}</h1>
                    <h1 className="text-2xl text-white border p-1 rounded-lg ">The page you are on : {offset / LIMIT || 1}</h1>
                </div>

                <div className="flex flex-1 items-center justify-end  gap-3 text-white">
                    {data.previous && <Link href={`/?page=${new URL(data.previous).searchParams.get('offset') / LIMIT}`}>Prev</Link>}
                    {data.next && <Link href={`/?page=${new URL(data.next).searchParams.get('offset') / LIMIT}`}>Next</Link>}
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 ">
                {
                    data.results.map(item => {
                        return <ListItem key={item.name} item={item} />
                    })
                }
            </div>
        </div>
    )
}

export default List