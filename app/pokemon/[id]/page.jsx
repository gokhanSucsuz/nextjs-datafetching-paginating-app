import Image from 'next/image'
import React from 'react'

const getData = async (id) => {
    const res = await fetch("https://pokeapi.co/api/v2/pokemon/" + id)
    const json = await res.json()
    return json
}

const Pokemon = async (p) => {

    const data = await getData(p.params.id)
    return (
        <div>
            <h1 className='font-bold text-orange-600 text-4xl flex justify-center items-center p-2 shadow-md'>
                Pokemon Detail Page</h1>
            <div className="p-6 grid mb-8 border m-10 shadow-lg border-gray-200 rounded-lg dark:border-gray-700 md:mb-12 md:grid-cols-2 bg-white dark:bg-gray-800">

                <figure className="flex shadow-lg m-2 flex-col items-center justify-center p-4 text-center bg-white border-b border-gray-200 rounded-t-lg md:rounded-t-none md:rounded-ss-lg md:border-e dark:bg-gray-800 dark:border-gray-700">
                    <blockquote className="max-w-2xl mx-auto mb-4 text-gray-500 lg:mb-8 dark:text-gray-400">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{data.name.toUpperCase()}</h3>
                        <p className="my-4">Weight: {data.weight}kg</p>
                        <p className="my-4">Weight: {data.height}m</p>
                        <p className="my-4">Exp Weight: {data.base_experience}pt</p>
                    </blockquote>
                    <figcaption className="flex flex-col items-center justify-center ">
                        <Image
                            className="rounded-full w-20 h-20"
                            src={data.sprites.other.showdown.front_shiny}
                            alt="picture"
                            width={200}
                            height={200}
                        />
                        <div className="space-y-0.5 font-medium dark:text-white text-left rtl:text-right ms-3">
                            <div>Stats</div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                                {
                                    data.stats.map((item, index) => {
                                        return (
                                            <div key={index}>{item.stat.name} - {item.base_stat}</div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </figcaption>
                </figure>
                <figure className="flex shadow-lg m-2 flex-col items-center justify-center p-4 text-center bg-white border-b border-gray-200 md:rounded-se-lg dark:bg-gray-800 dark:border-gray-700">
                    <blockquote className="max-w-2xl mx-auto mb-4 text-gray-500 lg:mb-8 dark:text-gray-400">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            Properties
                        </h3>

                    </blockquote>
                    <figcaption className="flex flex-col md:flex-row items-center justify-center ">
                        <div className='flex flex-col'>
                            <Image
                                className="rounded-full w-20 h-20"
                                src={data.sprites.other.dream_world.front_default}
                                alt="picture"
                                width={200}
                                height={200}
                            /><Image
                                className="rounded-full w-20 h-20"
                                src={data.sprites.other.showdown.front_shiny}
                                alt="picture"
                                width={200}
                                height={200}
                            />
                            <Image
                                className="rounded-full w-20 h-20"
                                src={data.sprites.other["official-artwork"].front_default}
                                alt="picture"
                                width={200}
                                height={200}
                            />
                            <Image
                                className="rounded-full w-20 h-20"
                                src={data.sprites.versions["generation-iii"]["firered-leafgreen"].front_shiny}
                                alt="picture"
                                width={200}
                                height={200}
                            />
                        </div>
                        <div className="space-y-0.5 font-medium dark:text-white text-left rtl:text-right ms-3">
                            <div>Game Indices</div>

                            {
                                data.game_indices.map((item, index) =>
                                    <div key={index} className="text-sm text-gray-500 dark:text-gray-400">
                                        Version: {item.version.name}
                                    </div>)
                            }

                        </div>
                    </figcaption>
                </figure>
            </div>
        </div>


    )
}

export default Pokemon