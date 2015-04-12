Template.appbody.events({
    'click #sayHi': function(e) {
        Router.go('sayhi');
    }
});
Template.sayhi.events({
    'click #sendTwit': function(e) {
        Router.go('sendtwit');
    }
});
Template.sendtwit.events({
    'click #thanks': function(e) {
        Router.go('thanks');
    }
});


Router.map(function() {
    // URL: /
    this.route('appbody', {
        path: '/'
    });

    // url: /signin
    this.route('signin', {
        path: 'sign-in'
    });

    this.route('sayhi', {
        path: 'sayhi'
    });

    this.route('sendtwit', {
        path: 'send-twit'
    });

    this.route('thanks', {
        path: 'thanks'
    });
});