const Modal = ({open, onClose, children}) => {
    return (
        <div onClick={onClose} className={`
            fixed inset-0 flex justify-center items-center border w-[300px] h-[300px] 
            ${open ? 'invisible' : 'visible'}`} 
        >
            <button className="border">Close</button>
        </div>
    )
}

export default Modal;
