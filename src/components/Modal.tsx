import {Button, Image} from '@heroui/react';

const Modal = ({onOpen, onClose, image, message} : 
    {onOpen: boolean, image: string, onClose: () => void, message: string}) => {

    const btnSize = () => {
        if (window.innerWidth < 640) return "sm";  
        if (window.innerWidth < 768) return "md";
        return "md";
    }

    const width = () => {
        if (typeof window !== 'undefined') {
            if (window.innerWidth < 640) return 280; // mobile
            if (window.innerWidth < 768) return 320; // small tablet
            if (window.innerWidth < 1024) return 400; // tablet
            return 450; // desktop
        }
        return 320; // fallback
    };

    const height = () => {
        if (typeof window !== 'undefined') {
            if (window.innerWidth < 640) return 180; // mobile
            if (window.innerWidth < 768) return 200; // small tablet  
            if (window.innerWidth < 1024) return 250; // tablet
            return 280; // desktop
        }
        return 200; // fallback
    };

    return (
        <div 
            className={`
            absolute z-10 p-4 flex flex-col border rounded-lg bg-white 
            w-[300px] sm:w-[300px] md:w-[450px]
            h-[300px] sm:h-[300px] md:h-[400px]  
            ${onOpen ? 'invisible' : 'visible'}`} 
        >
            <div className="flex items-center justify-center">
                <h2 className="text-xl text-center">{message}</h2>
            </div>

            <div className="flex p-1 justify-center h-full w-full">
                <Image
                    src={image || undefined}
                    width={width()}
                    height={height()}
                    className="object-cover rounded-md h-full w-ful"
                />
            </div>

            <div className="flex justify-end gap-4 p-3 ">
                {/** <Button radius="sm" size={btnSize()} color="default" className="">Cancel</Button> **/}
                <Button radius="sm" size={btnSize()} color="primary" onClick={onClose}>Ok</Button>
            </div>
        </div>
    )
}

export default Modal;
