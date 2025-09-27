class StudyTracker {
    constructor() {
        this.studyData = {
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
                    "ফেব্রুয়ারি ১৯৬৯",
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
                    "বাংলা ভাষার ব্যাকরণিক শব্দশ্রেণি",
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
                    "তথ্য সংগ্রহ, সংক্ষিপ্তকরণ ও উপস্হাপন",
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

        this.progressData = this.loadProgressData();
        this.app = document.getElementById("app");
        this.initializeEventListeners();
        this.render();
        this.updateStats();
    }

    loadProgressData() {
        const saved = localStorage.getItem("studyTrackerProgress");
        return saved ? JSON.parse(saved) : {};
    }

    saveProgressData() {
        localStorage.setItem(
            "studyTrackerProgress",
            JSON.stringify(this.progressData)
        );
    }

    getChapterKey(subject, paper, chapter) {
        return `${subject}_${paper}_${chapter}`;
    }

    getChapterData(subject, paper, chapter) {
        const key = this.getChapterKey(subject, paper, chapter);
        return (
            this.progressData[key] || {
                status: "not-started",
                ratings: {
                    "Academic Class": 0,
                    "Test Paper": 0,
                    "Engineering QB": 0,
                },
                notes: "",
                sessions: 0,
                lastStudied: null,
                completed: false,
                completedDate: null,
            }
        );
    }

    updateChapterData(subject, paper, chapter, data) {
        const key = this.getChapterKey(subject, paper, chapter);
        this.progressData[key] = {
            ...this.getChapterData(subject, paper, chapter),
            ...data,
        };
        this.saveProgressData();
        this.updateStats();
    }

    markComplete(subject, paper, chapter) {
        const currentData = this.getChapterData(subject, paper, chapter);
        const newStatus = !currentData.completed;

        this.updateChapterData(subject, paper, chapter, {
            completed: newStatus,
            status: newStatus ? "completed" : "not-started",
            completedDate: newStatus ? new Date().toISOString() : null,
        });

        this.showToast(
            newStatus
                ? "Chapter marked as completed! 🎉"
                : "Chapter marked as incomplete"
        );
        this.render();
    }

    addStudySession(subject, paper, chapter) {
        const currentData = this.getChapterData(subject, paper, chapter);
        const newSessions = currentData.sessions + 1;

        this.updateChapterData(subject, paper, chapter, {
            sessions: newSessions,
            lastStudied: new Date().toISOString(),
            status: currentData.completed ? "completed" : "in-progress",
        });

        this.showToast(`Study session added! Total: ${newSessions} 📚`);
        this.render();
    }

    getAllChapters() {
        const chapters = [];
        Object.entries(this.studyData).forEach(([subject, papers]) => {
            Object.entries(papers).forEach(([paper, chapterList]) => {
                chapterList.forEach((chapter) => {
                    chapters.push({ subject, paper, chapter });
                });
            });
        });
        return chapters;
    }

    getCompletedChapters() {
        return this.getAllChapters().filter(
            ({ subject, paper, chapter }) =>
                this.getChapterData(subject, paper, chapter).completed
        );
    }

    getTotalSessions() {
        return this.getAllChapters().reduce(
            (total, { subject, paper, chapter }) =>
                total + this.getChapterData(subject, paper, chapter).sessions,
            0
        );
    }

    getStudyStreak() {
        const sessions = this.getAllChapters()
            .map(
                ({ subject, paper, chapter }) =>
                    this.getChapterData(subject, paper, chapter).lastStudied
            )
            .filter((date) => date)
            .map((date) => new Date(date))
            .sort((a, b) => b - a);

        if (sessions.length === 0) return 0;

        let streak = 0;
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        for (let i = 0; i < sessions.length; i++) {
            const sessionDate = new Date(sessions[i]);
            sessionDate.setHours(0, 0, 0, 0);

            const daysDiff = Math.floor(
                (today - sessionDate) / (1000 * 60 * 60 * 24)
            );

            if (daysDiff === streak || (streak === 0 && daysDiff <= 1)) {
                if (daysDiff === streak) streak++;
            } else {
                break;
            }
        }

        return streak;
    }

    getSubjectProgress(subject) {
        const chapters = this.getAllChapters().filter(
            (item) => item.subject === subject
        );
        const completed = chapters.filter(
            ({ subject, paper, chapter }) =>
                this.getChapterData(subject, paper, chapter).completed
        ).length;
        return chapters.length > 0
            ? Math.round((completed / chapters.length) * 100)
            : 0;
    }

    getPaperProgress(subject, paper) {
        const chapters = this.studyData[subject][paper];
        const completed = chapters.filter(
            (chapter) => this.getChapterData(subject, paper, chapter).completed
        ).length;
        return chapters.length > 0
            ? Math.round((completed / chapters.length) * 100)
            : 0;
    }

    updateStats() {
        const totalChapters = this.getAllChapters().length;
        const completedChapters = this.getCompletedChapters().length;
        const overallProgress =
            totalChapters > 0
                ? Math.round((completedChapters / totalChapters) * 100)
                : 0;

        document.getElementById("total-chapters").textContent = totalChapters;
        document.getElementById("completed-chapters").textContent =
            completedChapters;
        document.getElementById("study-streak").textContent =
            this.getStudyStreak();
        document.getElementById("total-sessions").textContent =
            this.getTotalSessions();

        document.getElementById(
            "overall-progress"
        ).style.width = `${overallProgress}%`;
        document.getElementById(
            "overall-percentage"
        ).textContent = `${overallProgress}%`;
    }

    createCollapsible(title, isPaper = false, progress = 0) {
        const container = document.createElement("div");
        container.className = isPaper ? "paper" : "subject";

        const header = document.createElement("div");
        header.className = isPaper ? "paper-header" : "subject-header";

        const headerInfo = document.createElement("div");
        headerInfo.className = "header-info";

        const text = document.createElement("span");
        text.textContent = title;

        const progressCircle = document.createElement("div");
        progressCircle.className = "progress-circle";
        progressCircle.textContent = `${progress}%`;

        headerInfo.appendChild(text);
        headerInfo.appendChild(progressCircle);

        const arrow = document.createElement("span");
        arrow.className = "arrow";
        arrow.textContent = "▶";

        header.appendChild(headerInfo);
        header.appendChild(arrow);

        const content = document.createElement("div");
        content.className = "content";

        header.addEventListener("click", () => {
            const isOpen = content.style.display === "block";
            content.style.display = isOpen ? "none" : "block";
            arrow.classList.toggle("rotate", !isOpen);
        });

        container.appendChild(header);
        container.appendChild(content);

        return { container, content };
    }

    createChapterElement(subject, paper, chapter) {
        const chapterData = this.getChapterData(subject, paper, chapter);
        const chapterDiv = document.createElement("div");
        chapterDiv.className = `chapter ${chapterData.status}`;

        // Chapter Header
        const chapterHeader = document.createElement("div");
        chapterHeader.className = "chapter-header";

        const chapterTitle = document.createElement("div");
        chapterTitle.className = "chapter-title";
        chapterTitle.innerHTML = `
      ${chapterData.completed ? "✅" : "📖"} ${chapter}
    `;

        const statusBadge = document.createElement("span");
        statusBadge.className = `status-badge status-${chapterData.status}`;
        statusBadge.textContent = chapterData.status.replace("-", " ");

        chapterHeader.appendChild(chapterTitle);
        chapterHeader.appendChild(statusBadge);

        // Chapter Actions
        const chapterActions = document.createElement("div");
        chapterActions.className = "chapter-actions";

        const completeBtn = document.createElement("button");
        completeBtn.className = "action-btn btn-complete";
        completeBtn.textContent = chapterData.completed
            ? "Mark Incomplete"
            : "Mark Complete";
        completeBtn.onclick = () => this.markComplete(subject, paper, chapter);

        const sessionBtn = document.createElement("button");
        sessionBtn.className = "action-btn btn-session";
        sessionBtn.textContent = "Add Study Session";
        sessionBtn.onclick = () =>
            this.addStudySession(subject, paper, chapter);

        chapterActions.appendChild(completeBtn);
        chapterActions.appendChild(sessionBtn);

        // Chapter Info
        const chapterInfo = document.createElement("div");
        chapterInfo.className = "chapter-info";

        const infoItems = [
            { label: "Sessions:", value: chapterData.sessions },
            {
                label: "Last Studied:",
                value: chapterData.lastStudied
                    ? new Date(chapterData.lastStudied).toLocaleDateString()
                    : "Never",
            },
            {
                label: "Completed:",
                value: chapterData.completedDate
                    ? new Date(chapterData.completedDate).toLocaleDateString()
                    : "Not completed",
            },
        ];

        infoItems.forEach((item) => {
            const infoDiv = document.createElement("div");
            infoDiv.className = "info-item";
            infoDiv.innerHTML = `<span class="info-label">${item.label}</span>${item.value}`;
            chapterInfo.appendChild(infoDiv);
        });

        // Ratings
        const ratingsDiv = document.createElement("div");
        ["Academic Class", "Test Paper", "Engineering QB"].forEach((param) => {
            const ratingDiv = document.createElement("div");
            ratingDiv.className = "rating";

            const label = document.createElement("label");
            label.textContent = param + ":";

            const input = document.createElement("input");
            input.type = "range";
            input.min = 1;
            input.max = 10;
            input.value = chapterData.ratings[param];

            const valueSpan = document.createElement("span");
            valueSpan.textContent = input.value;

            input.addEventListener("input", () => {
                valueSpan.textContent = input.value;
                const newRatings = { ...chapterData.ratings };
                newRatings[param] = parseInt(input.value);
                this.updateChapterData(subject, paper, chapter, {
                    ratings: newRatings,
                });
            });

            ratingDiv.appendChild(label);
            ratingDiv.appendChild(input);
            ratingDiv.appendChild(valueSpan);
            ratingsDiv.appendChild(ratingDiv);
        });

        // Notes
        const notes = document.createElement("textarea");
        notes.placeholder = "Special notes...";
        notes.value = chapterData.notes;
        notes.addEventListener("blur", () => {
            this.updateChapterData(subject, paper, chapter, {
                notes: notes.value,
            });
        });

        chapterDiv.appendChild(chapterHeader);
        chapterDiv.appendChild(chapterActions);
        chapterDiv.appendChild(chapterInfo);
        chapterDiv.appendChild(ratingsDiv);
        chapterDiv.appendChild(notes);

        return chapterDiv;
    }

    render() {
        this.app.innerHTML = "";

        Object.entries(this.studyData).forEach(([subject, papers]) => {
            const subjectProgress = this.getSubjectProgress(subject);
            const { container: subjectDiv, content: subjectContent } =
                this.createCollapsible(subject, false, subjectProgress);

            Object.entries(papers).forEach(([paper, chapters]) => {
                const paperProgress = this.getPaperProgress(subject, paper);
                const { container: paperDiv, content: paperContent } =
                    this.createCollapsible(paper, true, paperProgress);

                chapters.forEach((chapter) => {
                    const chapterElement = this.createChapterElement(
                        subject,
                        paper,
                        chapter
                    );
                    paperContent.appendChild(chapterElement);
                });

                subjectContent.appendChild(paperDiv);
            });

            this.app.appendChild(subjectDiv);
        });
    }

    initializeEventListeners() {
        // Search functionality
        document
            .getElementById("search-input")
            .addEventListener("input", (e) => {
                this.filterChapters(e.target.value);
            });

        // Export data
        document.getElementById("export-btn").addEventListener("click", () => {
            this.exportData();
        });

        // Reset all data
        document.getElementById("reset-btn").addEventListener("click", () => {
            if (
                confirm(
                    "Are you sure you want to reset all progress? This cannot be undone."
                )
            ) {
                this.resetAllData();
            }
        });
    }

    filterChapters(searchTerm) {
        const chapters = document.querySelectorAll(".chapter");
        const subjects = document.querySelectorAll(".subject");
        const papers = document.querySelectorAll(".paper");

        if (!searchTerm.trim()) {
            chapters.forEach((chapter) => chapter.classList.remove("hidden"));
            subjects.forEach((subject) => subject.classList.remove("hidden"));
            papers.forEach((paper) => paper.classList.remove("hidden"));
            return;
        }

        const term = searchTerm.toLowerCase();

        chapters.forEach((chapter) => {
            const title = chapter
                .querySelector(".chapter-title")
                .textContent.toLowerCase();
            if (title.includes(term)) {
                chapter.classList.remove("hidden");
            } else {
                chapter.classList.add("hidden");
            }
        });

        // Hide/show papers and subjects based on visible chapters
        papers.forEach((paper) => {
            const visibleChapters = paper.querySelectorAll(
                ".chapter:not(.hidden)"
            );
            if (visibleChapters.length === 0) {
                paper.classList.add("hidden");
            } else {
                paper.classList.remove("hidden");
            }
        });

        subjects.forEach((subject) => {
            const visiblePapers = subject.querySelectorAll(
                ".paper:not(.hidden)"
            );
            if (visiblePapers.length === 0) {
                subject.classList.add("hidden");
            } else {
                subject.classList.remove("hidden");
            }
        });
    }

    exportData() {
        const exportData = {
            timestamp: new Date().toISOString(),
            studyData: this.studyData,
            progressData: this.progressData,
            stats: {
                totalChapters: this.getAllChapters().length,
                completedChapters: this.getCompletedChapters().length,
                totalSessions: this.getTotalSessions(),
                studyStreak: this.getStudyStreak(),
            },
        };

        const dataStr = JSON.stringify(exportData, null, 2);
        const dataBlob = new Blob([dataStr], { type: "application/json" });

        const link = document.createElement("a");
        link.href = URL.createObjectURL(dataBlob);
        link.download = `study-tracker-backup-${
            new Date().toISOString().split("T")[0]
        }.json`;
        link.click();

        this.showToast("Data exported successfully! 📁");
    }

    resetAllData() {
        this.progressData = {};
        this.saveProgressData();
        this.render();
        this.updateStats();
        this.showToast("All data has been reset! 🔄");
    }

    showToast(message) {
        const toast = document.getElementById("toast");
        toast.textContent = message;
        toast.classList.add("show");

        setTimeout(() => {
            toast.classList.remove("show");
        }, 3000);
    }
}

// Initialize the app when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
    new StudyTracker();
});
