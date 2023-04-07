const mongoose=require('mongoose')

const Schema=mongoose.Schema
const budgetSchema= new Schema({
    amount:{
        type:Number,
        required: true,
        default: 0
    },
    userId:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    updatedAt:{
        type:Date,
        default:Date.now()
    }
},{timestamps:true})

const Budget = mongoose.model('Budget',budgetSchema)

module.exports=Budget