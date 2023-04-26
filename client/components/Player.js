import React, { useState, useEffect } from 'react'

const Player = ({ src, playing }) => {
    const [audio, setAudio] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    useEffect(() => {
        const newAudio = new Audio(src);
        newAudio.addEventListener('loadedmetadata', () => {
            setDuration(newAudio.duration);
        });
        newAudio.addEventListener('timeupdate', () => {
            setCurrentTime(newAudio.currentTime);
        });
        newAudio.addEventListener('ended', () => {
            setIsPlaying(false);
        });
        setAudio(newAudio);
        setIsPlaying(false)

        if (playing == true) {
            newAudio.play();
            setIsPlaying(true)
        }

        return () => {
            newAudio.play();
            newAudio.src = '';
            setAudio(null);
        };
    }, [src]);

    const handlePlayPause = () => {
        if (audio != null) {
            if (isPlaying) {
                audio.pause();
            } else {
                audio.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const handleTimeChange = (event) => {
        const newTime = parseFloat(event.target.value);
        audio.currentTime = newTime;
        setCurrentTime(newTime);
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };
    return (
        <div className='fixed bottom-0 right-0 w-full bg-[#131517] text-white h-fit flex  items-center md:justify-around justify-between px-4 py-4 z-10'>
            <div className='flex items-center space-x-4'>
                <img className='h-16' src='/podcast.jpg' alt='' />
                <div>
                    <h1 className='text-base font-bold'>Podcast Name</h1>
                    <p className='text-sm'>Artist</p>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                </svg>
            </div>
            <div className='flex items-center flex-col'>
                <div className='flex items-center space-x-2'>
                    <button className='text-white'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 16.811c0 .864-.933 1.405-1.683.977l-7.108-4.062a1.125 1.125 0 010-1.953l7.108-4.062A1.125 1.125 0 0121 8.688v8.123zM11.25 16.811c0 .864-.933 1.405-1.683.977l-7.108-4.062a1.125 1.125 0 010-1.953L9.567 7.71a1.125 1.125 0 011.683.977v8.123z" />
                        </svg>
                    </button>
                    {
                        !isPlaying ?
                            <button onClick={handlePlayPause} className='bg-white p-2 rounded-full'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="black" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
                                </svg>
                            </button>
                            :
                            <button onClick={handlePlayPause} className='bg-white p-2 rounded-full'>

                                <svg xmlns="http://www.w3.org/2000/svg" fill="black" viewBox="0 0 24 24" strokeWidth={2} stroke="black" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5" />
                                </svg>
                            </button>
                    }
                    <button className='text-white'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062A1.125 1.125 0 013 16.81V8.688zM12.75 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062a1.125 1.125 0 01-1.683-.977V8.688z" />
                        </svg>
                    </button>
                </div>
                <div className='flex items-center space-x-2'>
                    <span id="currentStart">{formatTime(currentTime)}</span>
                    <div class="bar">
                        <input
                            type="range"
                            min="0"
                            max={duration}
                            step="0.01"
                            value={currentTime}
                            onChange={handleTimeChange}
                        />
                    </div>
                    <span id="currentEnd">{formatTime(duration)}</span>
                </div>
            </div>
        </div>
    )
}

export default Player