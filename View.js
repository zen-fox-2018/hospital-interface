class View {
  static displayError(msg) {
    if (msg === 'data') {
      console.log('Data Error');
    } else if (msg === 'save') {
      console.log('Regis Gagal');
    } else if (msg === 'patient') {
      console.log('Add patient Gagal');
    }
  }

  static showAll(data) {
    console.log(data)
  }

  static writeSuccess(data, length) {
    console.log(`save data success, ${data} telah ditambahkan`);
    console.log(`Total Employee : ${length}`);
  }

  static loginFailed(msg) {
    console.log(msg);
  }
  
  static loginSuccess(log, user) {
    if (log === 'login') {
      console.log(`Login Success`)
      console.log(`Welcome ${user.username}`);
    } else if (log === 'logout') {
      console.log('Logout Success');
      console.log(`Goodbye ${user.username}`);
    }
    
  }

  static addPatientSuccess(length) {
    console.log(`Data pasien berhasil ditambahkan. Total data pasien : ${length}`)
  }

   
}




module.exports = View
