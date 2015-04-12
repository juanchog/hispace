Template.sayhi.events({
    'click button': function (event, template) {
        //Meteor.call('postTweet');
        console.log(event);
        var position = Meteor.call('positionOfISS');

        console.log("miau");
        Session.set('latitude', position.iss_position.latitude);
        Session.set('longitud', position.iss_position.longitude);
        console.log("longitud" + longitud);
    },

    'submit form': function(event){
        event.preventDefault();
        var twitTextVar = event.target.twitText;
        Meteor.call("postTUser", twitTextVar.value, function(err,result) {
            if(!err) {
                alert("Tweet posted");
            }else{
                alert("Couldn't post twit");
            }
        });

        console.log(twitTextVar);

        Meteor.runloop();
        console.log("Debajo del loop");
    }

});



Template.sayhi.helpers({
    twitPublished: function () {
        return Session.get('twitPublished');
    },
    pruebas: function () {
        // Show newest tasks first
        return Prueba.find({}, {sort: {createdAt: -1}});
    }

});