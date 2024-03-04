const popup = document.getElementById('pop-up-dashboard');
const listDeleteTopic = document.querySelectorAll('.delete-topic');

listDeleteTopic.forEach(button => {
    button.addEventListener('click', function(){
        popup.innerHTML = `
            <div class="form-add-account">
                <h4 class="fs-5 text-center mb-5">Bạn chắc chắn muốn xóa bài kiểm tra này?</h4>

                <div class="text-center my-5">
                    <button type="button" class="btn btn-secondary">Hủy</button>
                    <button type="button" class="btn btn-primary">Xóa</button>
                </div>
            </div>
        `;

        popup.querySelectorAll('button').forEach(button => {
            button.addEventListener('click', function(){
                popup.innerHTML = '';
            });
        });
    })
})