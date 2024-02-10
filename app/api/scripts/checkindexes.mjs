import { supabase } from "../../lib/supabase/supabase.mjs";

export const loopThroughIndexes = (async() => {


    for (let i = 1; i <= 50; i++) {

        try {
            const { data } = await supabase
            .from("words-prod")
            .select("word, easy_index, examples")
            .eq("easy_index", i);
            const index = data[0].easy_index
            const word = data[0].word;
            const exampleStatus = data[0].examples.length > 0 ? 'there are examples' : 'there are no examples'
            const logString = `the word at index ${index} is ${word} and ${exampleStatus}`;
            console.log(logString)
        } catch (e) {
            console.log(e)
        }
    }
})

await loopThroughIndexes()