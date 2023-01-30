import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

function Carousel({ carouselTitle, carouselData}) {
  const [slidesCount, setSlidesCount] = useState(4);

  useEffect(() => {
    setSlidesCount(window.innerWidth < 768 ? 2 : window.innerWidth >= 769 && window.innerWidth <= 1024 ? 3 : 4);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  },[]);
  
  const handleResize = () => {
    setSlidesCount(window.innerWidth < 768 ? 2 : window.innerWidth >= 769 && window.innerWidth <= 1024 ? 3 : 4);
  }

  return (
    <Wrapper>
      <h3>{carouselTitle}</h3>
      <CarouselContainer
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={12}
        slidesPerView={slidesCount}
        navigation={false}
        pagination={{ clickable: true }}
        scrollbar={false}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log('slide change')}
      >
        {carouselData.map((item) => {
        return (
          <Card key={item.id}>
            <Link to={'/recipe/' + item.id}>
              <img src={item.image} alt={item.title} />
              <p>{item.title}</p>
            </Link>
          </Card>
        );
      })}
      </CarouselContainer>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  text-align: center;

  h3 {
    text-align: left;
    font-size: 2rem;
    font-weight: 600;
    margin-bottom: 2rem;
  }

  img {
    position: relative;
    width: 100%;
    border-radius: 0.5rem;
  }
`;

const CarouselContainer = styled(Swiper)`
  padding-bottom: 0.8rem;

  .swiper-pagination {
    bottom: -4px;
  }
`

const Card = styled(SwiperSlide)`
  position: relative;

  p {
    position: absolute;
    bottom: 1rem;
    color: #fff;
    font-weight: 500;
    text-shadow: 0px 2px 5px rgba(0, 0, 0, 1.0);
  }

`;

export default Carousel
