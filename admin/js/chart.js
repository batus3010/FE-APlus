
// Dữ liệu giả lập
const data = [
    {
        "id": 1,
        "name": "Nguyễn Văn A",
        "exam": "ki-thi-1",
        "date": "2023-11-14",
        "score": 8,
        "status": "Hoàn thành"
    },
    {
        "id": 2,
        "name": "Trần Thị B",
        "exam": "ki-thi-2",
        "date": "2023-12-01",
        "score": 9,
        "status": "Hoàn thành"
    },
    {
        "id": 3,
        "name": "Lê Văn C",
        "exam": "ki-thi-1",
        "date": "2023-11-14",
        "score": 6,
        "status": "Hoàn thành"
    },
    // ... Dữ liệu của các sinh viên khác
];

// Lấy các element
const tableBody = document.querySelector("tbody");
const chartCanvasTable = document.querySelector("#chart-score-distribution");
const btnFilter = document.querySelector("#btn-filter");

// Hiển thị dữ liệu ban đầu
renderTable(data);
renderChart(data);

// Xử lý sự kiện lọc
btnFilter.addEventListener("click", () => {
    const filterExam = document.querySelector("#filter-exam").value;
    const filterDate = document.querySelector("#filter-date").value;
    const filterCriteria = document.querySelector("#filter-criteria").value;

    // Lọc dữ liệu
    const filteredData = data.filter(student => {
        // Lọc theo kỳ thi
        if (filterExam && filterExam !== student.exam) {
            return false;
        }

        // Lọc theo ngày tháng
        if (filterDate && filterDate !== student.date) {
            return false;
        }

        // Lọc theo tiêu chí khác
        if (filterCriteria && !student.name.toLowerCase().includes(filterCriteria.toLowerCase())) {
            return false;
        }

        return true;
    });

    // Hiển thị dữ liệu đã lọc
    renderTable(filteredData);
    renderChart(filteredData);
});

// Hàm hiển thị dữ liệu vào bảng
function renderTable(data) {
    tableBody.innerHTML = "";

    data.forEach((student, index) => {
        const row = `
        <tr>
          <td>${index + 1}</td>
          <td>${student.name}</td>
          <td>${student.exam}</td>
          <td>${student.date}</td>
          <td>${student.score}</td>
          <td>${student.status}</td>
        </tr>
      `;

        tableBody.insertAdjacentHTML("beforeend", row);
    });
}

// Chart