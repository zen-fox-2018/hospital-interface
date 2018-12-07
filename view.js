
class View {

  static displayError(err) {
    console.log('---------- ERROR -----------');
    console.log(err);
  }

  static succeedReg(regList) {
    console.log('Registration Success:');
    console.log(`${JSON.stringify(regList[regList.length-1])}`);
    console.log(`Total Employees --- ${regList.length}`);
  }

  static succeedLogin(data) {
    if (!data.issue) {
      console.log(`user '${data.username}' successfully logged in`);
    } else {
      switch (data.issue) {
      case 'invalidCredentials':
        console.log('Wrong user / password');
        break;
      case 'alreadyLoggedIn':
        console.log('last user has not logged out yet');
        break;
      default:
        console.log('Unknown login issue');
        break;
      }
    }
  }

  static succeedAddPatient(data) {
    if (data === undefined) {
      console.log(`You dont have permission to add a patient's data`);
    } else {
      console.log(`Patient's data has been successfully added. Total Patients: ${data.length}`);
    }
  }

  static succeedLogout(data) {
    if(data === undefined) {
      console.log('Wrong username / password. You cannot log out');
    } else {
      console.log(`'${data.username}' has successfully logged out`);
    }
  }
}

module.exports = View;