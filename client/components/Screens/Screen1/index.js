import { Carousel } from '@mantine/carousel';
import { useMediaQuery } from '@mantine/hooks';
import { createStyles, Paper, Text, Title, Button, useMantineTheme, getStylesRef } from '@mantine/core';
import Autoplay from 'embla-carousel-autoplay';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import axios from "axios"
import { getallpodcasts } from '@/pages/api/apiroutes';
import Card from '@/components/Card';






export function CardsCarousel() {
    const [podcasts,setPodcasts] = useState([])

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

    const autoplay = useRef(Autoplay({ delay: 4000 }));
    const theme = useMantineTheme();
    const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm}px)`);
    const slides = podcasts.map((item) => (
        <Carousel.Slide key={item.title}>
            <Card {...item} image="./podcast.jpg" speaker={item.creator} />
        </Carousel.Slide>
    ));

    return (
        <div>
            <h1 className='text-center mt-10 font-bold lg:text-4xl md:text-3xl text-2xl overflow-visible'>Most Popular<span className="text-sky-500">.</span></h1>
            <Carousel
                slideSize="33%"
                breakpoints={[{ maxWidth: 'sm', slideSize: '100%', slideGap: 1 }]}
                slideGap="xl"
                align="start"
                slidesToScroll={1}
                className="my-10 md:px-5 px-2 overflow-visible"
                loop
                plugins={[autoplay.current]}
                withControls={false}
            >
                {slides}
            </Carousel>
        </div>
    );
}

export default CardsCarousel;