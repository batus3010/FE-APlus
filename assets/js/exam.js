
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
            
            <div class="description">Mô tả: <span>${topic.description}</span></div>
            <div class="duration">Thời gian: <span>${topic.time} phút</span></div>
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
            <div class="countdown">
                <i class="fa-regular fa-clock"></i>
                <span id="countdown-time"></span>
            </div>

            <div class="exam__questions">
                ${questionsContentHtml}
            </div>

            <button id="submit-button" onclick="checkChooseAnswer()">Submit</button>
        </div>
    `;

    examContainer.innerHTML = examContentHtml;
    startCountdown(topic.time);
}

function startCountdown(minus) {
    let countdown = document.getElementById("countdown-time");
    let timeLeft = minus * 60; // chuyển minus thành giây

    let interval = setInterval(function() {
        if (timeLeft < 0) {
            clearInterval(interval);
            
            autoSubmitExam();
        } else {
            countdown.textContent = formatTime(timeLeft);
            timeLeft--;
        }
    }, 1000);
}

function formatTime(seconds) {
    let hours = Math.floor(seconds / 3600);
    let minutes = Math.floor((seconds % 3600) / 60);
    let remainingSeconds = seconds % 60;

    return pad(hours) + ":" + pad(minutes) + ":" + pad(remainingSeconds);
}

function pad(value) {
    return value < 10 ? "0" + value : value;
}

function autoSubmitExam(){
    popup.innerHTML = `
        <div class="message">
            <h4 class="message__content">Bài kiểm tra của bạn đã được tự động nộp do hết thời gian</h4>
            <button type="button" class="message__btn" onclick="showScore()">Ok</button>
        </div>
    `;
}

function checkChooseAnswer(){
    let questions = document.querySelectorAll('.question');
    let allChosen = true;

    questions.forEach(function(question) {
        let answerInputs = question.querySelectorAll('.answer__input');
        let massageNotChoose = question.querySelector('.not-choose');

        let hasChosen = Array.from(answerInputs).some(function(option) {
            return option.checked;
        });

        answerInputs.forEach(function(input) {
            input.addEventListener('change', function() {
                if (massageNotChoose.style.display == 'inline'){
                    massageNotChoose.style.display = 'none';
                }
            });
        });

        if (!hasChosen){
            allChosen = false;
            massageNotChoose.style.display = 'inline';
        }
    });

    if (allChosen) {
        showScore();
    }
}

function showScore(){
    let score = 0;
    let questions = document.querySelectorAll('.question');
    const selectedValues = [];

    questions.forEach((q, i) => {
        const inputs = q.querySelectorAll(".answer__input");
        let isChecked = false;

        inputs.forEach((input) => {
            if (input.checked) {
                isChecked = true;
                selectedValues.push(input.value);
            }
        });

        if (!isChecked){
            selectedValues.push('no answer');
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