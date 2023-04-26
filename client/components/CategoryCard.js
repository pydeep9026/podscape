import React from 'react'
import Link from 'next/link'

const CategoryCard = ({ image, title }) => {
    const slug = title.toLowerCase();
    return (
        <Link href={`/category/${slug}`} >
            <div className='relative hover:scale-105 ease-in duration-300'>
                <img className='rounded-md' src={image} alt={title} />
                <div className='flex items-center space-x-4 absolute bottom-2 left-2'>
                    <div className='p-1 rounded-full bg-purple-900'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                        </svg>
                    </div>
                    <p className='text-sm font-bold'>{title}</p>
                </div>
            </div>
        </Link>
    )
}

export default CategoryCard