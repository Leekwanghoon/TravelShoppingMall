const express = require('express');
const router = express.Router();
const multer = require('multer');
const { Product } = require('../models/Product');
//=================================
//             Product
//=================================


// multer npm 저장소
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}_${file.originalname}`)
    }
})

var upload = multer({ storage: storage }).single("file");

router.post('/image', (req, res) => {
    //가져온 이미지를 저장하면 된다.
    upload(req, res, err => {
        if (err) {
            return res.json({
                success: false,
                err
            })
        }
        return res.json({
            success: true,
            filePath: res.req.file.path,
            fileName: res.req.file.filename,
        })
    })
})


//submit버튼 상품 body로 총 데이터 DB에 저장하기
router.post('/', (req, res) => {
    //받아온 정보들을 DB에 넣어준다.
    const product = new Product(req.body);

    product.save((err) => {
        if (err) return res.status(400).json({ success: false, err })
        return res.status(200).json({ success: true })
    });
})

//LandingPage 불러오기
router.post('/products', (req, res) => {

    let limit = req.body.limit ? parseInt(req.body.limit) : 100;
    let skip = req.body.skip ? parseInt(req.body.skip) : 0;
    let term = req.body.searchTerm


    let findArgs = {};

    //key는 continent아니면 price
    for (let key in req.body.filters) {
        if (req.body.filters[key].length > 0) {

            if (key === "price") {
                findArgs[key] = {
                    $gte: req.body.filters[key][0],
                    $lte: req.body.filters[key][1]
                }
            } else {
                //[1,2,3] << map이 array로 넘김 ㅇ
                findArgs[key] = req.body.filters[key];
            }
        }
    }

    console.log('findArgs', findArgs);

    //검색 term
    if (term) {
        Product.find(findArgs) // Product안에 모든 정보를 찾아
            .find({ $text: { $search: term } })
            .populate("writer")
            .skip(skip)
            .limit(limit)
            .exec((err, productInfo) => {
                if (err) return res.status(400).json({ success, err })
                return res.status(200).json({
                    success: true,
                    productInfo,
                    postSize: productInfo.length
                })
            })
    } else {
        // product collection에 들어 있는 모든 상품 정보를 가져오기
        Product.find(findArgs) // Product안에 모든 정보를 찾아
            .populate("writer")
            .skip(skip)
            .limit(limit)
            .exec((err, productInfo) => {
                if (err) return res.status(400).json({ success, err })
                return res.status(200).json({
                    success: true,
                    productInfo,
                    postSize: productInfo.length
                })
            })
    }
})

//id=1212121,213232,3232 type=array
router.get('/products_by_id', (req, res) => {

    //정보 가져올때는 body가 아닌 query이다
    let type = req.query.type
    let productIds = req.query.id
    
    // productIds = ['1232','12121','1212121']
    if(type === 'array') {
        // id=1212121,23,323,2432를
        // productIds = ['12121','2121','121211']식으로 바꿔주기
        let ids = req.query.id.split(',')
        productIds = ids.map(item => {
            return item
        })

    }

    //배열로 들어오기에 다른 방식 in
    //productId를 이용하여 DB에서 productId와 같은 상품을 가져온다.
    Product.find({ _id: {$in: productIds} })
        .populate('writer')//writer의 모든 정보
        .exec((err, product) => { //실행
            if (err) return res.status(400).send(err); //결과값주고
            return res.status(200).send(product)//성공 product보내
        })

})

module.exports = router;
