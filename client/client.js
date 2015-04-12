if (Meteor.isClient) {
    Meteor.subscribe("currentcity");
    Session.setDefault('twitPublished', false);
    Session.setDefault('latitude', "latitude");
    Session.setDefault('longitud', "longitud");
}

