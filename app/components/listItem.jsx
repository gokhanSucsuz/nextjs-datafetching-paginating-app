"use client"
import Image from 'next/image'
import Link from 'next/link'
import React, { useRef, useState } from 'react'
import { Popover } from 'react-tiny-popover'

const ListItem = ({ item }) => {
    const [hoveredItem, setHoveredItem] = useState("")
    const imgRef = useRef()
    const [isPopoverOpen, setIsPopoverOpen] = useState(false)
    return (
        <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div className='flex items-center justify-center'>
                <Popover
                    ref={imgRef}
                    isOpen={isPopoverOpen}
                    align='center'
                    positions={["bottom"]}
                    content={<div className='w-max border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700'>
                        {item.name.toUpperCase()}
                    </div>}
                >
                    <Image
                        className="rounded-t-lg cursor-pointer p-5"
                        src={item.info.sprites.other.showdown[hoveredItem === item.info.cries.latest ? "front_shiny" : "back_shiny"]}
                        alt="image"
                        width={100}
                        height={100}
                        onClick={() => {
                            setHoveredItem(item.info.cries.latest)
                        }}
                        onMouseLeave={() => {
                            setHoveredItem("")
                            imgRef.current.src = item.info.sprites.other.showdown.back_shiny
                        }}
                        onMouseEnter={() => {
                            imgRef.current.src = item.info.sprites.other.showdown.front_shiny
                            setIsPopoverOpen(!isPopoverOpen)
                        }}
                    />
                </Popover>
            </div>
            <div className="p-5">
                <a href="#">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-orange-600 dark:text-white">{item.name.toUpperCase()}</h5>
                </a>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    <span className='font-bold'>Properties: </span>
                    {
                        item.info.types.map((type, index) =>
                            index === item.info.types.length - 1 ? type.type.name : type.type.name + ","
                        )
                    }
                </p>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400"><span className='font-bold'>Height:</span>{item.info.height}m</p>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400"><span className='font-bold'>Weight:</span>{item.info.weight}</p>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400"><span className='font-bold'>Weight:</span>{item.info.weight}</p>
                <Link href={`/pokemon/${item.info.id}`} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-orange-700 rounded-lg hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-orange-300 dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800">
                    Read more...
                </Link>
            </div>
            {
                hoveredItem && (
                    <audio style={{ display: "none" }} autoPlay={true} src={hoveredItem} />
                )
            }
        </div>

    )
}

export default ListItem