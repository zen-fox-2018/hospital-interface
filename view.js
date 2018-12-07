
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
    if(!data) {
      console.log('Wrong user / password');
    } else if (data === undefined) {
      console.log('last user has not logged out yet');
    } else {
      console.log(`user '${data.username}' successfully logged in`);
    }
  }
}

module.exports = View;