class View {
  static error(err) {
    console.log('ERROR:');
    console.log(err);
  }

  static registerSuccess(data) {
    console.log(`save data success ${JSON.stringify(data[0])}. Total Employee: ${data[1]}`);
  }

  static loginSuccess(data) {
    console.log(`user ${data.username} logged in successfully`);
  }

  static successAddPatient(data) {
    console.log(`data pasien berhasil ditambahkan. Total data pasien: ${data}`);
  }

  static logoutSuccess() {
    console.log(`anda berhasil logout, terima kasih telah menggunakan sistem sederhana ini`);
  }
}

module.exports = View