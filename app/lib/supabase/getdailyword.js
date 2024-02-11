import { getDailyIndex } from "../../data/helpers.js";
import { supabase } from "../../lib/supabase/supabase.mjs";

// NOT CURRENTLY IN USE
export const GetDailyWord = async (mode) => {
  const wordIndex = getDailyIndex() + 1;

  // get data for the day's word
  const { data } = await supabase
    .from("words-prod")
    .select("word")
    .eq("index", wordIndex);
  const wordData = data[0];
  return wordData.word;
};
