import ScoreBoard from './ScoreBoard';
import {Select, SelectItem} from "@heroui/react";

const levels = [
    { label: 'Easy  [5] -- (piece of cake)', value: 5 },
    { label: 'Medium  [12] -- (tricky whiskers)', value: 12 },
    { label: 'Hard  [20] -- (Paws of doom)', value: 20 },
    { label: 'Impossible  [35] -- (Nine-lives challenge)', value: 35 }
]

const Header = ({score, bestScore, selectedValue, onChange} : 
    {score: number, bestScore: number, selectedValue: number, onChange: (value: number) => void;}) => {
    return (
        <div className="relative flex justify-between w-full px-5 sm:px-10 py-5">    
            <div className="flex flex-col gap-2">
                <h2 className="text-1xl sm:text-2xl text-[#333] font-bold">Memory Cat Game</h2>
                <p className="text-[#333] text-[11px] sm:text-base">Click each card only <i className="text-[#3d5a80] font-bold text-shadow-2xs">once </i> or the cat will laugh right in your face.</p>

                <div>

                    <Select 
                        className="max-w-full" 
                        variant="bordered" 
                        label="Levels" 
                        placeholder="Select difficulty"
                        selectedKeys={[String(selectedValue)]} // convert into String in order to display selected values
                        onSelectionChange={(keys) => {
                            const key = Array.from(keys)[0] 
                            onChange(Number(key));
                        }}
                    >
                        {levels.map((level) => (
                            <SelectItem key={level.value}>
                                {level.label}
                            </SelectItem>
                        ))}
                    </Select>
                </div>
            </div>

            <ScoreBoard
                score={score}
                bestScore={bestScore}
            />
        </div>
    )
}

export default Header
