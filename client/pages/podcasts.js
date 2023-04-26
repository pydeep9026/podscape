import React, { useEffect, useState } from 'react'
import Screens from '@/components/Screens'
import Card from '@/components/Card'
import Link from 'next/link'
import { allspeakerroute, getallpodcasts } from './api/apiroutes';
import axios from "axios"


const Podcasts = () => {
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
            <Screens screen={2} title="Podcasts" bg="/podcasts.jpg" />
            <div className="md:py-20 lg:px-20 py-12 md:px-12 px-8 h-fit">
                <div className="flex justify-between items-center">
                    <h1 className='text-left font-bold lg:text-3xl md:text-2xl text-xl'>Entertainment<span className="text-sky-500">.</span></h1>
                    <button className="text-xs px-4 py-1 rounded-3xl view-all">VIEW ALL</button>
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
            <div className="md:py-20 lg:px-20 py-12 md:px-12 px-8 h-fit">
                <div className="flex justify-between items-center">
                    <h1 className='text-left font-bold lg:text-3xl md:text-2xl text-xl'>Videogaming<span className="text-sky-500">.</span></h1>
                    <button className="text-xs px-4 py-1 rounded-3xl view-all">VIEW ALL</button>
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
            <div className="md:py-20 lg:px-20 py-12 md:px-12 px-8 h-fit">
                <div className="flex justify-between items-center">
                    <h1 className='text-left font-bold lg:text-3xl md:text-2xl text-xl'>Lifestyle<span className="text-sky-500">.</span></h1>
                    <button className="text-xs px-4 py-1 rounded-3xl view-all">VIEW ALL</button>
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
        </div>
    )
}

export default Podcasts