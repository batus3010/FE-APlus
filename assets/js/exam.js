
function getExamId(){
    let examUrl = window.location.href;
    let id = "";

    for (let i = examUrl.indexOf("=") + 1; i < examUrl.length; i++) {
        id += examUrl[i];
    }

    return id;
}

const url = './assets/js/topic.json';
const examId = getExamId();
const examContainer = document.getElementById('exam-container');
const popup = document.getElementById('popup');
var exam = null;

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
                exam = topic;
                loadExam(topic);
                break;
            }
        }
    })
    .catch(function (error) {
        console.log(error);
    });

function loadExam(topic){
    let statusExam = '';

    if(topic.status == 'Đã hoàn thành'){
        statusExam = 'complete';
    } else if (topic.status == 'Chưa mở'){
        statusExam = 'closed';
    } else if (topic.status == 'Hết hạn'){
        statusExam = 'failure';
    }

    examContainer.innerHTML = 
        `<div class="topic" data-id="${topic.id}">
            <h3 class="title">${topic.title}</h3>
            
            <div class="duration">Thời gian: <span>${topic.time}</span></div>
            <div class="deadline">Đến hạn vào: <span>${topic.deadline}</span></div>

            <div class="status ${statusExam}">${topic.status}</div>

            <div class="button-box">
                <button type="button" class="${statusExam}" id="show-answer">Xem đáp án</button>
                <button type="button" class="${statusExam}" id="start-exam">Bắt đầu</button>
            </div>
        </div>`;

    document.getElementById('start-exam').addEventListener('click', function(){
        showExam(topic);
    });

    document.getElementById('show-answer').addEventListener('click', function(){
        window.location.href = './answer.html?id=' + exam.id;
    });
}

function showExam(topic){
    let examContentHtml = '';
    let questionsContentHtml = '';

    topic.questions.forEach((question, index) => {
        questionsContentHtml += `
            <div class="question">
                <h4 class="question__title">
                    <label>Câu ${index + 1}:</label>
                    ${question.content}
                    <span class="not-choose">Bạn chưa chọn đáp án cho câu hỏi này</span>
                </h4>

                <div class="question__option">
                    <input type="radio" name="answer${index}" value="${question.options[0]}" class="answer__input" id="answer-input">
                    <label for="answer-input">${question.options[0]}</label>
                </div>

                <div class="question__option">
                    <input type="radio" name="answer${index}" value="${question.options[1]}" class="answer__input" id="answer-input">
                    <label for="answer-input">${question.options[1]}</label>
                </div>

                <div class="question__option">
                    <input type="radio" name="answer${index}" value="${question.options[2]}" class="answer__input" id="answer-input">
                    <label for="answer-input">${question.options[2]}</label>
                </div>

                <div class="question__option">
                    <input type="radio" name="answer${index}" value="${question.options[3]}" class="answer__input" id="answer-input">
                    <label for="answer-input">${question.options[3]}</label>
                </div>
            </div>
        `;
    });

    examContentHtml += `
        <div class="exam">
            <h3 class="exam__title">${topic.title}</h3>

            <div class="exam__questions">
                ${questionsContentHtml}
            </div>

            <button id="submit-button" onclick="checkChooseAnswer()">Submit</button>
        </div>
    `;

    examContainer.innerHTML = examContentHtml;
}

function checkChooseAnswer(){
    showScore();
}

function showScore(){
    let score = 0;
    const inputs = document.querySelectorAll(".answer__input");
    const selectedValues = [];

    inputs.forEach((input) => {
        if (input.checked) {
            selectedValues.push(input.value);
        }
    });

    exam.questions.forEach((question, index) => {
        exam.questions[index].yourAnswer = selectedValues[index];

        if (question.answer == selectedValues[index]){
            score += 1;
        }
    });

    exam.score = 10 * (score / (exam.questions.length));
    exam.status = "Đã hoàn thành";

    examContainer.innerHTML = '';

    popup.innerHTML = `
        <div class="message">
            <h4 class="message__content">Điểm của bạn là:</h4>
            <span class="message__score">${exam.score.toFixed(2)}</span>
            <h4 class="message__content2">Số câu đúng: ${score}/${exam.questions.length}</h4>
            <button type="button" class="message__btn" onclick="returnView()">Ok</button>
        </div>
    `;
}

function returnView(){
    popup.innerHTML = '';
    localStorage.setItem("examAnswer", JSON.stringify(exam));
    loadExam(exam);
}