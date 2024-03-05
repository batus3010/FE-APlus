const addAccountButton = document.getElementById('add-account');
const popup = document.getElementById('pop-up');

function addEditButton(){
    let accountList = document.getElementById('account-list');
    let listButton = accountList.querySelectorAll('.edit-account');
    let listDeleteButton = accountList.querySelectorAll('.delete-account');

    listButton.forEach(button => {
        button.addEventListener('click', function(){
            popup.classList.add('active');
            popup.innerHTML = `
                <div class="form-add-account px-5">
                    <h4 class="fs-5 text-center mb-3 fw-bold">Sửa thông tin tài khoản</h4>

                    <div class="form-group mb-4">
                        <label class="mb-2 fw-bold" for="add-name">Họ và tên:</label>
                        <input type="text" class="form-control" id="add-name">
                    </div>

                    <div class="form-group mb-4">
                        <label class="mb-2 fw-bold" for="add-email">Email:</label>
                        <input type="text" class="form-control" id="add-email">
                    </div>

                    <div class="form-group mb-4">
                        <label class="mb-2 fw-bold" for="add-password">Mật khẩu:</label>
                        <input type="password" class="form-control" id="add-password">
                    </div>

                    <div class="text-center my-4">
                        <button type="button" class="btn btn-secondary">Hủy</button>
                        <button type="button" class="btn btn-primary">Xong</button>
                    </div>
                </div>
            `;

            popup.querySelectorAll('button').forEach(button => {
                button.addEventListener('click', function(){
                    popup.innerHTML = '';
                    popup.classList.remove('active');
                });
            });
        });
    });

    listDeleteButton.forEach(button => {
        button.addEventListener('click', function(){
            popup.classList.add('active');
            popup.innerHTML = `
                <div class="form-add-account">
                    <h4 class="fs-5 text-center mb-5">Bạn chắc chắn muốn xóa tài khoản này?</h4>

                    <div class="text-center my-5">
                        <button type="button" class="btn btn-secondary">Hủy</button>
                        <button type="button" class="btn btn-primary">Xóa</button>
                    </div>
                </div>
            `;

            popup.querySelectorAll('button').forEach(button => {
                button.addEventListener('click', function(){
                    popup.innerHTML = '';
                    popup.classList.remove('active');
                });
            });
        });
    });
}

addAccountButton.addEventListener('click', function(){
    popup.classList.add('active');
    popup.innerHTML = `
        <div class="form-add-account px-5">
            <h4 class="fs-5 fw-bold text-center mb-3">Tạo tài khoản mới</h4>

            <div class="form-group mb-3">
                <label class="mb-2 fw-bold" for="add-name">Họ và tên:</label>
                <input type="text" class="form-control" id="add-name">
            </div>

            <div class="form-group mb-3">
                <label class="mb-2 fw-bold" for="add-email">Email:</label>
                <input type="text" class="form-control" id="add-email">
            </div>

            <div class="form-group mb-3">
                <label class="mb-2 fw-bold" for="add-password">Mật khẩu:</label>
                <input type="password" class="form-control" id="add-password">
            </div>

            <div class="text-center my-4">
                <button type="button" class="btn btn-secondary">Hủy</button>
                <button type="button" class="btn btn-primary">Xong</button>
            </div>
        </div>
    `;

    popup.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', function(){
            popup.innerHTML = '';
            popup.classList.remove('active');
            addEditButton();
        });
    });
});

addEditButton();