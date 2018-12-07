class View {
  static showAllEmployee(data) {
    console.log(data);
  }

  static showError(err) {
    console.log(`ERROR !!!!!!`);
    console.log(err);
  }

  static registerSuccess(newData, total) {
    console.log(`data success ${JSON.stringify(newData, null, 2)}. Total employee : ${total}`);
  }

  static findData(data) {
    console.log(data);
  }

  static loginSuccess(action, msg, data) {
    console.log(`${action} Berhasil`);
    console.log(`Selamat ${msg} ${data.name}`);
  }

  static addPatientSuccess(total) {
    console.log(`data pasien berhasil ditambahkan. Total pasien : ${total}`);
  }
}

module.exports = View;
