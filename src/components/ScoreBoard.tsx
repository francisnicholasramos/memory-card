export type ScoreBoardProps = {
    score: number;
    bestScore: number;
}

const ScoreBoard = ({score, bestScore} : ScoreBoardProps) => {
    return (
        <div 
            className="
                rounded-lg z-50 bg-[#3d5a80] text-white shadow-xl drop-shadow-xl
                fixed right-5 sm:right-10 top-2 sm:top-5 
                p-1 sm:p-2 text-[9px] sm:text-base  
            ">
            <p>Score: <span className="ml-1 font-bold">{score}</span></p>
            <p>Best score: <span className="ml-1 font-bold">{bestScore}</span></p>
        </div>
    );
};

export default ScoreBoard;
