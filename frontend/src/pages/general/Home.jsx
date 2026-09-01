import React, { useEffect, useRef, useState } from 'react'

import '../../styles/reels.css'

import { useNavigate ,Link} from 'react-router-dom'

import axios from 'axios'

const Home = () => {

    const [videos, setVideos] = useState([])

    const videoRefs = useRef(new Map())

    const containerRef = useRef(null)

    useEffect(() => {

        const observer = new IntersectionObserver(

            (entries) => {

                entries.forEach((entry) => {

                    const video = entry.target

                    if (!(video instanceof HTMLVideoElement)) return

                    if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {

                        video.play().catch(() => {
                            // ignore autoplay errors
                        })

                    } else {

                        video.pause()

                    }

                })

            },

            {
                threshold: [0.6]
            }

        )

        videoRefs.current.forEach((video) => {
            observer.observe(video)
        })

        return () => {
            observer.disconnect()
        }

    }, [videos])


    useEffect(() => {

        axios.get('http://localhost:3000/api/food',{withCredentials:true})
            .then(response => {

                setVideos(response.data.foodItems)

            })

    }, [])


    const setVideoRef = (id) => (el) => {

        if (!el) {
            videoRefs.current.delete(id)
            return
        }

        videoRefs.current.set(id, el)

    }


    return (

        <div ref={containerRef} className='reels-page'>

            <div className='reels-feed' role='list'>

                {videos.map((item) => (

                    <section key={item._id} className='reel' role='listitem'>

                        <video
                            ref={setVideoRef(item._id)}
                            className='reel-video'
                            src={item.video}
                            muted
                            playsInline
                            loop
                            preload='metadata'
                        />

                        <div className='reel-overlay'>

                            <div
                                className='reel-overlay-gradient'
                                aria-hidden="true"
                            />

                            <div className='reel-content'>

                                <p
                                    className='reel-description'
                                    title={item.description}
                                >
                                    {item.description}
                                </p>

                                <Link
                                    className='reel-btn'
                                    to={"/food-partner/"+item.foodPartner}
                                    aria-label='Visit store'
                                >
                                    Video
                                </Link>

                            </div>

                        </div>

                    </section>

                ))}

            </div>

        </div>

    )

}

export default Home;