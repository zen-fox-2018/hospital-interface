
class View {

    static errWriteData(err){
        console.log('Register Failed! ');
        console.log(err);
    }
    static errGetData(err) {
        console.log(("Error to get data"));
        console.log((err));
    }
    static succesWriteData(data) {
        console.log(`save data success {"username":"${data[data.length - 1].username}","password":"${data[data.length - 1].password},"role":"${data[data.length - 1].position}". Total employee : ${data.length}`);
    }

    static succesLogin(username) {
        console.log(`user ${username} logged in successfully`);
    }
    static errLogin(err) {
        console.log(err);
        
    }

}

module.exports = View