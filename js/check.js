function checkAns(event) {
    event.preventDefault();
    
    if (confirm("Вы уверены, что хотите отправить ответы?")) {
        const answers = ["_","1","2","3"];
        let correctAnswers = 0;
        const maxQuestions = 3;
        
        for (let i = 1; i <= maxQuestions; i++) {
            const userAnswer = document.getElementById("Task" + i).value.trim();
            if (userAnswer === answers[i]) {
                correctAnswers += 1;
            }
        }
        
        let grade;
        if ( correctAnswers == 0) {
            grade = 2;
        } else if (correctAnswers == 1) {
            grade = 5;
        }
        
        localStorage.setItem('RESULT', grade);
        console.log("Оценка:", grade);
        window.location.href = 'result.html';
    }
}