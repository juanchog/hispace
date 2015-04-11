if (Meteor.isClient) {
    Meteor.subscribe("getLat");
  Session.setDefault('twitPublished', false);
    Session.setDefault('latitude', "latitude");
    Session.setDefault('longitud', "longitud");

  Template.hello.helpers({
    twitPublished: function () {
      return Session.get('twitPublished');
    },

  });
    Template.issposition.helpers({
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

if (Meteor.isServer) {
  Meteor.startup(function () {

  });

    Meteor.methods({
        postTweet: function() {
            Twit = new TwitMaker({
                consumer_key: '2nuTAmxr5kcnajWFLhZH4Uot1'
                , consumer_secret: 'H51cswVtT7521okJpxCxi4giKBUb2AqEu8xdCtEtDbzemXPG3j'
                , access_token: '3154707879-qTsy7TjARsQePUfAbuQQzDAeRiUIKfgrvInenWQ'
                , access_token_secret: 'SD4lqNETA8quP12U7ukSSGAPHTgoBVNZFRcBIFCnifd0o'
            });
            Twit.post('statuses/update', {status: 'Test from Carlos'}, function (err, data, response) {

                console.log(data);
                console.log(reponse);
            });
        },
        positionOfISS: function() {
            var res = Meteor.http.get("http://api.open-notify.org/iss-now.json");
            console.log(res.data.iss_position.latitude, res.data.iss_position.longitude);
            return res.data;

        }
    });
    Meteor.publish("getLat", function() {
        return "riaun";
    });


}
