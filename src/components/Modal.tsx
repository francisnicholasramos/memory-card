import {Button} from '@heroui/react';

const Modal = ({onOpen, onClose, image, message, text, btnColor, shadowColor} : 
    {onOpen: boolean, 
     image: string, 
     onClose: () => void, 
     message: string, 
     text: string, 
     btnColor: 'primary' | 'danger',
     shadowColor: string
}) => {

    const btnSize = () => {
        if (window.innerWidth < 640) return "sm";  
        if (window.innerWidth < 768) return "md";
        return "md";
    }

    return (
        <div 
            className={`
                fixed inset-0 z-50 flex justify-center items-center
                ${onOpen ? 'visible' : 'invisible'}
            `}
        >
            {/* Background overlay */}
            <div 
                className="absolute inset-0 bg-opacity-50"
            />

            <div 
                className={`
                    relative z-10 gap-2 p-2 flex flex-col justify-between items-center 
                    shadow-xl drop-shadow-xl rounded-lg bg-white shadow-[${shadowColor}] 
                    w-[300px] sm:w-[300px] md:w-[450px]
                    h-[300px] sm:h-[300px] md:h-[400px]  
                    bg-cover bg-center 
                `} 
                style={{
                    backgroundImage: `url(${image})`
                }}
            >
                <h2 className="text-xl text-center p-2 rounded-md bg-white">{message}</h2>
                <div className="flex justify-end">
                    <Button radius="sm" size={btnSize()} color={btnColor} onClick={onClose}>
                        {text}
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Modal;
