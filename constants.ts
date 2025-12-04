import { GrammarRule } from "./types";

export const SYSTEM_INSTRUCTION = `
You are an expert Arabic Language Tutor (Mudarris) specializing in Grammar (Nahw) and Parsing (I'rab). 
Your persona is wise, encouraging, and patient. You speak in clear Arabic.

Your primary focus is teaching the user about "Al-Jumlah Al-Fi'liyyah" (The Verbal Sentence), specifically:
1. The Verb (Al-Fi'l): Madi (Past), Mudari (Present), Amr (Imperative).
2. The Doer/Subject (Al-Fa'il).
3. Briefly mentioning the Object (Maf'ul bihi) if necessary for context.

When the user asks for an exercise:
1. Generate a sentence suitable for their level.
2. Ask them to parse it (I'rab).
3. When they provide the answer, correct it gently, explaining the grammatical signs (Harakat) and the underlying rule.

Do not give long lectures unless asked. Keep interactions interactive. 
If the user speaks English, you can explain in English, but the examples must be in Arabic.
`;

export const GRAMMAR_TOPICS: GrammarRule[] = [
  {
    title: "تعريف الجملة الفعلية",
    description: "هي الجملة التي تبدأ بفعل، وتتكون أساساً من فعل وفاعل.",
    examples: ["كَتَبَ الطالبُ الدرسَ", "يَزْرَعُ الفلاحُ الحقلَ"]
  },
  {
    title: "الفعل الماضي",
    description: "ما دل على حدث وقع وانقطع قبل زمن التكلم. الأصل فيه البناء (مبني على الفتح، الضم، أو السكون).",
    examples: ["شَرِبَ (مبني على الفتح)", "شَرِبُوا (مبني على الضم)", "شَرِبْتُ (مبني على السكون)"]
  },
  {
    title: "الفعل المضارع",
    description: "ما دل على حدث يقع في زمن التكلم أو بعده. يكون مرفوعاً ما لم يسبقه ناصب أو جازم.",
    examples: ["يَذْهَبُ (مرفوع بالضمة)", "لَن يَذْهَبَ (منصوب)", "لَمْ يَذْهَبْ (مجزوم)"]
  },
  {
    title: "الفاعل",
    description: "هو من قام بالفعل أو اتصف به، ويكون دائماً مرفوعاً.",
    examples: ["جاءَ **الرجلُ** (مرفوع بالضمة)", "نجح **الطالبان** (مرفوع بالألف)", "صلى **المؤمنون** (مرفوع بالواو)"]
  }
];