import { useState, useEffect } from 'react';
import Modal from './components/Modal'
import Main from './components/Main'
import Header from './components/Header'
import type { Cat } from './cataas'
import cataas from './cataas'
import audio from './audio'
import cat_laughing from './assets/cat_laughing.mp3'
import yehey from './assets/yehey.mp3'
import dance from './assets/dance.gif';
import laughing from './assets/laughing.gif';

const images = {
    win: dance,
    lose: laughing,
}

const App = () => {
    const [cats, setCats] = useState<Cat[]>([]);
    const [onBlur, setOnBlur] = useState(false);
    const [score, setScore] = useState(0); 
    const [message, setMessage] = useState('')
    const [image, setImage] = useState('')
    const [textButton, setTextButton] = useState('');
    const [shadowColor, setShadowColor] = useState('')
    const [opacity, setOpacity] = useState(false)
    const [btnColor, setBtnColor] = useState<'primary'|'danger'>('primary');
    const [modal, setModal] = useState(false);
    const [selectedValue, setSelectedValue] = useState<number>(5)
    const [bestScore, setBestScore] = useState(() => {
        const current = localStorage.getItem('currentBest');
        return current ? JSON.parse(current) : 0;
    }); 

    // load cats
    useEffect(() => {
        const {getCats} = cataas();
        getCats(Number(selectedValue)).then(setCats);
    }, []);

    useEffect(() => {
        if (cats.length === 0) return; // disable modal initially
        
        const duplicate = cats.find((cat) => cat.clickCount >= 2);
        if (duplicate) {
            audio(cat_laughing)
            setMessage('You Lose!')
            setTextButton('Try again')
            setBtnColor('danger')
            setShadowColor('#ff9999')
            setModal(true)
            setOpacity(true)
            setImage(images.lose)
            setBestScore(JSON.parse(localStorage.getItem('currentBest') || ''))
            return;
        }     

        const newScore = cats.filter(cat => cat.clickCount === 1).length;
        setScore(newScore);

        if (cats.every(cat => cat.clickCount === 1)) {
            audio(yehey)
            setMessage('You win!')
            setTextButton('Ok')
            setBtnColor('primary')
            setShadowColor('#7594bd')
            setModal(true)
            setOpacity(true)
            setImage(images.win)
            const currentBest = JSON.parse(localStorage.getItem('currentBest') || '0');

            if (newScore > currentBest) {
                localStorage.setItem('currentBest', JSON.stringify(newScore));
            }

            setBestScore(JSON.parse(localStorage.getItem('currentBest') || '0'))
        }

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

    const selectLevel = (cardCount: number) => {
        const {getCats} = cataas();
        getCats(cardCount).then(setCats)
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

    const onClose = () => {
        const {getCats} = cataas();
        getCats(selectedValue).then(setCats)
        setModal(false)
        setScore(0)
        setOpacity(false)
    }

    useEffect(() => {console.log('selectedValue: ',selectedValue)}, [selectedValue])

    return (
        <div className="flex flex-col h-full relative items-center pb-10">
            <div className="w-full">
                <Header 
                    score={score}
                    bestScore={bestScore}
                    selectedValue={selectedValue}
                    onChange={(value) => {
                        setSelectedValue(value);
                        selectLevel(value)
                    }}
                />

                <Main
                    cats={cats}
                    onClick={onClick}
                    onBlur={onBlur}
                    opacity={opacity}
                />

                <Modal 
                    message={message}
                    image={image}
                    onOpen={modal}
                    onClose={onClose}
                    text={textButton}
                    btnColor={btnColor}
                    shadowColor={shadowColor}
                />
            </div>
        </div>
    )
}

export default App
