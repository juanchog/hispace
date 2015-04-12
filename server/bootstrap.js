


// if the database is empty on server start, create some sample data.
Meteor.startup(function () {
    if (CurrentCity.find().count() === 0) {
        var data = [
            {name: 'Valencia', latitude: '39.4077852', longitude: '-0.3615113'}

        ];

        var timestamp = (new Date()).getTime();
        _.each(data, function(city) {
            var city_id = CurrentCity.insert({name: city.name, latitude: city.latitude
, longitude: city.longitude
            });

        });
    }

    Meteor.setInterval(function () {
        Meteor.call('positionOfISS');
        Meteor.call('automatedTweet', 30, new Date());
    }, 1000);
});

