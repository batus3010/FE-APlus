
const popup = document.getElementById('pop-up-add-topic');
const addQuestion = document.getElementById('add-question');
const listQuestions = document.getElementById('list-questions');
var questionIndex = 1;

addQuestion.addEventListener('click', function(){
    popup.classList.add('active');
    popup.innerHTML = `
        <div class="add-question pt-4">
            <h4 class="fs-5 mb-3 text-center fw-bold">Tạo câu hỏi mới</h4>

            <div class="form-group">
                <label class="mb-3 fw-bold" for="inputQuestionContent">Nội dung câu hỏi:</label>
                <input type="text" class="form-control" id="inputQuestionContent">
            </div>
    
            <div class="question__content mt-4">
                <div class="correct-answer">
                    <h6 class="fs-6 fw-bold mb-3">Điền các lựa chọn và đánh dấu câu trả lời đúng</h6>

                    <div class="form-group mb-2 d-flex align-items-center">
                        <input class="form-check-input mt-0" type="radio" name="correct">
                        <input type="text" class="form-control" name="option">
                    </div>

                    <div class="form-group mb-2 d-flex align-items-center">
                        <input class="form-check-input mt-0" type="radio" name="correct">
                        <input type="text" class="form-control" name="option">
                    </div>

                    <div class="form-group mb-2 d-flex align-items-center">
                        <input class="form-check-input mt-0" type="radio" name="correct">
                        <input type="text" class="form-control" name="option">
                    </div>

                    <div class="form-group mb-2 d-flex align-items-center">
                        <input class="form-check-input mt-0" type="radio" name="correct">
                        <input type="text" class="form-control" name="option">
                    </div>
                </div>
            </div>

            <div class="text-center my-4">
                <button type="button" class="btn btn-secondary" onclick="closeForm()">Hủy</button>
                <button type="button" class="btn btn-primary" onclick="getValue()">Xong</button>
            </div>
        </div>
    `;
});

function closeForm(){
    popup.innerHTML = '';
    popup.classList.remove('active');
}

function getValue(){
    let title = document.getElementById('inputQuestionContent').value;
    let options = document.querySelectorAll('input[name="option"]');
    let correctAnswer = document.querySelectorAll('input[name="correct"]');
    let html = '';

    correctAnswer.forEach((item, index) => {
        if (item.checked){
            html += `
                <div class="question__option">
                    <input type="radio" checked>
                    <label for="">${options[index].value}</label>
                </div>
            `;
        } else {
            html += `
                <div class="question__option">
                    <input type="radio">
                    <label for="">${options[index].value}</label>
                </div>
            `;
        }
    });

    listQuestions.insertAdjacentHTML('beforeend', `
        <div class="question">
            <h4 class="fs-6 mb-2 mt-4">Câu ${questionIndex}: ${title}</h4>

            ${html}
        </div>  
    `);

    questionIndex += 1;
    closeForm();
}