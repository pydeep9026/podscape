import React from 'react'
import Link from 'next/link'

const ArtistCard = ({ image, name }) => {
    return (
        <Link href='/artist/samuel'>
            <div className="artist_card group aspect-square">
                <img className='group-hover:opacity-70' src={image} alt='' />
                <div className='details flex flex-col'>
                    <p className='text-md text-sky-500'>{name}</p>
                    <p className='text-sm mt-2'>Podcaster</p>
                </div>
            </div>
        </Link>
    )
}

export default ArtistCard