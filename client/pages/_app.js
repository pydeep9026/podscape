import '@/styles/globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Player from '@/components/Player'
import VideoPlayer from '@/components/VideoPlayer'
import { useState } from 'react'

export default function App({ Component, pageProps }) {
  const [playing, setPlaying] = useState(false)
  const [videoPlaying, setVideoPlaying] = useState(false)
  const [src, setSrc] = useState('')

  const startAudio = (element) => {
    setSrc(element.src)
    if (element.type == "audio") {
      setPlaying(true)
    }
    else if (element.type == "video") {
      setVideoPlaying(true)
    }
  }
  return <>
    <Navbar />
    <Component startAudio={startAudio} />
    <Footer />
    {
      playing && <Player playing={playing} src={src} />
    }
    {
      videoPlaying && <VideoPlayer playing={videoPlaying} src={src} setVideoPlaying={setVideoPlaying} />
    }
  </>
}
