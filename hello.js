if (Meteor.isClient) {
  Session.setDefault('twitPublished', false);

  Template.hello.helpers({
    twitPublished: function () {
      return Session.get('twitPublished');
    }
  });

  Template.hello.events({
    'click button': function () {
        Meteor.call('postTweet');
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
            Twit.post('statuses/update', {status: 'hello ISS 2!'}, function (err, data, response) {
                Session.set('twitPublished', true);
                console.log(data);
                console.log(reponse);
            });
        }
    });

}
