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
    return (
        <div 
            onClick={() => onClick(id)} 
            className={`shadow-xl shadow-gray-500/50 p-2 bg-[#3d5a80] 
                        flex flex-col rounded-lg w-[300px] cursor-pointer 
                        hover:shadow-[#7594bd]`}>
            <Image 
                src={image}
                width={300}
                height={300}
                className={`object-cover rounded-md transition duration-500 
                            ease-in-out filter ${blur ? 'blur-sm opacity-50' : 
                            'blur-0 opacity-100'}`}
            />
            <p className={`text-white text-center font-bold p-2 ${blur ? 'blur-sm opacity-50' : 'blur-0 opacity-100'}`}>{name}</p>

        </div>
    )
}

export default Card;
