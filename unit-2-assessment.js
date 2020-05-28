const express = require('express');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const app = express();
const db = mongoose.connection;
const PORT = process.env.PORT || 3000;
const ToDo = require('./models/todos.js');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/unit2assessment';
mongoose.connect(MONGODB_URI ,  { useNewUrlParser: true, useFindAndModify: true, useUnifiedTopology: true });

db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));

db.on('open' , ()=>{});


app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride('_method'));
app.set ('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());


app.get('/', (req,res)=>{
    ToDo.find({}, (error, allToDos)=>{
        if (error){
            show(error);
        } else {
            allToDos.length == 0 ? res.render('Index', {toDos: allToDos.length}) :
            res.render('Index', {toDos: allToDos});
        };
    });
});


app.post('/', (req, res)=>{
    ToDo.create(req.body, (error, createdToDo)=>{
        if(error) {
            show(error);
        } else{
            res.redirect('/');
        }
    });
})

app.delete('/:id', (req, res)=>{
    ToDo.findByIdAndRemove(req.params.id, (error, log)=>{
        res.redirect('/');
    })
})



if (process.env.PORT){
    app.listen(PORT);
} else {
    app.listen(PORT,'localhost', () => console.log( 'Listening on port:', PORT));}