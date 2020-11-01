const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const productSchema = mongoose.Schema({
    writer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        maxlength: 50
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
        default: 0
    },
    images: {
        type: Array,
        default: []
    },
    sold: {
        type: Number,
        maxlength: 100,
        default: 0
    },
    continent: {
        type: Number,
        default: 1
    },
    views: {
        type: Number,
        default: 0
    }

}, { timestamps: true })
// timestamps : true는 자동으로 업로드시간등을 정해줌

productSchema.index({
    title:'text',
    description:'text'
}, {
    weights: {
        title: 5,   //중요도 title이 5배 더 중요행
        description: 1
    }
})

const Product = mongoose.model('Product', productSchema);

module.exports = { Product }