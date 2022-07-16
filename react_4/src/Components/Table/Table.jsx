import React, { Component } from "react";
import { connect } from "react-redux";
class Table extends Component {
  renderList = () => {
    return this.props.listSV.map((ele) => {
      return (
        <tr key={ele.maSV}>
          <td>{ele.maSV}</td>
          <td>{ele.hoTen}</td>
          <td>{ele.soDienThoai}</td>
          <td>{ele.email}</td>
        </tr>
      );
    });
  };
  render() {
    return (
      <table className="table container text-left">
        <thead className="bg-dark text-light">
          <tr>
            <th>Mã SV</th>
            <th>Họ Tên</th>
            <th>Số Điện Thoại</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>{this.renderList()}</tbody>
      </table>
    );
  }
}
export default connect((state) => ({ ...state.sinhVienReducer }))(Table);
