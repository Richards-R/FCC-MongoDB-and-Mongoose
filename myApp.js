/** 1) Install & Set up mongoose */
let mongoose = require('mongoose')
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

require('dotenv').config();
/** 2) Create a 'Person' Model */
let personSchema = new mongoose.Schema({
  name : {
    type : String,
    required : true
  },
  age : Number,
  favoriteFoods : [String]  
});

let Person = mongoose.model('Person', personSchema);

/** 3) Create and Save a Person */
const createAndSavePerson = function (done){ 
  let bruceWayne = new Person({
    name : "Bruce Wayne", 
    age : 30, 
    favoriteFoods : ["apple", "banana", "pear"]});

  bruceWayne.save(function(err, data){
    if (err) 
      return console.error(err);
    done(null, data)
    });
};

/** 4) Create many People with `Model.create()` */
let arrayOfPeople = [{
    name : "Bruce Wayne", 
    age : 30, 
    favoriteFoods : ["apple", "banana", "chocolate"]},
                     {
    name : "Dick Grayson", 
    age : 20, 
    favoriteFoods : ["doughnuts", "eclairs", "figs"]},
                     {
    name : "Barabara Gordon", 
    age : 18, 
    favoriteFoods : ["green peas", "hummus", "icecream"]}
                    ];

const createManyPeople = function (arrayOfPeople, done) {
  Person.create(arrayOfPeople, function(err, people) {
    if (err) 
      return console.log(err);
    done(null,people);
});
};


/** 5) Use `Model.find()` */
const findPeopleByName = function(personName, done) {
  Person.find({name : personName}, function(err, namesResult) {
    if (err) 
      return console.log(err);
    done(null, namesResult);
});
};

/** 6) Use `Model.findOne()` */
const findOneByFood = function(food, done) {
  Person.findOne({favoriteFoods : food}, function(err, foodResult) {
    if (err) 
      return console.log(err);
    done(null, foodResult);
});
};

/** 7) Use `Model.findById()` */
const findPersonById = function(personId, done) {
  Person.findById({_id : personId}, function(err, idResult){
    if (err) 
      return console.log(err);
    done(null, idResult);
});
};

/** 8) Perform Classic Updates by Running Find, Edit, then Save */
const findEditThenSave = function (personId, done) {
  const foodToAdd = "hamburger";

  // .findById() method to find a person by _id with the parameter personId as search key. 
  Person.findById({_id : personId}, function (err, idResult){
        if (err) 
      return console.error(err);
    
    // Array.push() method to add "hamburger" to the list of the person's favoriteFoods
    idResult.favoriteFoods.push(foodToAdd);
    
// and inside the find callback - save() the updated Person.
  idResult.save(function(err, updatedPerson){
    if (err) 
      return console.error(err);
    done(null, updatedPerson)
    });
    })};



const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  done(null /*, data*/);
};

const removeById = (personId, done) => {
  done(null /*, data*/);
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  done(null /*, data*/);
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
