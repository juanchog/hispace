Template.sayhi.events({
    'click button': function (event, template) {
        //Meteor.call('postTweet');
        console.log(event);
        var position = Meteor.call('positionOfISS');
        var twitText = event.target.name.value;
        console.log(twitText);
        console.log('el event');
        console.log(event.target);

        Meteor.call("postTUser", twitText, data, function(err,result) {
            if(!err) {
                alert("Tweet posted");
            }
        });
        console.log("ogjwgoihwego");
        console.log(position);
        console.log(Session.get('miau'));
        console.log("miau");
        Session.set('latitude', position.iss_position.latitude);
        Session.set('longitud', position.iss_position.longitude);
        console.log("longitud" + longitud);
    },
    'submit .sendTwit': function (event) {
        alert("Entamos en el evento");
        Meteor.call("postTUser", "Nuevo twit!", data, function(err,result) {
            if(!err) {
                alert("Tweet posted");
            }else{
                alert("Couldn't post twit");
            }
        });
    },
        "submit .new-task": function (event) {
            // This function is called when the new task form is submitted

            var text = event.target.text.value;

            alert("Texto del formulario: " + text);

            // Clear form
            event.target.text.value = "";

            // Prevent default form submit
            return false;
        },
    'submit form': function(event){
        event.preventDefault();
        var twitTextVar = event.target.twitText;
        Meteor.call("postTUser", twitTextVar.value, function(err,result) {
            if(!err) {
                alert("Tweet posted");
            }
        });
        alert("Texto del formulario: " + twitTextVar.value);
        console.log(twitTextVar);
    }

});

Template.sayhi.helpers({
    pruebas: function () {
        return Prueba.find();
    },
    issPosition: function () {
        console.log(CurrentCity.findOne());
        return CurrentCity.findOne();

    },
    isslatitude: function () {
        var latitude = Session.get('latitude');
        console.log("latitude" + latitude);
        return Session.get('latitude');
    },
    isslongitud: function () {
        var longitud = Session.get('longitud');
        console.log("longitud" + longitud);
        return Session.get(longitud);
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