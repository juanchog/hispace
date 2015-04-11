Meteor.publish('currentcity', function() {
    return CurrentCity.findOne();
});