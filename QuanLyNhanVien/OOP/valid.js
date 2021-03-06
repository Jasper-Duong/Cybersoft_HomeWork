//4. Validation

function Validation() {
  this.alertEmpty = "(*) Vui lòng không để trống ";
  this.alertVal = [
    "Tài Khoản là chuỗi số có độ dài từ 4 đến 6 ký số",
    "Tên Nhân Viên phải là chữ",
    "Email phải đúng định dạng (VD: abc@xyz.[domain])",
    "Mật khẩu từ 6-10 ký tự (chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt)",
    "Ngày làm phải theo định dạng mm/dd/yyyy",
    "Lương cơ bản từ 1.000.000 -> 20.000.000",
    "Chọn chức vụ hợp lệ (Sếp, Trưởng Phòng, Nhân Viên)",
    "Số giờ làm trong tháng từ 80 -> 200 giờ",
  ];
  this.arrRuleVal = [
    "ele.match(validation.accountFormat)",
    "ele.match(validation.letters)",
    "ele.match(validation.emailFormat)",
    "ele.match(validation.passwordFormat)",
    "ele.match(validation.dateFormat)",
    "Number(ele) >= 1000000 && Number(ele) <= 20000000",
    "true",
    "Number(ele) >= 80 && Number(ele) <= 200",
  ];
  this.accountFormat = /[0-9]{4,6}/g;
  this.letters = /[A-Za-z]+/g;
  this.emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  this.passwordFormat =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,10}$/;
  this.dateFormat =
    /^(0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])[- /.](19|20)\d\d+$/;

  this.valEmpty = function (ele, id) {
    var isValid = true;
    var divTB = getEle(helper.arrAlertId[id]);
    if (ele === "") {
      divTB.innerHTML =
        this.alertEmpty + getEle(helper.arrInputId[id]).placeholder;
      divTB.style.display = "block";
      isValid = false;
    } else if (ele === "Chọn chức vụ") {
      divTB.innerHTML = "(*) Vui lòng chọn Chức Vụ";
      divTB.style.display = "block";
      isValid = false;
    } else {
      divTB.style.display = "none";
    }
    return isValid;
  };
  this.valRules = function (ele, id) {
    var isValid = true;
    var divTB = getEle(helper.arrAlertId[id]);
    if (eval(this.arrRuleVal[id])) {
      divTB.style.display = "none";
    } else {
      divTB.innerHTML = this.alertVal[id];
      divTB.style.display = "block";
      isValid = false;
    }
    return isValid;
  };
  this.valExisted = function (arr, ele, id, message) {
    var isValid = true;
    var divTB = getEle(helper.arrAlertId[id]);
    arr.forEach(function (item) {
      if (item.taiKhoan.match(ele)) {
        isValid = false;
      }
    });
    if (!isValid) {
      divTB.style.display = "block";
      divTB.innerHTML = message;
    } else {
      divTB.style.display = "none";
    }
    return isValid;
  };
  this.validate = function (arrInput) {
    var valid = true;
    arrInput.forEach(function (ele, id) {
      var subValid = true;
      //Check if empty
      subValid &= validation.valEmpty(ele, id);
      //If already empty => No need to check rules
      if (!subValid) {
        valid &= subValid;
        return;
      }
      subValid &= validation.valRules(ele, id);
      valid &= subValid;
    });
    return valid;
  };
  this.validateAdd = function (arrNV, arrInput) {
    var valid = true;
    valid &= this.validate(arrInput);
    valid &= this.valExisted(arrNV, arrInput[0], 0, "Tài khoản đã tồn tại");
    return valid;
  };
}
