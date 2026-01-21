
<script>
    // Правильные ответы для уравнения
    // ВНИМАНИЕ: Если у вас несколько правильных ответов для одного поля "task1",
    // то логика сравнения ниже будет учитывать только совпадения по полному набору ответов.
    // Если "correctAnswers" - это список всех возможных правильных корней, а пользователь может вводить их в любом порядке и количестве,
    // тогда логика подсчета оценки должна быть более сложной, например, сравнивать множества ответов.
    // Я оставляю вашу текущую логику, которая ищет прямое совпадение строк.
    const correctAnswers = ["2pi", "2pi/3"];
    let maxPossibleScore = correctAnswers.length; // Количество корней, которое нужно найти для макс. оценки

    // Функция для добавления нового поля ввода
    function addAnswerInput() {
      const answerInputs = document.getElementById('answer-inputs');
      const newInputDiv = document.createElement('div');
      newInputDiv.className = 'answer-container'; // Используем класс для стилизации и группировки

      const newInput = document.createElement('input');
      newInput.type = 'text';
      newInput.name = 'task1';
      newInput.className = 'form-input';
      newInput.placeholder = 'Введите корень'; // Подсказка

      const deleteButton = document.createElement('button');
      deleteButton.type = 'button';
      deleteButton.innerHTML = '&times;'; // Крестик
      deleteButton.className = 'delete-button'; // Класс для стилизации кнопки

      // Стили для кнопки удаления
      deleteButton.style.marginLeft = '5px';
      deleteButton.style.backgroundColor = '#f44336'; // Красный
      deleteButton.style.color = 'white';
      deleteButton.style.border = 'none';
      deleteButton.style.padding = '2px 5px';
      deleteButton.style.cursor = 'pointer';
      deleteButton.style.borderRadius = '3px';

      deleteButton.addEventListener('click', function() {
        newInputDiv.remove(); // Удаляем весь контейнер div (поле ввода + кнопка)
      });

      newInputDiv.appendChild(newInput);
      newInputDiv.appendChild(deleteButton);
      answerInputs.appendChild(newInputDiv);
    }

    // Добавляем обработчик для кнопки "Добавить корень"
    document.getElementById('add-answer').addEventListener('click', addAnswerInput);

    // Обработчик отправки формы
    document.getElementById('allTask').addEventListener('submit', function(event) {
      event.preventDefault(); // Предотвращаем стандартную отправку формы

      if (confirm("Вы уверены, что хотите отправить ответы?")) {
        // Получаем данные из новых полей
        const userName = document.getElementById('userName').value.trim();
        const userSurname = document.getElementById('userSurname').value.trim();
        const testVariant = document.getElementById('testVariant').value.trim();

        const userAnswers = document.querySelectorAll('input[name="task1"]');
        let foundCorrectAnswers = 0;
        let userAnswerValues = [];

        // Собираем все ответы пользователя
        userAnswers.forEach(function(input) {
          const value = input.value.trim();
          if (value) { // Добавляем только непустые ответы
            userAnswerValues.push(value);
          }
        });

        // Проверяем каждый правильный ответ
        correctAnswers.forEach(function(correctAnswer) {
          // Если пользовательский ответ совпадает с одним из правильных
          if (userAnswerValues.includes(correctAnswer)) {
            foundCorrectAnswers += 1;
          }
        });

        // Вычисляем оценку на основе количества найденных правильных корней
        let grade;
        // Здесь логика оценки зависит от того, как вы хотите обрабатывать частичные совпадения и лишние ответы.
        // Я оставлю вашу текущую логику, но она может быть не совсем точной для математических задач с несколькими корнями.
        if (foundCorrectAnswers === 0) {
          grade = 2;
        } else if (foundCorrectAnswers === 1) {
          grade = 4;
        } else if (foundCorrectAnswers >= maxPossibleScore) { // Если найдено столько же или больше правильных, сколько ожидается
          grade = 5;
        } else {
            grade = 3; // Можно добавить для частичных совпадений, если 1 правильный - 4, то 2 правильных из 3 - что?
        }


        // --- СОХРАНЕНИЕ ДАННЫХ В ТЕКСТОВЫЙ ФАЙЛ ---
        const fileContent = `
Имя: ${userName}
Фамилия: ${userSurname}
Вариант: ${testVariant}
Оценка: ${grade}
Ответы пользователя: ${userAnswerValues.join(', ')}
Правильные ответы: ${correctAnswers.join(', ')}
Количество найденных правильных: ${foundCorrectAnswers} из ${maxPossibleScore}
        `.trim(); // .trim() удалит лишние пробелы в начале и конце

        // Создаем имя файла
        const filename = `Результаты_${userSurname}_${userName}_Вариант${testVariant}.txt`;

        // Создаем Blob (Binary Large Object) из текстового содержимого
        const blob = new Blob([fileContent], { type: 'text/plain;charset=utf-8' });

        // Создаем временную ссылку для скачивания
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob); // Генерируем URL для Blob
        link.download = filename; // Устанавливаем имя файла для скачивания
        link.style.display = 'none'; // Скрываем ссылку

        // Добавляем ссылку в DOM, кликаем по ней и затем удаляем
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Освобождаем объект URL
        URL.revokeObjectURL(link.href);
        // --- КОНЕЦ СОХРАНЕНИЯ ДАННЫХ В ТЕКСТОВЫЙ ФАЙЛ ---


        // Сохраняем оценку в локальное хранилище и перенаправляем
        localStorage.setItem('RESULT', grade);
        window.location.href = 'result.html';
      }
    });
  </script>
