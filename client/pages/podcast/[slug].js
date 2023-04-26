import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { Player } from "@kevtucker/react-audio-player-bar";
import { useEffect } from 'react';
import axios from 'axios';
import { allspeakerroute } from '../api/apiroutes';








const Podcast = () => {

    const router = useRouter()
    const { title, speaker,slug ,episode1,episode2,episode3,episode4,episode5} = router.query;
    const episodes=[episode1,episode2,episode3,episode4,episode5]


        const [currentEpisode, setCurrentEpisode] = useState(null);
      
        function handleEpisodeClick(episode) {
          setCurrentEpisode(episode);
        }
      

    return (
        <div  className='bg-gradient-to-br from-teal-700 to-black text-white pt-10'>
        <div className='md:py-20 lg:px-20 py-12 md:px-12 px-8 h-fit'>
          <div className='flex md:flex-row flex-col md:items-end items-start justify-between'>
            <div className='md:w-1/4 w-1/2'>
              <img className='shadow-2xl drop-shadow-2xl' src='/podcast.jpg' alt='' />
            </div>
            <div className='md:w-3/4 w-full md:pl-20 md:mt-0 mt-10'>
              <p className='text-sm font-semibold'>Podcast</p>
              <p className='lg:text-5xl md:text-4xl text-3xl font-bold mt-4'>{title}</p>
              <p className='text-sm font-semibold mt-4'>
                By <span className='text-sky-500'>{speaker}</span>
              </p>
            </div>
          </div>
          <ul className="border rounded-lg mt-20 p-4 bg-gray-500 shadow-md">
      {episodes.map((episode, index) => (
        <li
          key={index}
          onClick={() => handleEpisodeClick(episode)}
          className="p-2 hover:bg-gray-400 cursor-pointer"
        >
          <span className="mr-2 text-white">{`episode ${index + 1}`}</span>
        </li>
      ))}
    </ul>
    <div className="mb-20">
          <Player
        source={currentEpisode}
        title={`${title} episode ${episodes.indexOf(currentEpisode) + 1}`}
        artist={speaker}
        artwork="https://picsum.photos/260"
      />
      </div>
        </div>
        </div>
    )
}

export default Podcast



