const Modal = ({open, onClose, children}) => {
    return (
        <div onClick={onClose} className={`
            absolute z-10 inset-0 flex justify-center items-center border bg-blue-100 w-[300px] h-[300px] 
            ${open ? 'invisible' : 'visible'}`} 
        >
            <button className="border">Close</button>
        </div>
    )
}

export default Modal;
