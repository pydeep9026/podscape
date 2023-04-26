import React, { useRef, useState, useEffect } from 'react';
import { FiPlay, FiPause, FiVolume2, FiVolumeX } from 'react-icons/fi';
import { MdFullscreen, MdFullscreenExit } from 'react-icons/md';
import Modal from '@mui/material/Modal';

const VideoPlayer = ({ src, playing, setVideoPlaying }) => {
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(0.5);
    const [isMuted, setIsMuted] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [source, setSource] = useState('')
    const [duration, setDuration] = useState(0);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setVideoPlaying(false)
        setOpen(false);
    }

    useEffect(() => {
        const currenttime = videoRef.current ? videoRef.current.currentTime : 0;
        const duratio = videoRef.current ? videoRef.current.duration : 0;

        setCurrentTime(currenttime);
        setDuration(duratio);
        setSource(src);
        handleOpen();
    }, [src]);

    const togglePlay = () => {
        setIsPlaying(!isPlaying);
        if (isPlaying) {
            videoRef.current.pause();
        } else {
            videoRef.current.play();
        }
    };

    const toggleMute = () => {
        setIsMuted(!isMuted);
        videoRef.current.muted = !videoRef.current.muted;
    };

    const handleSeek = (event) => {
        const time = event.target.value;
        videoRef.current.currentTime = time;
        setCurrentTime(time);
    };

    const toggleFullscreen = () => {
        if (isFullscreen) {
            document.exitFullscreen();
        } else {
            videoRef.current.requestFullscreen();
        }
        setIsFullscreen(!isFullscreen);
    };

    const handleDurationChange = () => {
        setDuration(videoRef.current.duration);
    };
    const handleTimeUpdate = () => {
        setCurrentTime(videoRef.current.currentTime);
    };


    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <div className="absolute w-[40vw] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <video
                    className=""
                    src={src}
                    ref={videoRef}
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                    onVolumeChange={() => setVolume(videoRef.current.volume)}
                    onTimeUpdate={handleTimeUpdate}
                    onLoadedMetadata={handleDurationChange}
                />
                <div className="absolute bottom-0 w-full bg-black bg-opacity-60 px-4 py-2 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button onClick={togglePlay} className="text-white">
                            {isPlaying ? <FiPause /> : <FiPlay />}
                        </button>
                        <div className="relative">
                            <button onClick={toggleMute} className="text-white">
                                {isMuted || volume === 0 ? <FiVolumeX /> : <FiVolume2 />}
                            </button>
                        </div>
                        <div className='flex items-center space-x-2 flex-grow text-white'>
                            <span id="currentStart">{formatTime(currentTime)}</span>
                            <div class="bar">
                                <input
                                    className='w-full'
                                    type="range"
                                    min="0"
                                    max={duration}
                                    step="0.01"
                                    value={currentTime}
                                    onChange={handleSeek}
                                />
                            </div>
                            <span id="currentEnd">{formatTime(duration)}</span>
                        </div>
                    </div>
                    <button onClick={toggleFullscreen} className="text-white">
                        {isFullscreen ? <MdFullscreenExit /> : <MdFullscreen />}
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default VideoPlayer;