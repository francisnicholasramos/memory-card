import Card from './Card';
import type {Cat} from '../cataas'

type MainProps = {
    cats: Cat[]; 
    onClick: (id:string) => void; 
    onBlur: boolean;
}

const Main: React.FC<MainProps> = ({cats, onClick, onBlur}) => {
    return (
        <div className="flex flex-wrap justify-center gap-10">
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
