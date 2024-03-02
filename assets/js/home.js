const url = './assets/js/topic.json';
const listTopicContainer = document.getElementById('topics-container');
const selectElement = document.getElementById("status");
const filterButtonElement = document.getElementById("filter-button");
var listTopics = [];

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

            listTopics.push({
                id: topic.id,
                title: topic.title,
                time: topic.time,
                deadline: topic.deadline,
                status: topic.status
            });
        }

        filter("Tất cả");

        filterButtonElement.addEventListener("click", () => {
            const selectedValue = selectElement.value;
        
            filter(selectedValue);
        });
    })
    .catch(function (error) {
        console.log(error);
    });

function filter(value){
    if (value == 'Tất cả'){
        loadListTopic(listTopics);
    }else{
        var listTopicFilter = [];
        
        listTopics.forEach(topic => {
            if (topic.status == value){
                listTopicFilter.push(topic);
            }
        })
        
        loadListTopic(listTopicFilter);
    }
}

function loadListTopic(listTopic){
    var listTopicHtml = '';
        
    listTopic.forEach(topic => {
        var status = '';

        if(topic.status == 'Đã hoàn thành'){
            status = 'complete';
        } else if (topic.status == 'Hết hạn'){
            status = "failure";
        }

        var topicContent =  
            `<div class="topic ${status}">
                <div class="topic__link" onclick="getExam(${topic.id})">
                    <h3 class="title">${topic.title}</h3>
                    
                    <div class="duration">Thời gian: <span>${topic.time}</span></div>
                    <div class="deadline">Đến hạn vào: <span>${topic.deadline}</span></div>

                    <div class="status">${topic.status}</div>
                </div>
            </div>`;
            
        listTopicHtml += topicContent;
    });

    listTopicContainer.innerHTML = listTopicHtml;
}

function getExam(id){
    window.location.href = "./exam.html?id=" + id;
}