// YÊU CẦU 1:
// Mảng chứa danh sách nhân viên
let employees = [
  {
    taiKhoan: "nv001",
    hoTen: "Nguyễn Văn A",
    email: "nva@gmail..com",
    ngayLam: "01/01/2000",
    chucVu: "Nhân viên",
    luong: 10000000,
    xepLoai: "khá",
  },
  {
    taiKhoan: "nv002",
    hoTen: "Trần Thị B",
    email: "ttb@gmail.com",
    ngayLam: "03/02/2010",
    chucVu: "Trưởng phòng",
    luong: 20000000,
    xepLoai: "xuất sắc",
  },
  {
    taiKhoan: "nv003",
    hoTen: "Nguyễn Hoàng Anh",
    email: "NHA@gmail.com",
    ngayLam: "02/02/2022",
    chucVu: "Nhân viên",
    luong: 10000000,
    xepLoai: "giỏi",
  },
  {
    taiKhoan: "nv004",
    hoTen: "Nguyễn Hoàng Em",
    email: "NHE@gmail.com",
    ngayLam: "4/02/2003",
    chucVu: "Nhân viên",
    luong: 6000000,
    xepLoai: "trung bình",
  },
  {
    taiKhoan: "nv005",
    hoTen: "Nguyễn Nam Hoàng",
    email: "NNH@gmail.com",
    ngayLam: "04/07/2007",
    chucVu: "Nhân viên",
    luong: 15000000,
    xepLoai: "khá",
  },
  {
    taiKhoan: "nv006",
    hoTen: "Trần Hoài Nam",
    email: "THN@gmail.com",
    ngayLam: "04/08/1999",
    chucVu: "Nhân viên",
    luong: 17000000,
    xepLoai: "khá",
  },
];
// Biến lưu chỉ số của nhân viên đang được chỉnh sửa
let editingIndex = -1;

// Hàm tạo bảng danh sách nhân viên
function createEmployeeTable() {
  let tableBody = document.getElementById("tableDanhSach");

  // Xóa nội dung cũ của bảng
  tableBody.innerHTML = "";

  // Lặp qua mảng nhân viên để tạo các hàng trong bảng
  for (let i = 0; i < employees.length; i++) {
    let employee = employees[i];

    // Tạo một hàng mới
    let row = document.createElement("tr");

    // Tạo các ô trong hàng
    let taiKhoanCell = document.createElement("td");
    taiKhoanCell.textContent = employee.taiKhoan;

    let hoTenCell = document.createElement("td");
    hoTenCell.textContent = employee.hoTen;

    let emailCell = document.createElement("td");
    emailCell.textContent = employee.email;

    let ngayLamCell = document.createElement("td");
    ngayLamCell.textContent = employee.ngayLam;

    let chucVuCell = document.createElement("td");
    chucVuCell.textContent = employee.chucVu;

    let luongCell = document.createElement("td");
    luongCell.textContent = employee.luong;

    let xepLoaiCell = document.createElement("td");
    xepLoaiCell.textContent = employee.xepLoai;

    let cogCell = document.createElement("td");

    let deleteButton = document.createElement("button");
    deleteButton.className = "btn btn-sm btn-danger";
    deleteButton.innerHTML = '<i class="fa fa-trash"></i> Xóa';
    deleteButton.setAttribute("data-index", i); // Thêm thuộc tính data-index
    deleteButton.addEventListener("click", function () {
      let index = parseInt(this.getAttribute("data-index"));
      deleteEmployeeByIndex(index);
      createEmployeeTable();
    });

    // Trong hàm createEmployeeTable()
    let editButton = document.createElement("button");
    editButton.className = "btn btn-sm btn-warning";
    editButton.addEventListener("click", function () {
      // Lấy chỉ số của nhân viên trong mảng
      let index = parseInt(this.getAttribute("data-index"));
      // Lấy thông tin nhân viên từ mảng
      let employee = employees[index];
      // Hiển thị thông tin nhân viên trong form "Log In"
      displayEmployeeInfo(employee);
    });
    editButton.innerHTML = '<i class="fa fa-edit"></i> Chỉnh sửa';
    editButton.setAttribute("data-index", i); // Thêm thuộc tính data-index
    cogCell.appendChild(editButton);
    cogCell.appendChild(deleteButton);
    // Thêm các ô vào hàng
    row.appendChild(taiKhoanCell);
    row.appendChild(hoTenCell);
    row.appendChild(emailCell);
    row.appendChild(ngayLamCell);
    row.appendChild(chucVuCell);
    row.appendChild(luongCell);
    row.appendChild(xepLoaiCell);

    // Thêm ô chứa nút "Xóa" và "Chỉnh sửa" vào hàng
    row.appendChild(cogCell);

    // Thêm hàng vào tbody của bảng
    tableBody.appendChild(row);
  }
}

// createEmployeeTable();
//  yêu cầu 2:
// Hàm thêm nhân viên mới
function addEmployee() {
  let taiKhoan = document.getElementById("tknv").value;
  let hoTen = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let ngayLam = document.getElementById("datepicker").value;
  let chucVu = document.getElementById("chucvu").value;
  let luong = parseFloat(document.getElementById("luongCB").value);
  let xepLoai = "";
  // let luongCoBan = parseFloat(document.getElementById("luongCB").value);
  let gioLamTrongThang = parseFloat(document.getElementById("gioLam").value);
  let password = document.getElementById("password").value;
  // Kiểm tra tài khoản
  if (taiKhoan.trim() === "") {
    showError("Vui lòng nhập tài khoản");
    return;
  }
  // Kiểm tra tên nhân viên
  if (hoTen.trim() === "") {
    showError("Vui lòng nhập tên nhân viên");
    return;
  }
  // Kiểm tra email
  if (email.trim() === "") {
    showError("Vui lòng nhập email");
    return;
  } else if (!isValidEmail(email)) {
    showError(
      "Email không đúng định dạng. Vui lòng nhập đúng định dạng email (ví dụ: example@gmail.com)"
    );
    return;
  }
  // Kiểm tra mật khẩu
  if (!isValidPassword(password)) {
    showError(
      "Mật khẩu không hợp lệ. Mật khẩu phải có từ 6 đến 10 ký tự, bao gồm ít nhất một chữ số, một chữ cái viết hoa, một chữ cái viết thường và một ký tự đặc biệt."
    );
    return;
  }
  // Kiểm tra ngày làm
  if (ngayLam.trim() === "") {
    showError("Vui lòng nhập ngày làm");
    return;
  } else if (!isValidDate(ngayLam)) {
    showError("Ngày làm không đúng định dạng. (ví dụ: mm/dd/yyyy)");
    return;
  }
  // Kiểm tra lương cơ bản
  if (isNaN(luong) || luong < 1000000 || luong > 20000000) {
    showError(
      "Lương cơ bản không hợp lệ. Vui lòng nhập lương trong khoảng từ 1,000,000 đến 20,000,000"
    );
    return;
  }
  // Kiểm tra chức vụ
  if (chucVu === "Chọn chức vụ") {
    showError("Vui lòng chọn chức vụ");
    return;
  }

  // Kiểm tra giờ làm
  if (
    isNaN(gioLamTrongThang) ||
    gioLamTrongThang < 80 ||
    gioLamTrongThang > 200
  ) {
    showError(
      "Số giờ làm không hợp lệ. Vui lòng nhập số giờ làm trong khoảng từ 80 đến 200"
    );
    return;
  }
  // Tính toán tổng lương dựa trên lương cơ bản và chức vụ
  if (chucVu === "Sếp") {
    luong = luong * 3;
  } else if (chucVu === "Trưởng phòng") {
    luong = luong * 2;
  }

  // Tạo đối tượng nhân viên mới
  let newEmployee = {
    taiKhoan: taiKhoan,
    hoTen: hoTen,
    email: email,
    ngayLam: ngayLam,
    chucVu: chucVu,
    luong: luong,
    xepLoai: "",
  };

  // yêu cầu 6:
  if (gioLamTrongThang >= 192) {
    newEmployee.xepLoai = "xuất sắc";
  } else if (gioLamTrongThang >= 176) {
    newEmployee.xepLoai = "giỏi";
  } else if (gioLamTrongThang >= 160) {
    newEmployee.xepLoai = "khá";
  } else {
    newEmployee.xepLoai = "trung bình";
  }

  // Thêm nhân viên mới vào mảng
  // employees.push(newEmployee);
  // Kiểm tra giá trị của isEditing
  if (isEditing) {
    // Cập nhật thông tin nhân viên trong mảng
    employees[editingIndex] = newEmployee;

    // Thiết lập giá trị isEditing thành false
    isEditing = false;

    // Kích hoạt nút "Thêm nhân viên"
    enableAddButton();
  } else {
    // Thêm nhân viên mới vào mảng
    employees.push(newEmployee);
  }

  // Tạo lại bảng danh sách nhân viên
  createEmployeeTable();
  // Reset giá trị của các trường nhập liệu trong form
  document.getElementById("tknv").value = "";
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("datepicker").value = "";
  document.getElementById("chucvu").value = "Chọn chức vụ";
  document.getElementById("luongCB").value = "";
  document.getElementById("gioLam").value = "";
  document.getElementById("password").value = "";

  // Đóng modal
  $("#myModal").modal("hide");
}
let isEditing = false;
function displayEmployeeInfo(employee) {
  // Hiển thị thông tin nhân viên trong form "Log In"
  document.getElementById("tknv").value = employee.taiKhoan;
  document.getElementById("name").value = employee.hoTen;
  document.getElementById("email").value = employee.email;
  document.getElementById("datepicker").value = employee.ngayLam;
  document.getElementById("chucvu").value = employee.chucVu;
  document.getElementById("luongCB").value = employee.luong;
  document.getElementById("gioLam").value = ""; // Đặt giá trị giờ làm rỗng
  document.getElementById("password").value = ""; // Đặt giá trị mật khẩu rỗng
  // Hiển thị modal "Log In"
  $("#myModal").modal("show");
  // Gán giá trị cho biến editingIndex
  editingIndex = employees.indexOf(employee);
  // Gán giá trị cho biến editingIndex
  editingIndex = employees.indexOf(employee);

  // Thiết lập giá trị isEditing
  isEditing = true;

  // Disable nút "Thêm nhân viên"
  disableAddButton();
}

// Gọi hàm tạo bảng danh sách nhân viên khi trang được tải
createEmployeeTable();

function showError(message) {
  let errorElement = document.getElementById("error-message");
  errorElement.textContent = message;
  errorElement.style.display = "block";
}

// Tạo phần tử div
let errorDiv = document.createElement("div");
errorDiv.id = "error-message";
errorDiv.classList.add("error-message");

// Lấy phần tử cha để thêm phần tử div vào
let formElement = document.getElementById("myForm");
formElement.appendChild(errorDiv);

// Hàm kiểm tra tính hợp lệ của địa chỉ email
function isValidEmail(email) {
  let emailRegex = /\S+@\S+\.\S+/;
  return emailRegex.test(email);
}

// hàm kiểm tra ngày làm
function isValidDate(dateString) {
  let pattern = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
  if (!pattern.test(dateString)) {
    return false;
  }

  let dateParts = dateString.split("/");
  let day = parseInt(dateParts[1], 10);
  let month = parseInt(dateParts[0], 10);
  let year = parseInt(dateParts[2], 10);

  if (year < 1000 || year > 3000 || month == 0 || month > 12) {
    return false;
  }

  let maxDay = new Date(year, month, 0).getDate();
  if (day <= 0 || day > maxDay) {
    return false;
  }

  return true;
}

// hàm kiểm tra mật khẩu
function isValidPassword(password) {
  // Biểu thức chính quy để kiểm tra mật khẩu
  let pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[-+_!@#$%^&*.,?]).{6,10}$/;

  // Kiểm tra mật khẩu với biểu thức chính quy
  return pattern.test(password);
}
function deleteEmployeeByIndex(index) {
  employees.splice(index, 1);
}
// ////////////////////////////////////////////////////////////////////
function disableAddButton() {
  let addButton = document.getElementById("btnThemNV");
  addButton.disabled = true;
}

function enableAddButton() {
  let addButton = document.getElementById("btnThemNV");
  addButton.disabled = false;
}

//////////////////////////////////////yêu cầu 8:  Cập nhật nhân viên (có validation)
function updateEmployee() {
  let taiKhoan = document.getElementById("tknv").value;
  let hoTen = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let ngayLam = document.getElementById("datepicker").value;
  let chucVu = document.getElementById("chucvu").value;
  let luong = parseFloat(document.getElementById("luongCB").value);

  // Kiểm tra xem editingIndex có hợp lệ hay không
  if (editingIndex >= 0 && editingIndex < employees.length) {
    let editedEmployee = employees[editingIndex];
    editedEmployee.taiKhoan = taiKhoan;
    editedEmployee.hoTen = hoTen;
    editedEmployee.email = email;
    editedEmployee.ngayLam = ngayLam;
    editedEmployee.chucVu = chucVu;
    editedEmployee.luong = luong;

    let gioLamTrongThang = parseFloat(document.getElementById("gioLam").value);
    let password = document.getElementById("password").value;
    // Kiểm tra tài khoản
    if (taiKhoan.trim() === "") {
      showError("Vui lòng nhập tài khoản");
      return;
    }
    // Kiểm tra tên nhân viên
    if (hoTen.trim() === "") {
      showError("Vui lòng nhập tên nhân viên");
      return;
    }
    // Kiểm tra email
    if (email.trim() === "") {
      showError("Vui lòng nhập email");
      return;
    } else if (!isValidEmail(email)) {
      showError(
        "Email không đúng định dạng. Vui lòng nhập đúng định dạng email (ví dụ: example@gmail.com)"
      );
      return;
    }
    // Kiểm tra mật khẩu
    if (!isValidPassword(password)) {
      showError(
        "Mật khẩu không hợp lệ. Mật khẩu phải có từ 6 đến 10 ký tự, bao gồm ít nhất một chữ số, một chữ cái viết hoa, một chữ cái viết thường và một ký tự đặc biệt."
      );
      return;
    }
    // Kiểm tra ngày làm
    if (ngayLam.trim() === "") {
      showError("Vui lòng nhập ngày làm");
      return;
    } else if (!isValidDate(ngayLam)) {
      showError("Ngày làm không đúng định dạng. (ví dụ: mm/dd/yyyy)");
      return;
    }
    // Kiểm tra lương cơ bản
    if (isNaN(luong) || luong < 1000000 || luong > 20000000) {
      showError(
        "Lương cơ bản không hợp lệ. Vui lòng nhập lương trong khoảng từ 1,000,000 đến 20,000,000"
      );
      return;
    }
    // Kiểm tra chức vụ
    if (chucVu === "Chọn chức vụ") {
      showError("Vui lòng chọn chức vụ");
      return;
    }

    // Kiểm tra giờ làm
    if (
      isNaN(gioLamTrongThang) ||
      gioLamTrongThang < 80 ||
      gioLamTrongThang > 200
    ) {
      showError(
        "Số giờ làm không hợp lệ. Vui lòng nhập số giờ làm trong khoảng từ 80 đến 200"
      );
      return;
    }
    if (chucVu === "Sếp") {
      luong = luong * 3;
    } else if (chucVu === "Trưởng phòng") {
      luong = luong * 2;
    }

    // Tạo đối tượng nhân viên mới
    let newEmployee = {
      taiKhoan: taiKhoan,
      hoTen: hoTen,
      email: email,
      ngayLam: ngayLam,
      chucVu: chucVu,
      luong: luong,
      xepLoai: "",
    };
    if (gioLamTrongThang >= 192) {
      newEmployee.xepLoai = "xuất sắc";
    } else if (gioLamTrongThang >= 176) {
      newEmployee.xepLoai = "giỏi";
    } else if (gioLamTrongThang >= 160) {
      newEmployee.xepLoai = "khá";
    } else {
      newEmployee.xepLoai = "trung bình";
    }
    if (isEditing) {
      // Cập nhật thông tin nhân viên trong mảng
      employees[editingIndex] = newEmployee;

      // Thiết lập giá trị isEditing thành false
      isEditing = false;

      // Kích hoạt nút "Thêm nhân viên"
      enableAddButton();
    } else {
      // Thêm nhân viên mới vào mảng
      employees.push(newEmployee);
    }

    // Tạo lại bảng danh sách nhân viên
    createEmployeeTable();
    // Reset giá trị của các trường nhập liệu trong form
    document.getElementById("tknv").value = "";
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("datepicker").value = "";
    document.getElementById("chucvu").value = "Chọn chức vụ";
    document.getElementById("luongCB").value = "";
    document.getElementById("gioLam").value = "";
    document.getElementById("password").value = "";

    // Mở lại chức năng cho nút "Thêm người dùng"
    enableAddButton();
    // Đóng modal
    $("#myModal").modal("hide");

    // Gọi lại hàm tạo bảng danh sách nhân viên
    createEmployeeTable();
  }
}
// //////////////////// yêu cầu 9 nèeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
function performSearch() {
  // Lấy nội dung tìm kiếm từ phần tử <input>
  var searchKeyword = document.getElementById("searchName").value;

  // Tạo một mảng để lưu trữ kết quả tìm kiếm
  var searchResults = [];

  // Lặp qua mảng nhân viên để tìm kiếm theo từ khóa
  for (var i = 0; i < employees.length; i++) {
    var employee = employees[i];

    // Kiểm tra nếu từ khóa tìm kiếm xuất hiện trong xếp loại nhân viên
    if (
      employee.xepLoai
        .toLowerCase()
        .includes(searchKeyword.toLowerCase().trim())
    ) {
      // Nếu tìm thấy kết quả, thêm nhân viên vào mảng kết quả tìm kiếm
      searchResults.push(employee);
    }
  }

  // Gọi hàm để hiển thị kết quả tìm kiếm
  displaySearchResults(searchResults);
}
function displaySearchResults(results) {
  let tableBody = document.getElementById("tableDanhSach");
  tableBody.innerHTML = "";

  for (let i = 0; i < results.length; i++) {
    let employee = results[i];

    let row = document.createElement("tr");

    let taiKhoanCell = document.createElement("td");
    taiKhoanCell.textContent = employee.taiKhoan;

    let hoTenCell = document.createElement("td");
    hoTenCell.textContent = employee.hoTen;

    let emailCell = document.createElement("td");
    emailCell.textContent = employee.email;

    let ngayLamCell = document.createElement("td");
    ngayLamCell.textContent = employee.ngayLam;

    let chucVuCell = document.createElement("td");
    chucVuCell.textContent = employee.chucVu;

    let luongCell = document.createElement("td");
    luongCell.textContent = employee.luong;

    let xepLoaiCell = document.createElement("td");
    xepLoaiCell.textContent = employee.xepLoai;

    let cogCell = document.createElement("td");

    let deleteButton = document.createElement("button");
    deleteButton.className = "btn btn-sm btn-danger";
    deleteButton.innerHTML = '<i class="fa fa-trash"></i> Xóa';
    deleteButton.setAttribute("data-index", i);
    deleteButton.addEventListener("click", function () {
      let index = parseInt(this.getAttribute("data-index"));
      deleteEmployeeByIndex(index);
      createEmployeeTable();
    });

    let editButton = document.createElement("button");
    editButton.className = "btn btn-sm btn-warning";
    editButton.addEventListener("click", function () {
      let index = parseInt(this.getAttribute("data-index"));
      let employee = employees[index];
      displayEmployeeInfo(employee);
    });
    editButton.innerHTML = '<i class="fa fa-edit"></i> Chỉnh sửa';
    editButton.setAttribute("data-index", i);

    cogCell.appendChild(editButton);
    cogCell.appendChild(deleteButton);

    row.appendChild(taiKhoanCell);
    row.appendChild(hoTenCell);
    row.appendChild(emailCell);
    row.appendChild(ngayLamCell);
    row.appendChild(chucVuCell);
    row.appendChild(luongCell);
    row.appendChild(xepLoaiCell);
    row.appendChild(cogCell);

    tableBody.appendChild(row);
  }
}
