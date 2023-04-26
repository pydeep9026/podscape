import { Carousel } from '@mantine/carousel';
import { useRef, useState } from 'react';
import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/legacy/image';
import { createStyles } from '@mantine/core';
import c1 from '../../../public/CarouselCovers/1.jpg'
import c2 from '../../../public/CarouselCovers/2.jpg'
import c3 from '../../../public/CarouselCovers/3.jpg'
import Link from 'next/link';

function Demo(props) {

    const autoplay = useRef(Autoplay({ delay: 6000 }));
    const slides = [
        {
            image: c1,
            title: "Dirty John",
            type: "audio",
            src: "http://thepodcastexchange.ca/s/Porsche-Macan-July-5-2018-1.mp3"
        },
        {
            image: c2,
            title: "The Allusionist",
            type: "audio",
            src: "http://thepodcastexchange.ca/s/HSBC_Canada_Announcer_7819_updated.mp3"
        },
        {
            image: c3,
            title: "Conan O’Brien Needs a Friend",
            type: "audio",
            src: "http://thepodcastexchange.ca/s/Allusionist-HSBC-PRE-2019-07-12.mp3"
        },
    ];
    return (
        <Carousel
            className='h-[100vh] overflow-hidden'
            orientation="vertical"
            loop
            mx="auto"
            draggable={false}
            withIndicators
            styles={{
                indicator: {
                    width: 15,
                    height: 15,
                    transition: 'width 250ms ease',
                    backgroundColor: "white",

                    '&[data-active]': {
                        backgroundColor: "purple",
                    },
                },
            }}
            plugins={[autoplay.current]}
            slidesToScroll={1}
            align="start"
            withControls="false"
        >
            {slides.map((slide, index) => (
                <Carousel.Slide key={index}>
                    <div
                        className="p-12 text-center relative overflow-hidden" style={{ height: "100vh" }}>
                        <Image quality="90" loading="lazy" src={slide.image} layout="fill" objectFit="cover" alt={slide.title} />
                        <div style={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }}
                            className="absolute top-0 right-0 bottom-0 left-0 w-full h-full overflow-hidden bg-fixed">
                            <div className="flex justify-center items-center h-full md:w-[70vw] w-[90vw]">
                                <div className="text-white md:px-36 px-12 text-left">
                                    <h2 className="font-semibold md:text-3xl text-xl mb-4">Latest Podcast<span className='text-sky-500'>.</span></h2>
                                    <h4 className="font-bold md:text-5xl text-3xl mb-6">{slide.title}</h4>
                                    <div className='flex items-center space-x-4'>
                                        <button onClick={() => props.startAudio(slide)} className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-2 rounded-full shadow-2xl hover:scale-110">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
                                            </svg>
                                        </button>
                                        <p className='text-xs font-bold'>PLAY EPISODE</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Carousel.Slide>
            ))}
        </Carousel>
    );
}
export default Demo;