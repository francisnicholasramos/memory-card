import {Image} from '@heroui/react';

const Card = ({
    image, 
    name, 
    onClick, 
    blur,
    id
}: {   
    image: string, 
    name: string,
    onClick: (id: string) => void,
    blur: boolean,
    id: string
}) => {

    const width = () => {
        if (typeof window !== 'undefined') {
            if (window.innerWidth < 640) return 240; // mobile
            if (window.innerWidth < 768) return 280; // tablet
            return 300; // desktop (default)
        }
        return 300;
    };

    const height = () => {
        if (typeof window !== 'undefined') {
            if (window.innerHeight < 640) return 200; // mobile
            if (window.innerHeight < 768) return 170; // tablet
            return 300; // desktop (default)
        }
        return 300;
    };

    return (
        <div 
            onClick={() => onClick(id)} 
            className={`shadow-xl shadow-gray-500/50 p-2 bg-[#3d5a80] 
                        flex flex-col rounded-lg  cursor-pointer 
                        hover:shadow-[#7594bd]

                        w-[150px] xs:w-[180px] sm:w-[220px] md:w-[280px] lg:w-[300px]                        
        `}>
            <Image 
                src={image}
                width={width()}
                height={height()}
                className={`object-cover rounded-md transition duration-500 
                            ease-in-out filter w-full h-auto ${blur ? 'blur-sm opacity-50' : 
                            'blur-0 opacity-100'}`}
            />
            <p className={`text-white text-center font-bold p-1 sm:p-2 text-xs sm:text-sm md:text-base ${blur ? 'blur-sm opacity-50' : 'blur-0 opacity-100'}`}>{name}</p>

        </div>
    )
}

export default Card;
