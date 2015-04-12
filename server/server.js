/**
 * Created by Carlos on 11/4/15.
 */
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
    });
