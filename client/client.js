if (Meteor.isClient) {


    Meteor.subscribe("currentcity");
    Session.setDefault('twitPublished', false);
    Session.setDefault('latitude', "latitude");
    Session.setDefault('longitud', "longitud");

    Template.hello.helpers({
        twitPublished: function () {
            return Session.get('twitPublished');
        },
        pruebas: function () {
            // Show newest tasks first
            return Prueba.find({}, {sort: {createdAt: -1}});
        }

    });
    Template.issposition.helpers({
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

    Template.hello.events({
        'click button': function () {
            //Meteor.call('postTweet');
            var position = Meteor.call('positionOfISS');
            console.log("ogjwgoihwego");
            console.log(position);
            console.log(Session.get('miau'));
            console.log("miau");
            Session.set('latitude', position.iss_position.latitude);
            Session.set('longitud', position.iss_position.longitude);
            console.log("longitud" + longitud);
        }
    });
}