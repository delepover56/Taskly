import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const FILTERS = [
  { key: "all", label: "All Tasks" },
  { key: "completed", label: "Completed" },
  { key: "pending", label: "Pending" },
  { key: "favorites", label: "Favorites" },
];

const MobileFilter = () => {
  return (
    <div className="my-4 px-1 sm:hidden">
      <div className="taskly-glass p-2.5">
        <Swiper slidesPerView={2.35} spaceBetween={10} className="w-full">
          {FILTERS.map((filter) => (
            <SwiperSlide key={filter.key} className="!w-auto">
              <button
                type="button"
                className="
                  taskly-para
                  w-full
                  px-4.5
                  py-2.5
                  text-sm
                  rounded-xl
                  border
                  border-white/10
                  bg-white/[0.07]
                  text-white/80
                  whitespace-nowrap
                  cursor-pointer
                  select-none
                  transition-all
                  duration-200

                  hover:bg-white/15
                  hover:border-white/30
                  hover:text-white
                  hover:shadow-[0_0_16px_rgba(148,97,180,0.25)]

                  active:scale-[0.96]
                  active:bg-white/20
                "
              >
                {filter.label}
              </button>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default MobileFilter;
