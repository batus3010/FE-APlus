function getExamId(){
    let examUrl = window.location.href;
    let id = "";

    for (let i = examUrl.indexOf("=") + 1; i < examUrl.length; i++) {
        id += examUrl[i];
    }

    return id;
}

const answerContainer = document.getElementById('answer-container');
const url = './assets/js/topic.json';
const examId = getExamId();
const savedExamAnswer = JSON.parse(localStorage.getItem("examAnswer"));

function showAnswer(topic){
    let examContentHtml = '';
    let questionsContentHtml = '';

    topic.questions.forEach((question, index) => {
        questionsContentHtml += `
            <div class="question">
                <span class="question__title">
                    <label>Câu ${index + 1}:</label>
                    ${question.content}
                </span>

                <div class="question__option">
                    <input type="radio" name="answer${index}" value="${question.options[0]}" class="answer__input" id="answer-input">
                    <label for="answer-input">
                        ${question.options[0]} 
                        <span class="picked">Đáp án bạn chọn</span>
                    </label>
                </div>

                <div class="question__option">
                    <input type="radio" name="answer${index}" value="${question.options[1]}" class="answer__input" id="answer-input">
                    <label for="answer-input">
                        ${question.options[1]} 
                        <span class="picked">Đáp án bạn chọn</span>
                    </label>
                </div>

                <div class="question__option">
                    <input type="radio" name="answer${index}" value="${question.options[2]}" class="answer__input" id="answer-input">
                    <label for="answer-input">
                        ${question.options[2]} 
                        <span class="picked">Đáp án bạn chọn</span>
                    </label>
                </div>

                <div class="question__option">
                    <input type="radio" name="answer${index}" value="${question.options[3]}" class="answer__input" id="answer-input">
                    <label for="answer-input">
                        ${question.options[3]} 
                        <span class="picked">Đáp án bạn chọn</span>
                    </label>
                </div>
            </div>
        `;
    });

    examContentHtml += `
        <div class="exam">
            <h3 class="exam__title">${topic.title}</h3>
            <h3 class="exam__score">Điểm của bạn là: <span>${topic.score.toFixed(2)}</span></h3>

            <div class="exam__questions">
                ${questionsContentHtml}
            </div>
        </div>
    `;

    answerContainer.innerHTML = examContentHtml;
    checkAnswer(topic);
}

function checkAnswer(topic){
    topic.questions.forEach((q, index) => {
        let listInputs = document.querySelectorAll(`input[name="answer${index}"]`);

        console.log(listInputs);
        listInputs.forEach((input, i) => {
            input.disabled = true;

            if (input.value == topic.questions[index].answer){
                input.classList.add('correct');
            } 
            if (input.value == topic.questions[index].yourAnswer){
                input.classList.add('your-choose');
                input.checked = true;
            }
        });
    });
}

if (examId == savedExamAnswer.id){
    showAnswer(savedExamAnswer);
} else {
    fetch(url)
    .then(function (response) {
        if (response.status === 200) {
            return response.json();
        } else {
            throw new Error('Lỗi tải file JSON');
        }
    })
    .then(function (data) {
        for (const topic of data) {
            if(topic.id == examId){
                if (topic.status == "Đã hoàn thành"){
                    showAnswer(topic);
                } else {
                    answerContainer.innerHTML = '<h3 class="no-answer">Bạn chưa làm bài kiểm tra này</h3>';
                }
            }
        }
    })
    .catch(function (error) {
        console.log(error);
    });
}