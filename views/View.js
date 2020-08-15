class View {
  static display( msg, data) {
    if (data){
      console.log(msg, data)
    } else {
      console.log(msg)
    }
  }

  static help() {
    console.log(`
    ================= AVAILABLE COMMAND ===============
    node main.js register <username> <password> <role>
    node main.js login <username> <password>
    node main.js addPatient <patient_name> <diagnosis>
    node main.js logout <username>
    ===================================================
    `)
  }
}

module.exports = View