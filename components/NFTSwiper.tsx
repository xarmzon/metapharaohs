import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper'
import 'swiper/css'

import Image from 'next/image'

const NFTSwiper = () => {
  return (
    <section
      // data-aos="flip-up"
      // data-aos-delay="400"
      className="max-container mt-3 w-[90%]"
    >
      <Swiper
        breakpoints={{
          320: {
            slidesPerView: 4,
            spaceBetween: 1,
          },
          768: {
            slidesPerView: 6,
            spaceBetween: 10,
          },
        }}
        autoplay={true}
        loop={true}
        modules={[Autoplay]}
      >
        {[...Array(8)].map((_, i) => (
          <SwiperSlide key={i}>
            <div className="relative h-16 w-16 overflow-hidden rounded-sm bg-slate-200 md:h-24 md:w-24 md:rounded-lg">
              <Image
                src={`/nft/fm_${i + 1}.png`}
                layout="fill"
                objectFit="cover"
                alt={`image-${i + 1}`}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}

export default NFTSwiper
