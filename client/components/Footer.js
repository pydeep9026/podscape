import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

const Footer = () => {
    return (
        <footer className="bg-[#0A0B0D] text-white body-font footer">
            <div className="container md:px-20 px-5 py-24 mx-auto flex md:items-center md:flex-row md:flex-nowrap flex-wrap flex-col">
                <div className="md:mx-0 mx-auto text-center md:text-left">
                    <Image quality="90" priority className='cursor-pointer' src='/logo.png' width="250" height="200" alt="navbarLogo" />
                    <p className="mt-2 text-md">Real People, Real Stories, Real Talk</p>
                </div>
                <div className="flex-grow flex flex-wrap md:pl-20 -mb-10 md:mt-0 mt-10 md:text-left text-center">
                    <div className=" md:w-1/2 w-full px-4 text-center">
                        <h2 className="title-font font-bold text-2xl mb-3">Top Site Links<span className='text-sky-500'>.</span></h2>
                        <nav className="list-none mb-10">
                            <li>
                                <Link href="/">Home</Link>
                            </li>
                            <li>
                                <Link href="/">Releases</Link>
                            </li>
                            <li>
                                <Link href="/">Podcasts</Link>
                            </li>
                            <li>
                                <Link href="/">Artists</Link>
                            </li>
                        </nav>
                    </div>
                    <div className=" md:w-1/2 w-full px-4 text-left">
                        <h2 className="title-font font-bold text-2xl mb-3">Start Podcasting<span className='text-sky-500'>.</span></h2>
                        <p className="mt-2 text-sm">Starting a podcast can be a fun and creative way to share your thoughts, ideas, and stories with the world. Whether you want to host interviews, share stories, or simply have a conversation with your audience</p>
                        <Link href='/signup-creator'>
                            <button className="text-xs px-4 py-1 rounded-3xl view-all mt-8 flex items-center space-x-2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                                </svg>
                                <p>START NOW</p>
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer