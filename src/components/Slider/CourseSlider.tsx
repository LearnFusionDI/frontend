import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

import './courseSlider.css'

import { FreeMode, Pagination } from "swiper/modules";
import Card from "../CardList/Card/Card";

interface Course {
    courseId: string;
    courseTitle: string;
    courseDescription: string;
    courseImage: string;
    coursePlatform: string;
    courseUrl: string;
}

interface Props {
  courses: Array<Course>;
}

const CourseSlider: React.FC<Props> = ({ courses }) => {
  return (
    <>
      <Swiper
        slidesPerView={3}
        spaceBetween={10}
        freeMode={true}
        breakpoints={{
          530: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
        }}
        modules={[FreeMode]}
        className="mySwiper "
      >
        {courses?.map((course) => (
          <SwiperSlide>
            <Card course={course} key={course?.courseId} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default CourseSlider;
