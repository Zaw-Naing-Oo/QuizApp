export const shuffleChoice = (question) => {
    if (!question) {
        return [];
    }


    //  Fisher-Yates shuffle algorithm
    const choices = [...question.choices];
    for (let i = choices.length - 1; i > 0; i--) {  
        const j = Math.floor(Math.random() * (i + 1));   // 0 to 3
        [choices[i], choices[j]] = [choices[j], choices[i]];
    }
    return [...choices];
}