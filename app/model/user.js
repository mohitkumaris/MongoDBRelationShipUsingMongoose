



// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


mongoose.connect('mongodb://192.168.108.181:27017/CollectionRelationTestDB');

// create a schema
var PersonSchema = new Schema({
    name    : String
  , age     : Number
  , stories : [{ type: Schema.ObjectId, ref: 'Story' }]
});

var StorySchema = new Schema({
    _creator : { type: Schema.ObjectId, ref: 'Person' }
  , title    : String
  , fans     : [{ type: Schema.ObjectId, ref: 'Person' }]
});

var Story  = mongoose.model('Story', StorySchema);
var Person = mongoose.model('Person', PersonSchema);


var aaron = new Person({ name: 'Aaron', age: 100 });

aaron.save(function (err) {
  if (err) {

  }

  
  var story1 = new Story({
      title: "A man who cooked Nintendo"
    , _creator: aaron._id
  });

  story1.save(function (err) {
    if (err) {

    }
    console.log('Story data is saved');

    // Add stories in Aaron 

    aaron.stories.push(story1);
    aaron.save();

    Person.findOne({name:'Aaron'})
    .populate('stories')
    .exec(function(err,person){
    if(err)
    {

    }
    console.log('JSon for person is:',person);

    });

  });


})

Story
.findOne({ title: /Nintendo/i })
.populate('_creator') // <--
.exec(function (err, story) {
  if (err) {

  }
  console.log('The creator is %s', story._creator.name);
  // prints "The creator is Aaron"
})


// make this available to our users in our Node applications
//module.exports = User;
