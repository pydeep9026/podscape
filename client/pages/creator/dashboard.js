import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { getallpodcasts } from '../api/apiroutes';

function Creator() {
  const [podcasts, setPodcasts] = useState([]);
  const [creator, setcreator] = useState(undefined);



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

  useEffect(() => {
    async function setuserfunc() {
      if (!localStorage.getItem("chat-nexus-user")) {
      } else {
        setcreator(await JSON.parse(localStorage.getItem("chat-nexus-user")));
      }
    }
    setuserfunc();
  }, []);







  




  return (
    <div style={{}}>
      {creator && creator.photo ? (
  <div className="bg-gray-800  py-12 sm:px-6 lg:px-8">
    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
      <div className="bg-gray-700 shadow-lg rounded-lg overflow-hidden">
        <div className="bg-gray-800 h-48 py-12 px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center md:flex-row md:items-center md:justify-start">
          <div className="flex-shrink-0">
            <img
              className="h-32 w-32 rounded-full"
              src={creator.photo}
              alt="Creator"
            />
          </div>
          <div className="absolute top-20 right-0 m-4">
                <Link href="/creator/newpodcast" passHref={true} legacyBehavior={true}>
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Go to podcast upload
                  </button>
                </Link>
              </div>
          <div className="mt-6 md:mt-0 md:ml-4">
            <h3 className="text-2xl font-semibold text-white">{creator.name}</h3>
            <p className="text-md font-medium text-gray-400">{creator.email}</p>
          </div>
        </div>
        <div className="bg-gray-900 px-4 py-5 sm:p-6">
          <h3 className="text-md font-semibold text-white mb-2">About me:</h3>
          <p className="text-gray-400">{creator.speakerdescription}</p>
        </div>
      </div>
    </div>
  </div>
) : null}


<div className="bg-gray-800 rounded-lg p-6">
<h1 className="text-3xl text-white font-bold mb-3 mt-2 ml-6">My Podcasts</h1>
<div className="bg-gray-800 rounded-lg p-6">
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {podcasts.filter(podcast => podcast.creator === creator._id).map((podcast) => (
      <div key={podcast._id} className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-bold mb-4">{podcast.title}</h3>
        <p className="text-gray-700 mb-4">{podcast.description}</p>
        <div className="podcastmedia">
          {podcast.type === 'Audio' ? (
            <audio controls src={podcast.file} />
          ) : (
            <video controls src={podcast.file} />
          )}
        </div>
        <p className="text-gray-700 font-semibold">Category: {podcast.category}</p>
      </div>
    ))}
  </div>
</div>
</div>

    </div>
  );
}

export default Creator;
