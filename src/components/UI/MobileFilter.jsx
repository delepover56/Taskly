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
    <div className="sm:hidden my-6 px-3">
      <div className="taskly-glass p-2">
        <Swiper
          slidesPerView={2.8}
          spaceBetween={15}
          className="w-full"
        >
          {FILTERS.map((filter) => (
            <SwiperSlide key={filter.key} className="!w-auto">
              <button
                type="button"
                className="
                  taskly-para
                  w-full
                  px-4
                  py-2.5
                  text-sm
                  rounded-lg
                  border
                  border-white/10
                  bg-white/10
                  text-white/80
                  whitespace-nowrap
                  cursor-pointer
                  select-none
                  transition-all
                  duration-200

                  hover:bg-white/20
                  hover:border-white/30
                  hover:text-white
                  hover:shadow-[0_0_14px_rgba(148,97,180,0.35)]

                  active:scale-[0.96]
                  active:bg-white/25
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
