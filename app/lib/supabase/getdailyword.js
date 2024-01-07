import { getDailyIndex } from '../../data/helpers'
import { supabase } from '../../lib/supabase/supabase.mjs';

export const GetDailyWord = (async() => {
    const wordIndex = getDailyIndex() + 1;
    console.log('word index is: ' + wordIndex)
    
        // get data for the day's word
        const { data } = await supabase.from('words-prod').select('word').eq('index', wordIndex);
        const wordData = data[0]
        return wordData.word
})
