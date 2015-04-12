/**
 * Created by Carlos on 11/4/15.
 */

    Meteor.methods({
        runloop: function() {
            //
            var i = 0;
            while (true) {
                console.log("estoy en un loop" + i);
                i = i + 1;
            }
        },
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
            var pos = Meteor.http.get("http://api.open-notify.org/iss-now.json");
            var latitude = pos.data.iss_position.latitude;
            var longitude = pos.data.iss_position.longitude;
            console.log(latitude, longitude);

            var city = Meteor.http.get("http://maps.googleapis.com/maps/api/geocode/json?latlng="+ latitude + "," + longitude + "&sensor=true_or_false");
            console.log(city.data.results.address_components);
            //console.log(city);
            console.log('MIAU');


            var cityLongName = 'No city here';


            if (city != 'undefined'){
                city.data.results.forEach(function (acity) {
                    //console.log(acity.address_components[0].long_name);
                    var adcomp = acity.address_components[0]
                    if(adcomp.types[0] == 'locality'){

                        console.log(adcomp.long_name);
                        cityLongName = adcomp.long_name;
                    }
                    /*console.log(acity.address_components);
                     console.log('');*/
                });
                //console.log(city);

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
        automatedTweet: function(secondsInterval, timeCalled){
            var currentTime = new Date();
            var difference = (currentTime - timeCalled) / 1000;
            var cityName = CurrentCity.findOne().cityLongName;


            if(difference > secondsInterval) {
                if (cityName != '' && cityName != 'No city here' && cityName != null && cityName != 'undefined') {
                    postTUser("We are right now passing over #" + cityName);
                }
            }

        }
    });
