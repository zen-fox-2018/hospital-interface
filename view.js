

class View {
    static registerSuccess (newUser, count) {
        console.log(`Save data success {"username": ${newUser.username}, "password": ${newUser.password}, "role": ${newUser.position}}. total employee: ${count}`)
        console.log('Registration succeed')
    }

    static registerUnsuccess (err) {
        console.log('Registration failed')
        console.log(err)
    }

    static loginSuccess (username) {
        console.log(`user ${username} logged in successfully`)
    }

    static loginUnsuccess (err) {
        // console.log(err)
        console.log(`username / password wrong`)
    }

    static addPatientUnsuccess (err) {
        console.log(err)
    }

    static addPatientSuccess (total) {
        console.log(`Data patient berhasil ditambahkan. Total data patient : ${total}`)
    }
    static addPatientNonDokter () {
        console.log('Anda tidak memiliki akses untuk add patient')
    }
}

module.exports = View