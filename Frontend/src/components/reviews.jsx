import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { useState, useEffect, useCallback } from 'react';
import Button from '../utils/button';
import UseTheme from '../hooks/UseTheme';

const reviews = [
  {
    name: "Carlos Mendoza",
    role: "Emprendedor",
    comment: "Simple, rápida y muy intuitiva. Justo lo que necesitaba.",
  },
  {
    name: "Ana Pardo",
    role: "Marketing",
    comment: "Me encanta poder personalizar mis enlaces.",
  },
  {
    name: "Alfonso Rodriguez",
    role: "Developer",
    comment: "La interfaz es limpia y muy rápida.",
  },
   {
    name: "Ismael Alvarado",
    role: "Estudiante",
    comment: "Perfecto para apoyar a mis estudios",
  },
];

const ReviewsSlider = () => {

    const [ selectedIndex, setSelectedIndex ] = useState(0);
    const [ scrollSnaps, setScrollSnaps ] = useState([]);

    const {theme} = UseTheme();

    const [emblaRef, emblaApi] = useEmblaCarousel(
        { 
            loop: true,
            align: "start"
        },
        [Autoplay({delay: 3500, stopOnInteraction: false})]
        );
    
    const onSelect = useCallback(()=>{
        if(!emblaApi) return;

        setSelectedIndex(emblaApi.selectedScrollSnap());
    },[emblaApi]);

    useEffect(()=>{
        if(!emblaApi) return; 

        setScrollSnaps(emblaApi.scrollSnapList());
        emblaApi.on("select", onSelect);
        onSelect();
    }, [emblaApi, onSelect]);

    const clickEvent = (index)=> ()=>{
        emblaApi.scrollTo(index);
    }

  return (
    <div className="my-8">
        <h3 className="text-sm lg:text-2xl font-bold text-center mb-10 text-cyan-500">
            Lo que dicen nuestros usuarios
        </h3>
        <div className="overflow-hidden w-full" ref={emblaRef}>
            <div className="flex">
                 {reviews.map((review, index)=>
                    (
                        <div 
                            key={index}
                            className="basis-full shrink-0 md:basis-1/2 lg:basis-1/3"
                        >
                            <div className="px-3">
                                <div className={`${theme === 'dark' ? 'bg-black/25' : 'bg-gray-50'} p-6 rounded-2xl shadow-lg h-full`}>
                                    <p className="mb-4 text-sm md:text-base">
                                        "{review.comment}"
                                    </p>
                                    <p className="font-bold">{review.name}</p>
                                    <p className="font-semibold text-sm opacity-75">{review.role}</p>
                                </div>
                            </div>
                        </div>
                    )
                 )}
            </div>
        </div>
        <div className="flex justify-center gap-2 my-4">
            {scrollSnaps.map((_, index)=>(
                <Button
                    key={index}
                    handleClick={clickEvent(index)}
                    className={`h-2 w-2 rounded-full transition ${
                    index === selectedIndex
                        ? "bg-cyan-500 w-6"
                        : "bg-gray-300"
                    }`}
                >
                </Button>
            ))}
        </div>
    </div>
  );
};

export default ReviewsSlider;
