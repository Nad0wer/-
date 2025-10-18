function checkAns(event) {
    event.preventDefault();
    
    if (confirm("Вы уверены, что хотите отправить ответы?")) {
        const answers = ["_","1","2","3","4","5"];
        let correctAnswers = 0;
        const maxQuestions = 5;
        
        for (let i = 1; i <= maxQuestions; i++) {
            const userAnswer = document.getElementById("Task" + i).value.trim();
            if (userAnswer === answers[i]) {
                correctAnswers += 1;
            }
        }
        
        let grade;
        if (5 * (correctAnswers / maxQuestions) <= 2) {
            grade = 2;
        } else {
            grade = Math.round(5 * (correctAnswers / maxQuestions));
        }
        
        localStorage.setItem('RESULT', grade);
        console.log("Оценка:", grade);
        
        // Переход на страницу результатов
        window.location.href = 'result.html';
    }
}