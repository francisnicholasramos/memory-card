import {Image} from '@heroui/react';

const Card = ({
    image, 
    name, 
    onClick, 
    id
}: {   
    image: string, 
    name: string,
    onClick: (id: string) => void,
    id: string
}) => {
    return (
        <div onClick={() => onClick(id)} className="shadow-xl shadow-gray-500/50 p-2 bg-[#3d5a80] flex flex-wrap flex-col items-center rounded-lg w-[300px] cursor-pointer hover:shadow-[#7594bd]">
            <Image 
                src={image}
                width={300}
                height={300}
                className="object-cover"
            />
            <p className="text-white font-bold p-2">{name}</p>
        </div>
    )
}

export default Card;
