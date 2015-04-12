if (Meteor.isClient) {
    Meteor.subscribe("currentcity");
    Session.setDefault('twitPublished', false);
    Session.setDefault('latitude', "latitude");
    Session.setDefault('longitud', "longitud");
}

Template.body.helpers({
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