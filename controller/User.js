const userModel = require('../model/user')
const bcrypt=require('bcrypt')
exports.register = (data) =>
new Promise((resolve, reject) =>{

    //ini untuk mencari satu data
    userModel.findOne({
        username: data.username
    }).then((user) =>{
        if(user){
            resolve({
                status :false,
                pesan:'username telah terdaftar'
            })
        }else{
            bcrypt.hash(data.password, 10, (err, hash) => {
            data.password = hash
                userModel.create(data).then(() =>{
                    //console.log ('berhasil insert')
                    resolve({
                        status: true,
                        pesan:'berhasil insert data user'
                    })
                    
                    }).catch((e)=>{
                        reject({
                            status: false,
                            pesan:'gagal insert data user'
                    
                        //console.log(e)
                        //console.log('gagal insert')
                    }) 
                    })
            })
        }
    })


})
exports.login=(username,password)=>
new Promise((resolve,reject)=>{
    console.log(username)
    userModel.findOne({

        username: username
    }).then((user) =>{
        if (user){
            if (bcrypt.compareSync(password,user.password)){
                resolve({
                    status : true,
                    pesan :'berhasil login'
                
                })
            }else{
                reject({
                    status: false,
                    pesan :'password tidak sesuai'
                })
            }
        }else{
            reject({
                status: false,
                pesan:'username tidak terdaftar'
            })
        }

})
})
const router = require('express').Router()
const userContrroller = require('../controller/user')
router.post('/register', (req,res)=>{
    userContrroller.register(req.body)
        .then(result =>res.json(result))
        .catch(err => res.json(err))
})

router.post('/login', (req,res)=>{
    let username = req.body.username
    let password = req.body.password
    userContrroller.login(username, password)
        .then(result =>res.json(result))
        .catch(err => res.json(err))
})

        
module.exports=router