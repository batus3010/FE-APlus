const url = './assets/js/topic.json';
const listTopicContainer = document.getElementById('topics-container');

fetch(url)
    .then(function (response) {
        if (response.status === 200) {
            return response.json();
        } else {
            throw new Error('Lỗi tải file JSON');
        }
    })
    .then(function (data) {
        // Lặp qua từng chủ đề và phần trong dữ liệu JSON
        var listTopic = '';

        for (const topic of data) {
            var status = '';

            if(topic.status == 'Đã hoàn thành'){
                status = 'complete';
            } else if (topic.status == 'Hết hạn'){
                status = "failure";
            }

            var topicContent =  
                `<div class="topic ${status}">
                    <a href="./exam.html" class="topic__link">
                        <h3 class="title">${topic.title}</h3>
                        
                        <div class="duration">Thời gian: <span>${topic.time}</span></div>
                        <div class="deadline">Đến hạn vào: <span>${topic.deadline}</span></div>

                        <div class="status">${topic.status}</div>
                    </a>
                </div>`;
                
            listTopic += '\n' + topicContent;
        }

        listTopicContainer.innerHTML = listTopic;
    })
    .catch(function (error) {
        console.log(error);
    });
