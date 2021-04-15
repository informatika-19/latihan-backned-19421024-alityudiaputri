const kegiatanmodel = require('../model/Kegiatan')

exports.create =(data) =>
new Promises((resolve, reject) => {

    kegiatanmodel.create(data)
    .then(() => resolve ({
        status: true,
        pesan: 'Berhasil Input Kegiatan'
    })).catch(() => reject({
        status = false,
        pesan: 'Gagal Input Kegiatan'
    }))

})