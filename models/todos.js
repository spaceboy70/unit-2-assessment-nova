const {Schema, model} = require('mongoose');


const toDoSchema = new Schema({
    item: {type: String, required: true},
    done: {type:Boolean, required: true, default: false}
})

module.exports = model('Todos',  toDoSchema);