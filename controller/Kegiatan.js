
const kegiatanModel = require('../model/kegiatan')
const objectId = require('mongoose').Types.ObjectId

exports.create = (data) =>
new Promise((resolve, reject) => {
    // kegiatanModel.create, Fungsi untuk menyimpan kegiatan
    kegiatanModel.create(data)
    .then(() => resolve({
        status: true,
        pesan: 'BERHASIL INPUT KEGIATAN'
    })).catch(() => reject({
        status: false,
        pesan: 'GAGAL INPUT KEGIATAN'
    }))
})

exports.showAllData = () =>
new Promise((resolve, reject) => {
    kegiatanModel.find()
    .then(result => {
        resolve({
            status: true,
            pesan: 'BERHASIL MENAMPILKAN DATA !',
            data: result
        })
    }).catch(() => reject ({
        status: false,
        pesan: 'GAGAL MENAMPILKAN DATA',
        data: []
    }))
})

exports.showDataById = (id) =>
new Promise((resolve, reject) => {
    kegiatanModel.findOne({
        _id: objectId(id)
    })
        .then(result => {
            resolve({
                status: true,
                pesan: 'BERHASIL MENAMPILKAN DATA !',
                data: result
            })  
        }).catch(() => reject ({
            status: false,
            pesan: 'GAGAL MENAMPILKAN DATA',
            data: null
        }))
})

exports.update = (id, data) => 
new Promise((resolve, reject) => {
    kegiatanModel.updateOne({
        _id: objectId(id)
    }, data).then(() => resolve({
        status: true,
        pesan: 'BERHASIL MENGUBAH DATA'
    })).catch(() => reject({
        status: false,
        pesan: 'GAGAL MENGUBAH DATA'
    }))
})

exports.delete = (id) =>
new Promise ((resolve, reject) => {
    kegiatanModel.deleteOne({
        _id : objectId(id)
    }).then(() => resolve({
        status: true,
        pesan: 'BERHASIL MENGHAPUS DATA'
    })).catch(() => ({
        status: false,
        pesan: 'GAGAL MENGHAPUS DATA'
    }))
})
