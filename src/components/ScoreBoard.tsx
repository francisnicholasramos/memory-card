const ScoreBoard = ({score, bestScore} : {score: number, bestScore: number;}) => {
    return (
        <div>
            <p>Score: {score}</p>
            <p>Best score: {bestScore}</p>
        </div>
    );
};

export default ScoreBoard;
