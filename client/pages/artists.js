import React, { useState, useEffect } from 'react';
import Screens from '@/components/Screens';
import ArtistCard from '@/components/ArtistCard';
import axios from 'axios';
import { allspeakerroute } from './api/apiroutes';

const Artists = () => {
  const [speakers, setSpeakers] = useState([]);

  useEffect(() =>{
    async function fetchData(){
      try {
        const response = await axios.get(allspeakerroute);
        setSpeakers(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  return (
    <div className='bg-[#0A0B0D] text-white'>
      <Screens screen={2} title="Artists" bg="/artists.jpg" />
      <div className="bg-[#121413] md:py-20 lg:px-20 py-12 md:px-12 px-8 h-fit">
        <h1 className='text-center font-bold lg:text-4xl md:text-3xl text-2xl'>Popular Artists<span className="text-sky-500">.</span></h1>
        <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-6 mt-12">
        {speakers.map((speaker) => (
            <ArtistCard key={speaker._id} image={speaker.photo} name={speaker.name} />
          ))}
        </div>
      </div>
    </div> 
  )
}

export default Artists;
