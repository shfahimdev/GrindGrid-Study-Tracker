// Parsed syllabus data
export interface SyllabusData {
    [subject: string]: {
        [section: string]: string[];
    };
}

const syllabusData: SyllabusData = {
    বাংলা: {
        "প্রথম পত্র": [
            "অপরিচিতা",
            "বিলাসী",
            "মাসি-পিসি",
            "রেইনকোট",
            "বাঙ্গালার নব্য লেখকদের প্রতি নিবেদন",
            "যৌবনের গান",
            "সাহিত্য খেলা",
            "আহ্বান",
            "জীবন ও বৃক্ষ",
            "গল্পবুক কাবুল",
            "কপিলদাস মুর্মুর শেষ কাজ",
            "নেকলেস",
            "কারখানা প্রান্তরে",
            "প্রতিদান",
            "তাহারে পরে মনে",
            "আঠারো বছর বয়স",
            "সোনার তরী",
            "বিদ্রোহী",
            "ফেব্রুয়ারি ১৯৬৯",
            "বিভীষণের প্রতি মেঘনাদ",
            "আমি কিংবদন্তীর কথা বলছি",
            "প্রত্যবর্তন",
            "লজ্জা",
            "ক্ষুধা ও তৃষ্ণা",
            "পদ্মা",
            "সুচেতনা",
            "সুখ",
            "লালসালু",
            "সিরাজউদ্দৌলা",
        ],
        "দ্বিতীয় পত্র": [
            "বাংলা ভাষা",
            "উচ্চারণের নিয়ম",
            "ধ্বনি তত্ত্ব",
            "ধ্বনির পরিবর্তন",
            "ণ-ত্ব বিধান, ষ-ত্ব বিধান",
            "সন্ধি",
            "বাংলা বানানের নিয়ম",
            "বাংলা ভাসার ব্যাকরণিক শব্দশ্রেণি",
            "পুরুষ ও স্ত্রীবাচক শব্দ, দ্বিরুক্ত শব্দ, বচন, সংখ্যাবাচক শব্দ",
            "উপসর্গ",
            "পদাশ্রিত নির্দেশক",
            "বাক্যতত্ত্ব",
            "সমাস",
            "ধাতু",
            "প্রকৃতি ও প্রত্যয়",
            "বাংলা ভাষার অপপ্রয়োগ ও শুদ্ধ প্রয়োগ",
            "কাল, পুরুষ এবং কালের বিশিষ্ট প্রয়োগ, বাংলা অনুজ্ঞা",
            "পারিভাষিক শব্দ + অনুবাদ",
            "সারমর্ম ও সারাংশ",
            "দিনলিপি লিখন",
            "ভাব-সম্প্রসারণ",
            "প্রতিবেদন রচনা",
            "সংলাপ",
            "বৈদ্যুতিন চিঠি",
            "ক্ষুদে গল্প রচনা",
            "আবেদনপত্র",
            "প্রবন্ধ-নিবন্ধ লিখন",
        ],
    },
    English: {
        "Part 1: Vocabulary Power": [
            "Roots, Prefixes & Suffixes",
            "High-Frequency Word List",
            "Contextual Vocabulary (Sentence Completion, Analogies)",
            "Synonyms & Antonyms",
        ],
        "Part 2: Grammar Foundation": [
            "Parts of Speech Refresher",
            "Sentence Structure & Clauses",
            "Subject-Verb Agreement",
            "Verb Tenses",
            "Modifiers & Parallelism",
            "Pronouns & Agreement",
            "Idioms & Prepositions",
            "Error Identification & Sentence Correction",
        ],
        "Part 3: Reading Mastery": [
            "Skimming & Scanning Techniques",
            "Inference Questions",
            "Tone & Attitude",
            "Main Idea & Summary",
            "Practice with SAT/DU/IBA Passages",
        ],
        "Part 4: Critical Reasoning / Logic": [
            "Argument Structure (Premise vs. Conclusion)",
            "Assumptions",
            "Strengthen / Weaken Questions",
            "Cause & Effect Reasoning",
            "Flaw Detection",
        ],
        "Part 5: Writing & Expression": [
            "Sentence Combining & Conciseness",
            "Paragraph Unity & Coherence",
            "Essay Writing Basics",
            "Argumentative Essay",
            "Analytical/Expository Writing",
        ],
        "Part 6: Exam Practice": [
            "DU Past Paper Analysis",
            "IBA Past Paper Analysis",
            "SAT Full-Length Practice Tests",
        ],
    },
    "তথ্য ও যোগাযোগ প্রযুক্তি": {
        "প্রথম পত্র": [
            "তথ্য ও যোগাযোগ প্রযুক্তি : বিশ্ব ও বাংলাদেশ প্রেক্ষাপট",
            "কমিউনিকেশন সিস্টেমস ও নেটওয়ার্কিং",
            "সংখ্যা পদ্ধতি ও ডিজিটাল ডিভাইস",
            "ওয়েব ডিজাইন পরিচিতি এবং HTML",
            "প্রোগ্রামিং ভাষা",
            "ডেটাবেজ ম্যানেজমেন্ট সিস্টেম",
        ],
    },
    পদার্থবিজ্ঞান: {
        "প্রথম পত্র": [
            "ভৌতজগৎ ও পরিমাপ",
            "ভেক্টর",
            "নিউটনীয় বলবিদ্যা",
            "কাজ, শক্তি ও ক্ষমতা",
            "পদার্থের গাঠনিক ধর্ম",
            "পর্যাবৃত্ত গতি",
            "তরঙ্গ",
            "আদর্শ গ্যাস ও গ্যাসের গতিতত্ত্ব",
        ],
        "দ্বিতীয় পত্র": [
            "তাপের যান্ত্রিক সমতা",
            "চল তড়িৎ",
            "চৌম্বকত্ব",
            "জ্যামিতিক আলোকবিজ্ঞান",
            "ভৌত আলোকবিজ্ঞান",
            "সেমিকন্ডাক্টর ও ইলেকট্রনিক্স",
        ],
    },
    রসায়ন: {
        "প্রথম পত্র": [
            "ল্যাবরেটরীর নিরাপদ ব্যবহার",
            "গুণগত রসায়ন",
            "মৌলের পর্যায়বৃত্ত ধর্ম ও রাসায়নিক বন্ধন",
            "রাসায়নিক পরিবর্তন",
            "কর্মমুখী রসায়ন",
        ],
        "দ্বিতীয় পত্র": [
            "পরিবেশ রসায়ন",
            "জৈব রসায়ন",
            "পরিমাণগত রসায়ন",
            "তড়িৎ রসায়ন",
            "অর্থনৈতিক রসায়ন",
        ],
    },
    "উচ্চতর-গণিত": {
        "প্রথম পত্র": [
            "ম্যাট্রিক্স ও নির্ণায়ক (Matrics & Determinants)",
            "ভেক্টর (Vectors)",
            "সরলরেখা (Straight lines)",
            "বৃত্ত (Circles)",
            "বিন্যাস ও সমাবেশ (Permutations & Combinations)",
            "ত্রিকোণমিতিক অনুপাত (Trigonometric ratios)",
            "সংযুক্ত কোণের ত্রিকোণমিতিক অনুপাত (Trigonometric ratios of associated angles)",
            "ফাংশন ও ফাংশনের লেখচিত্র (Functions and graph of functions)",
            "অন্তরীকরণ (Differentiation)",
            "যোগজীকরণ (Intregrations)",
        ],
        "দ্বিতীয় পত্র": [
            "বাস্তব সংখ্যা ও অসমতা (Real number and Inequalities)",
            "যোগাশ্রয়ী প্রোগ্রাম (Linear programming)",
            "জটিল সংখ্যা (Complex Numbers)",
            "বহুপদী ও বহুপদী সমীকরণ (Polynomials and Polynomials Equations)",
            "দ্বিপদী বিস্তৃতি (Binomial Expansions)",
            "কনিক (Conics)",
            "বিপরীত ত্রিকোণমিতিক ফাংশন ও ত্রিকোণমিতিক সমীকরণ (Inverse Trigonometric Functions and Trigonometric Equations)",
            "স্থিতিবিদ্যা (Statics)",
            "সমতলে বস্তুকণার গতি (Motion of particles in a plane)",
            "বিস্তার পরিমাপ ও সম্ভাবনা (Measures of Dispersions and Probability)",
        ],
    },
    পরিসংখ্যান: {
        "প্রথম পত্র": [
            "পরিসংখ্যান, ব্যাপক ও বিভিন্ন প্রতীকের ধারণা",
            "তথ্য সংগ্রহ, সংক্ষিপ্তকরণ ও উপস্থাপন",
            "কেন্দ্রীয় প্রবণতা",
            "বিভার পরিমাপ",
            "পরিঘাত, বক্রিমতা ও সূচলতা",
            "স্যাম্পেল ও নির্বাচন",
            "কালীন সারি",
            "বাংলাদেশে প্রকাশিত পরিসংখ্যান",
        ],
        "দ্বিতীয় পত্র": [
            "সম্ভাবনা",
            "দ্বৈব চলক ও সম্ভাবনা বিন্যাস",
            "গাণিতিক প্রত্যাশা",
            "তাত্ত্বিক বিন্যাস",
            "স্যাম্পলিং বিন্যাস",
            "পরিমিত বিন্যাস",
            "সূচক সংখ্যা",
            "জনমিতি",
            "জীব পরিসংখ্যান",
        ],
    },
};

// Get all subjects as an array
export const getSubjects = (): string[] => {
    return Object.keys(syllabusData);
};

// Get all topics for a subject
export const getTopicsForSubject = (subject: string): string[] => {
    const subjectData = syllabusData[subject];
    if (!subjectData) return [];

    const topics: string[] = [];
    Object.values(subjectData).forEach((sectionTopics) => {
        topics.push(...sectionTopics);
    });

    return topics;
};

export default syllabusData;
