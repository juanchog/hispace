var dateLastTweet = new Date ();
var tweetInterval = 30;

    Meteor.methods({
        runloop: function() {
            //
            var i = 0;
            while (true) {
                console.log("estoy en un loop" + i);
                i = i + 1;
            }
        },
        postTweet: function(text) {
            Twit = new TwitMaker({
                consumer_key: '2nuTAmxr5kcnajWFLhZH4Uot1'
                , consumer_secret: 'H51cswVtT7521okJpxCxi4giKBUb2AqEu8xdCtEtDbzemXPG3j'
                , access_token: '3154707879-qTsy7TjARsQePUfAbuQQzDAeRiUIKfgrvInenWQ'
                , access_token_secret: 'SD4lqNETA8quP12U7ukSSGAPHTgoBVNZFRcBIFCnifd0o'
            });
            Twit.post('statuses/update', {status: text}, function (err, data, response) {

            });
        },
        positionOfISS: function() {
            var pos = Meteor.http.get("http://api.open-notify.org/iss-now.json");
            var latitude = pos.data.iss_position.latitude;
            var longitude = pos.data.iss_position.longitude;
            console.log(latitude, longitude);

            var city = Meteor.http.get("http://maps.googleapis.com/maps/api/geocode/json?latlng="+ latitude + "," + longitude + "&sensor=true_or_false");
            console.log(city.data.results.address_components);
            console.log('MIAU');


            var cityLongName = 'No city here';


            if (city != 'undefined'){
                city.data.results.forEach(function (acity) {
                    var adcomp = acity.address_components[0]
                    if(adcomp.types[0] == 'locality'){

                        console.log(adcomp.long_name);
                        cityLongName = adcomp.long_name;
                    }
                });
            }

            CurrentCity.findOne();
            CurrentCity.update(CurrentCity.findOne(), {name: cityLongName, latitude: latitude, longitude: longitude});

            return pos.data;
        },
        postTUser: function(text) {
            var twitter = new TwitterApi();

            if(Meteor.user()) {
                twitter.postTweet(text);
                return true;
            }
            return false;
        },
        pollISSPositionLoop : function(text) {
            var timesRun = 0;
            var startTime = new Date().getTime();

            var doStuff = function () {
                var now = new Date().getTime();

                console.log('Action ' + (timesRun + 1) + ' started ' + (now - startTime) + 'ms after script start');

                // Waste some time
                for (var i = 0; i < 100000; i++) {
                    document.getElementById('unobtanium');
                }

                console.log('and took ' + (new Date().getTime() - now) + 'ms to run.');

                // Run only 5 times
                if (++timesRun < 5) {
                    setTimeout(doStuff, 1000);
                }
            };

            setTimeout(doStuff, 1000);
        },
        automatedTweet: function(){
            var currentTime = new Date();
            var difference = (currentTime - dateLastTweet) / 1000;
            var cityName = CurrentCity.findOne().cityLongName;
            Meteor.call('postTweet', "We are right now passing over #" + 'Puertollano');
            if(difference > tweetInterval) {
                if (cityName != '' && cityName != 'No city here' && cityName != null && cityName != 'undefined') {
                    Meteor.call('postTweet', "Hi to all our folks in #" + cityName.replace(/\s+/g, '')
                    + " we are flying over your heads right now! #spaceappchallenge #spaceappsvlc #nasa");
                }else{
                    Meteor.call('postTweet', "We are now flying over the middle of nowhere, stay tunned! #spaceappchallenge #spaceappsvlc #nasa");
                }
            }

        }
    });
