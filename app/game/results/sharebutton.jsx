import Button from '@/components/ui/button';
import { useContext } from 'react';
import { copyToClipboard } from '@/data/clipboard';
import { GameContext } from "@/context/GameProvider";

const ShareButton = (() => {

    const { guesses, dailyIndex, answer, gameState, setToastMsg } = useContext(GameContext);

    const winLength = gameState === 'win' ? guesses.length.toString() : 'X'
    const winLengthString = `${winLength}/6`
    const gameNumberString = `Españordle #${dailyIndex + 1}`
    const titleString = `${gameNumberString} ${winLengthString}`

    const getEmojiGrid = (() => {

        const answerArr = answer.split('')
        let shareGrid = ''
        guesses.forEach(( { guess }) => {
            const array = guess.split('')
            for (let i = 0; i < array.length; i++) {
                if (array[i] === answerArr[i]) {
                    shareGrid += '🟩'
                    // console.log(array[i] + 'correct')
                } else if (answerArr.includes(array[i])) {
                    shareGrid += '🟨'
                    // console.log(array[i] + 'misplaced')
                } else {
                    shareGrid += '⬜'
                    // console.log(array[i] + 'incorrect')
                }
            }
            shareGrid += '\n'
        })
        const shareGridString = `${titleString}\n\n${shareGrid}`
        return shareGridString
    })

    const copyText = (async() => {
        try {
            const string = getEmojiGrid()
            await copyToClipboard(string);
            setToastMsg('Results copied to the clipboard!');
        } catch(error) {
            console.error(error);
        }
    })

    return (
        <Button callback={copyText} label={'copy results to clipboard'}>Share</Button>
    )
})
export default ShareButton