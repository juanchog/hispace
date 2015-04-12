Template.appbody.helpers({
    logged: function () {
        if(Meteor.user()) {
            return true;
        }else{
            return false;
        }

    }
});


