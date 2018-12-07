
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
    static erraddPatient(){
        console.log("tidak memilii akses untuk add patient");
    }
    static erraddPatientNotLog() {
        console.log('You are not logged in yet');
    }
    static successAddPatient(data) {
        console.log(`data pasien berhasil ditambahkan. Total data pasien : ${data.length}`);
        
    }

}

module.exports = View