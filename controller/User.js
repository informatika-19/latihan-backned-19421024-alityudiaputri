const  userModel = require('../model/User')
const bcrypt = require('bcrypt')

exports.register = (data) =>
new Promise((resolve, reject) =>{
//console.log(data)
//ini coding untuk mencari 1 data
userModel.findOne({
    UserName: data.UserName
}).then(adauser => {
    if (adauser){
        resolve({
            status: false,
            pesan: 'USERNAME SUDAH DI DAFTARKAN'
        })
    }else {
        bcrypt.hash(data.Password, 10, (err, hash) =>{
            data.Password = hash
            // Untuk Menginput (INSERT Data)
            userModel.create(data)
            .then(() =>{
            //console.log('berhasil insert')
            resolve({
                status:  true,
                pesan : 'Input Data User Telah Berhasil'
            })
            }).catch((e) =>{
            //console.log(e)
            //console.log('gagal insert')
            reject({
                status: false,
                pesan: 'Galat Insert Data Baru'
            })
            })
        })    
    }
})

})
exports.login = (data) =>
new Promise((resolve, reject) =>{
    try {
        userModel.findOne({
            UserName: data.UserName
        }).then(user => {
            if (user) {
                if (bcrypt.compareSync(data.Password, user.Password)) {
                    resolve({
                        status: true,
                        pesan: 'BERHASIL LOGIN'
                    })
                } else {
                    reject({
                        status: false,
                        pesan: 'PASSWORD TIDAK SESUAI'
                    })
                }
            } else {
                reject({
                    status: false,
                    pesan: 'USERNAME TIDAK TERDAFTAR'
                })
            }
        })
    } catch (e) {
        console.log(e)
    }
})