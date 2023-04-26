import React, { useEffect, useState } from 'react'
import Screens from '@/components/Screens'
import Card from '@/components/Card'
import Image from 'next/legacy/image'
import { allspeakerroute, getallpodcasts } from './api/apiroutes';
import axios from "axios"

const Releases = () => {
    const [speakers, setSpeakers] = useState([])
    const [Podcasts, setPodcasts] = useState([])
  
    useEffect(() => {
      async function fetchData() {
        try {
          const response = await axios.get(allspeakerroute);
          setSpeakers(response.data);
        } catch (error) {
          console.error(error);
        }
      }
      fetchData();
    }, []);
  
    useEffect(() => {
      async function fetchData() {
        try {
          const response = await axios.get(getallpodcasts);
          setPodcasts(response.data);
        } catch (error) {
          console.error(error);
        }
      }
      fetchData();
    }, []);


    return (
        <div className='bg-[#0A0B0D] text-white'>
            <Screens screen={2} title="Releases" bg="/releases.jpg" />
            <div className="md:py-20 lg:px-20 py-12 md:px-12 px-8 h-fit">
                <div className="flex justify-between items-center">
                    <h1 className='text-left font-bold lg:text-4xl md:text-3xl text-2xl'>New Releases<span className="text-sky-500">.</span></h1>
                </div>
                <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-6 mt-8">
                {Array.isArray(Podcasts) && Podcasts.length > 0 ? (
  Podcasts.map((podcast) => (
    <Card key={podcast._id} image="./podcast.jpg" speaker={podcast.creator} title={podcast.title} episode1={podcast.episode1} episode2={podcast.episode2} episode3={podcast.episode3} episode4={podcast.episode4} episode5={podcast.episode5} />
  ))
) : (
  <p>Loading podcasts...</p>
)}
                </div>
            </div>
            <div
                className="p-12 text-center relative overflow-hidden" style={{ height: "100vh" }}>
                <Image quality="90" priority src='/featured.jpg' layout="fill" objectFit="cover" alt="heroBackdrop" />
                <div style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
                    className="absolute top-0 right-0 bottom-0 left-0 w-full h-full overflow-hidden bg-fixed">
                    <div className="flex md:flex-row flex-col items-center justify-between md:h-full h-[100vw] md:py-0 pt-[40vw] md:px-20 px-8">
                        <div className="text-white md:text-left text-center md:w-2/3">
                            <p className='text-sky-500 text-base'>Featured Album</p>
                            <h1 className="font-bold sm:text-5xl text-4xl mt-6">You are bad boy!</h1>
                            <p className='mt-6 font-semibold sm:text-3xl text-xl'>Album of the month from Cat Women</p>
                            <button className='border border-sky-500 px-6 py-4 mt-6 rounded-md text-sky-500 hover:bg-sky-500 hover:text-black ease-in-out duration-500'>
                                <p className='text-base font-semibold'>Add to favourites</p>
                            </button>
                        </div>
                        <div className='flex items-center justify-center md:w-1/3'>
                            <button className="bg-sky-500 p-2 rounded-full shadow-2xl group">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" strokeWidth={0} stroke="currentColor" className="w-8 h-8 group-hover:fill-black ease-in-out duration-150">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Releases