

var SHADOW = new google.maps.MarkerImage('medicare-shadow.png', null, null,    new google.maps.Point(14, 13));


google.maps.event.addDomListener(window, 'load', function() {
  var map = new google.maps.Map(document.getElementById('map-canvas'), {
    center: new google.maps.LatLng(22.05, 80.9781),
    zoom: 5,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
  });


  var panelDiv = document.getElementById('panel');

  var data = new MedicareDataSource;

  var view = new storeLocator.View(map, data, {
    geolocation: true,
    features: data.getFeatures()
  });

  var markerSize = new google.maps.Size(24, 24);

  view.createMarker = function(store) {
    //console.log(store.location_);
    // console.log(store.getDetails().STORE_LONGITUDE);

    var ImageName = 'https://cdn.shopify.com/s/files/1/0099/2867/1291/files/maps.png?3582470676449005109';
    //console.log(ImageName);
    //var ICON = new google.maps.MarkerImage('cp.png', null, null,   new google.maps.Point(14, 13));
    var ICONS = new google.maps.MarkerImage(ImageName, null, null, new google.maps.Point(14, 13));



    var markerOptions = {
      position: store.getLocation(),
      icon:ICONS ,
      shadow: SHADOW
    };
    return new google.maps.Marker(markerOptions);
  }


  new storeLocator.Panel(panelDiv, {
    view: view

  });

});
