import { useState, useEffect} from 'react';
import Card from './components/Card'
import Modal from './components/Modal'
import type {Cat} from './data'
import apiCall from './api'


const App = () => {
    const [cats, setCats] = useState<Cat[]>([]);
    const [open, setOpen] = useState(false)

    useEffect(() => {
        const findId = cats.find((cat) => cat.clickCount >=2);

        if (findId) alert(`Duplicate clicks goes to ID: ${findId.id}`)
    }, [cats])

    // load cats from the api
    useEffect(() => {
        apiCall().then(setCats);
    }, []);

    const shuffleCards = (params: Cat[]) => { 
        const arr = [...params];
        let i = arr.length;

        while (i > 0) {
            const j = Math.floor(Math.random() * i);
            i--;

            [arr[i], arr[j]] = [arr[j], arr[i]]; 
        }

        return arr;
    }

    const onClick = (id: string) => {
        setCats(prev => {
            const updated = prev.map(cat => cat.id === id ? { ...cat, clickCount: cat.clickCount +1 } : cat);
            return shuffleCards(updated)
        })

    };

    useEffect(() => {console.log(cats)}, [cats])


    return (
        <div className="flex justify-center gap-10">
            {cats.map((cat) => (
                <Card
                    key={cat.id}
                    id={cat.id}
                    image={`https://cataas.com/cat/${cat.id}`}
                    name={cat.tags?.join(" ") || "Random cat"}
                    onClick={onClick}
                />
            ))}

            <Modal />
        </div>
    )
}

export default App
