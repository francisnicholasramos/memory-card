import Card from './Card';
import type {Cat} from '../cataas'

type MainProps = {
    cats: Cat[]; 
    onClick: (id:string) => void; 
    onBlur: boolean;
    opacity: boolean;
}

const Main: React.FC<MainProps> = ({cats, onClick, onBlur, opacity}) => {
    return (
        <div className={`
                flex flex-wrap 
                justify-center sm:justify-between 
                px-5 sm:px-10 gap-3 
                [@media(min-width:425px)]:justify-between
                overflow-hidden
                ${opacity ? 'opacity-50' : ''}`
        }>

            {cats.map((cat) => (
                <Card
                    key={cat.id}
                    id={cat.id}
                    image={cat.url}
                    name={cat.tags?.join(" ") || "random cat"}
                    onClick={onClick}
                    blur={onBlur}
                />
            ))}

        </div>
    )
}

export default Main
