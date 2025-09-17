import { useState, useEffect } from 'react';
import Modal from './components/Modal'
import Main from './components/Main'
import ScoreBoard from './components/ScoreBoard'
import type { Cat } from './cataas'
import cataas from './cataas'


const App = () => {
    const [cats, setCats] = useState<Cat[]>([]);
    const [onBlur, setOnBlur] = useState(false);
    const [score, setScore] = useState(0); 
    const [bestScore, setBestScore] = useState(() => {
        const current = localStorage.getItem('currentBest');
        return current ? JSON.parse(current) : 0;
    }); 


    // load cats
    useEffect(() => {
        const {getCats} = cataas();
        getCats().then(setCats)
    }, []);

    useEffect(() => {
        const duplicate = cats.find((cat) => cat.clickCount >= 2);
        if (duplicate) {
            alert(`Duplicate clicks goes to ID: ${duplicate.id}`)
            setBestScore(JSON.parse(localStorage.getItem('currentBest') || ''))
            return;
        }     

        const newScore = cats.filter(cat => cat.clickCount === 1).length;
        setScore(newScore);

        if (cats.every(cat => cat.clickCount === 1)) {
            console.log('You win')

            const currentBest = JSON.parse(localStorage.getItem('currentBest') || '0');

            if (newScore > currentBest) {
                localStorage.setItem('currentBest', JSON.stringify(newScore));
            }

            setBestScore(JSON.parse(localStorage.getItem('currentBest') || '0'))
        }

        cats.forEach((cat) => {
            if (cat.clickCount.toString().includes('1')) {
                setScore(score+1);
            }
        }) 

    }, [cats])

    const getBestScore = () => {
        if (localStorage.getItem('currentBest') === null) {
            localStorage.setItem('currentBest', JSON.stringify(0))
        }

        const currentScore = score;

        const getScore = JSON.parse(localStorage.getItem('currentBest') || '')

        if (getScore > currentScore) return;

        if (getScore < currentScore.toString()) {
            localStorage.setItem('currentBest', JSON.stringify(currentScore))
        }
    }

    getBestScore();

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
        setOnBlur(true)

        setTimeout(() => {
            setCats(prev => {
                const updated = prev.map(cat => cat.id === id ? { ...cat, clickCount: cat.clickCount +1 } : cat);
                return shuffleCards(updated)
            })

        setOnBlur(false)

        }, 600)

    };

    // useEffect(() => {console.log(cats)}, [cats])

    return (
        <div className="flex flex-col border relative justify-center items-center h-screen w-screen">
            <ScoreBoard 
                score={score}
                bestScore={bestScore}
            />

            <Main
                cats={cats}
                onClick={onClick}
                onBlur={onBlur}
            />

            <Modal />
            
        </div>
    )
}

export default App
