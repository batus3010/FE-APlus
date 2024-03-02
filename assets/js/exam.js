
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
    examContainer.innerHTML = 
            `<div class="topic">
                <div class="topic__link" onclick="getExam(${topic.id})">
                    <h3 class="title">${topic.title}</h3>
                    
                    <div class="duration">Thời gian: <span>${topic.time}</span></div>
                    <div class="deadline">Đến hạn vào: <span>${topic.deadline}</span></div>

                    <div class="status">${topic.status}</div>
                </div>
            </div>`;
}