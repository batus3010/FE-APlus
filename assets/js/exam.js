
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
}

function showExam(topic){
    let submitExam = document.getElementById('submit-button');
    let examContentHtml = '';

    topic.part.forEach(e => {
        let questionsContentHtml = '';

        if (e.type == 'checkbox'){
            e.questions.forEach(question => {
                questionsContentHtml += `

                `;
            });
        } else if (e.type == 'text'){
            e.questions.forEach(question => {
                questionsContentHtml += `
                
                `;
            });
        }

        examContentHtml += `
            <div class="part">
                <h3 class="part__title">${e.title}</h3>

                <div class="part__list">
                    ${questionsContentHtml}
                </div>
            </div>
        `;
    });

    examContainer.innerHTML = examContentHtml + '<button id="submit-button">Submit</button>';
}