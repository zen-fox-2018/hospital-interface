const Employee = require('../Model/Employee.js');
const Patient = require('../Model/Patient.js');
const View = require('../View/View.js')

class HospitalController {
  static listData() {
    Employee.allEmployee((err, employeesData) => {
      if (err) {
        View.showError(err);
      } else {
        View.showAllEmployee(employeesData);
      }
    });
  }

  static register(data) {
    Employee.register(data, (err, total,newData) => {
      if (err) {
        View.showError(err);
      } else {
        if (newData) {
          View.registerSuccess(newData, total);
        } else {
          let msg = "Username sudah ada";
          View.showError(msg);
        }
      }
    })
  }

  static findData(search) {
    Employee.findData(search, (err, data) => {
      if (err) {
        View.showError(err);
      } else if (!data) {
        let msg = "Data tidak ditemukan";
        View.showError(msg)
      } else {
        View.findData(data);
      }
    });
  }

  static login(data, action) {
    Employee.login(data, action, (err, status, user) => {
      if (err) {
        View.showError(err);
      } else {
        if (status === 'wrong') {
          let msg = 'Username atau password salah!!!';
          View.showError(msg);
        } else if (status === 'isLogin') {
          let msg = `${user.username} sedang aktif`;
          View.showError(msg);
        } else if (action === 'login' && status === 'success'){
          View.loginSuccess('Login', 'datang', user);
        } else if(action === 'logout' && status === 'success')
          View.loginSuccess('Logout', 'tinggal', user);
      }
    })
  }

  static listPatient() {
    Patient.allPatient((err, patients) => {
      if (err) {
        View.showError(err);
      } else {
        View.showAllEmployee(patients);
      }
    });
  }

  static addPatient(data) {
    Employee.addPatient((err, status) => {
      if (err) {
        View.showError(err);
      } else {
        if (status === true) {
          Patient.addPatient(data, (err, total) => {
            if (err) {
              View.showError(err);
            } else {
              View.addPatientSuccess(total);
            }
          })
        } else {
          let msg = 'tidak memiliki akses untuk add patient';
          View.showError(msg);
        }
      }
    })
  }

}

module.exports = HospitalController;
