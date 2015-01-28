Spots = new Mongo.Collection("spots");

if (Meteor.isServer) {

	Spots.allow({
		'insert': function(userId, doc) {
			return true;

		},
		'remove': function(userId, doc) {
			return true;
		},

		'update': function(userId, doc) {
			return true;
		}
		
	});

	Meteor.methods({
		geoCoder: function (address) {
		var geo = new GeoCoder();
		var result = geo.geocode(address);
		return result;
		},
	
		checkMeteo: function (latitude, longitude) {
			var baseUrl = 'https://api.forecast.io/forecast/e779d40307caf2f42aa37625a35e9db9/';
			return Meteor.http.get(baseUrl + latitude + ',' + longitude);
		}
		
	});
} 

if (Meteor.isClient) {

	Accounts.ui.config ({
        passwordSignupFields: 'USERNAME_ONLY'  
  });

	Template.newSpot.events({
		'click #send': function() {
			var address = $('#newAddress').val();

				Meteor.call ('geoCoder',address, function (err,res) {
						var lat = res[0].latitude;
						var lon = res[0].longitude;
					Meteor.call ('checkMeteo', lat, lon, function (err, res) {
							var windSpeed = res.data.currently.windSpeed * 1.609;
							var windSpeed2 =  res.data.daily.data[2].windSpeed * 1.609;
							var windSpeed3 =  res.data.daily.data[3].windSpeed * 1.609;
							var windSpeed4 =  res.data.daily.data[4].windSpeed * 1.609;
							var windSpeed5 =  res.data.daily.data[5].windSpeed * 1.609;
							var windSpeed6 =  res.data.daily.data[6].windSpeed * 1.609;
							var windSpeed7 =  res.data.daily.data[7].windSpeed * 1.609;
							var windSpeedEntier1 = Math.floor(windSpeed);
							var windSpeedEntier2 = Math.floor(windSpeed2);
							var windSpeedEntier3 = Math.floor(windSpeed3);
							var windSpeedEntier4 = Math.floor(windSpeed4);
							var windSpeedEntier5 = Math.floor(windSpeed5);
							var windSpeedEntier6 = Math.floor(windSpeed6);
							var windSpeedEntier7 = Math.floor(windSpeed7);
							var iconSummaryTomorrow = res.data.daily.data[2].icon;
							var summaryTomorrow = res.data.daily.data[2].summary;
							var temperatureMinTomorrowF = res.data.daily.data[0].temperatureMin;
							var temperatureMaxTomorrowF = res.data.daily.data[0].temperatureMax;
							var temperatureMinTomorrowC = Math.floor(( temperatureMinTomorrowF - 32 ) * 5/9 );
							var temperatureMaxTomorrowC = Math.floor(( temperatureMaxTomorrowF - 32 ) * 5/9 );
							var humidityTomorrow = Math.floor((res.data.daily.data[0].humidity*100));
						Spots.insert({
							address: address,
							lat: lat,
							lon: lon,
							windSpeedEntier1: windSpeedEntier1,
							windSpeedEntier2: windSpeedEntier2,
							windSpeedEntier3: windSpeedEntier3,
							windSpeedEntier4: windSpeedEntier4,
							windSpeedEntier5: windSpeedEntier5,
							windSpeedEntier6: windSpeedEntier6,
							windSpeedEntier7: windSpeedEntier7,
							summaryTomorrow: summaryTomorrow,
							humidityTomorrow: humidityTomorrow,
							iconSummaryTomorrow: iconSummaryTomorrow,
							temperatureMinTomorrowF: temperatureMinTomorrowF,
							temperatureMaxTomorrowF: temperatureMaxTomorrowF,
							temperatureMinTomorrowC: temperatureMinTomorrowC,
							temperatureMaxTomorrowC: temperatureMaxTomorrowC,
							createdBy: Meteor.userId(),
							timestamp: Date.now()
						});
					});
				});
				$('#newAddress').val('');
	  }
	});

	Handlebars.registerHelper('getStatusColor', function(status) {
		if ( 8 <= status && status <= 30 ) {
			return 'green';
		}
		else {
			return 'red';
		}
	});

	Handlebars.registerHelper('getIconColor', function(iconSummaryTomorrow) {
		if ( iconSummaryTomorrow == "clear-day") {
			return 'green';
		}
		else {
			return 'red';
		}
	});
	
	Template.spotsList.events({
			'click #delete': function () {
					Spots.remove(this._id);
			}
					
	});

	Template.spotsList.helpers({
			spots: function (userId) {
					return Spots.find({createdBy: Meteor.userId()},{ sort: { timestamp: -1}});		
			}
	});
}

