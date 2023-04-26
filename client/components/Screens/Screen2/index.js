import React from 'react'
import Image from 'next/legacy/image'

const Screen2 = (props) => {
    const img = props.bg
    return (
        <div
            className="p-12 text-center relative overflow-hidden" style={{ height: "100vh" }}>
            <Image quality="90" priority src={img} layout="fill" objectFit="cover" alt="heroBackdrop" />
            <div style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
                className="absolute top-0 right-0 bottom-0 left-0 w-full h-full overflow-hidden bg-fixed">
                <div className="flex justify-center items-center h-full">
                    <div className="text-white">
                        <h1 className="font-semibold sm:text-5xl text-4xl mb-4 jumbotron-title capitalize">{props.title}</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Screen2
