// Store Locator file all 3 files joint by Tejah Shah 

! function(a) {
    var h = function() {};
    (window.storeLocator = h).toRad_ = function(t) {
        return t * Math.PI / 180
    }, (h.Feature = h.Feature = function(t, e) {
        this.id_ = t, this.name_ = e
    }).prototype.getId = function() {
        return this.id_
    }, h.Feature.prototype.getDisplayName = function() {
        return this.name_
    }, h.Feature.prototype.toString = function() {
        return this.getDisplayName()
    }, (h.FeatureSet = h.FeatureSet = function(t) {
        this.array_ = [], this.hash_ = {};
        for (var e, i = 0; e = arguments[i]; i++) this.add(e)
    }).prototype.toggle = function(t) {
        this.contains(t) ? this.remove(t) : this.add(t)
    }, h.FeatureSet.prototype.contains = function(t) {
        return t.getId() in this.hash_
    }, h.FeatureSet.prototype.getById = function(t) {
        return t in this.hash_ ? this.array_[this.hash_[t]] : null
    }, h.FeatureSet.prototype.add = function(t) {
        t && (this.array_.push(t), this.hash_[t.getId()] = this.array_.length - 1)
    }, h.FeatureSet.prototype.remove = function(t) {
        this.contains(t) && (this.array_[this.hash_[t.getId()]] = null, delete this.hash_[t.getId()])
    }, h.FeatureSet.prototype.asList = function() {
        for (var t = [], e = 0, i = this.array_.length; e < i; e++) {
            var o = this.array_[e];
            null !== o && t.push(o)
        }
        return t
    }, h.FeatureSet.NONE = new h.FeatureSet, (h.GMEDataFeed = h.GMEDataFeed = function(t) {
        this.tableId_ = t.tableId, this.apiKey_ = t.apiKey, t.propertiesModifier && (this.propertiesModifier_ = t.propertiesModifier)
    }).prototype.getStores = function(t, e, i) {
        var o = this,
            s = t.getCenter();
        t = "(ST_INTERSECTS(geometry, " + this.boundsToWkt_(t) + ") OR ST_DISTANCE(geometry, " + this.latLngToWkt_(s) + ") < 20000)", a.getJSON("https://www.googleapis.com/mapsengine/v1/tables/" + this.tableId_ + "/features?callback=?", {
            key: this.apiKey_,
            where: t,
            version: "published",
            maxResults: 300
        }, function(t) {
            t = o.parse_(t), o.sortByDistance_(s, t), i(t)
        })
    }, h.GMEDataFeed.prototype.latLngToWkt_ = function(t) {
        return "ST_POINT(" + t.lng() + ", " + t.lat() + ")"
    }, h.GMEDataFeed.prototype.boundsToWkt_ = function(t) {
        var e = t.getNorthEast();
        return ["ST_GEOMFROMTEXT('POLYGON ((", (t = t.getSouthWest()).lng(), " ", t.lat(), ", ", e.lng(), " ", t.lat(), ", ", e.lng(), " ", e.lat(), ", ", t.lng(), " ", e.lat(), ", ", t.lng(), " ", t.lat(), "))')"].join("")
    }, h.GMEDataFeed.prototype.parse_ = function(t) {
        if (t.error) return window.alert(t.error.message), [];
        if (!(t = t.features)) return [];
        for (var e, i = [], o = 0; e = t[o]; o++) {
            var s = e.geometry.coordinates;
            s = new google.maps.LatLng(s[1], s[0]);
            e = this.propertiesModifier_(e.properties), e = new h.Store(e.id, s, null, e), i.push(e)
        }
        return i
    }, h.GMEDataFeed.prototype.propertiesModifier_ = function(t) {
        return t
    }, h.GMEDataFeed.prototype.sortByDistance_ = function(i, t) {
        t.sort(function(t, e) {
            return t.distanceTo(i) - e.distanceTo(i)
        })
    }, h.GMEDataFeedOptions = function() {}, (h.Panel = h.Panel = function(t, e) {
        this.el_ = a(t), this.el_.addClass("storelocator-panel"), this.settings_ = a.extend({
            locationSearch: !0,
            locationSearchLabel: "Kindly enter your location to find the stores closest to you",
            featureFilter: !0,
            directions: !0,
            view: null
        }, e), this.directionsRenderer_ = new google.maps.DirectionsRenderer({
            draggable: !0
        }), this.directionsService_ = new google.maps.DirectionsService, this.init_()
    }).prototype = new google.maps.MVCObject, h.Panel.prototype.init_ = function() {
        var o = this;
        if (this.itemCache_ = {}, this.settings_.view && this.set("view", this.settings_.view), this.filter_ = a('<form class="storelocator-filter"/>'), this.el_.append(this.filter_), this.settings_.locationSearch && (this.locationSearch_ = a('<div class="location-search"><h4>' + this.settings_.locationSearchLabel + "</h4><input></div>"), this.filter_.append(this.locationSearch_), void 0 !== google.maps.places ? this.initAutocomplete_() : this.filter_.submit(function() {
                var t = a("input", o.locationSearch_).val();
                o.searchPosition(t)
            }), this.filter_.submit(function() {
                return !1
            }), google.maps.event.addListener(this, "geocode", function(t) {
                if (t.geometry) {
                    this.directionsFrom_ = t.geometry.location, o.directionsVisible_ && o.renderDirections_();
                    var e = o.get("view");
                    e.highlight(null);
                    var i = e.getMap();
                    t.geometry.viewport ? i.fitBounds(t.geometry.viewport) : (i.setCenter(t.geometry.location), i.setZoom(13)), e.refreshView(), o.listenForStoresUpdate_()
                } else o.searchPosition(t.name)
            })), this.settings_.featureFilter) {
            this.featureFilter_ = a('<div class="feature-filter"/>');
            for (var t = this.get("view").getFeatures().asList(), e = 0, i = t.length; e < i; e++) {
                var s = t[e],
                    n = a('<input type="checkbox"/>');
                n.data("feature", s), a("<label/>").append(n).append(s.getDisplayName()).appendTo(this.featureFilter_)
            }
            this.filter_.append(this.featureFilter_), this.featureFilter_.find("input").change(function() {
                var t = a(this).data("feature");
                o.toggleFeatureFilter_(t), o.get("view").refreshView()
            })
        }
        this.storeList_ = a('<ul class="store-list"/>'), this.el_.append(this.storeList_), this.settings_.directions && (this.directionsPanel_ = a('<div class="directions-panel"><form><input class="directions-to"/><input type="submit" value="Find directions"/><a href="#" class="close-directions">Close</a></form><div class="rendered-directions"></div></div>'), this.directionsPanel_.find(".directions-to").attr("readonly", "readonly"), this.directionsPanel_.hide(), this.directionsVisible_ = !1, this.directionsPanel_.find("form").submit(function() {
            return o.renderDirections_(), !1
        }), this.directionsPanel_.find(".close-directions").click(function() {
            o.hideDirections()
        }), this.el_.append(this.directionsPanel_))
    }, h.Panel.prototype.toggleFeatureFilter_ = function(t) {
        var e = this.get("featureFilter");
        e.toggle(t), this.set("featureFilter", e)
    }, h.geocoder_ = new google.maps.Geocoder, h.Panel.prototype.listenForStoresUpdate_ = function() {
        var t = this,
            e = this.get("view");
        this.storesChangedListener_ && google.maps.event.removeListener(this.storesChangedListener_), this.storesChangedListener_ = google.maps.event.addListenerOnce(e, "stores_changed", function() {
            t.set("stores", e.get("stores"))
        })
    }, h.Panel.prototype.searchPosition = function(t) {
        var i = this;
        t = {
            address: t,
            bounds: this.get("view").getMap().getBounds()
        }, h.geocoder_.geocode(t, function(t, e) {
            e == google.maps.GeocoderStatus.OK && google.maps.event.trigger(i, "geocode", t[0])
        })
    }, h.Panel.prototype.setView = function(t) {
        this.set("view", t)
    }, h.Panel.prototype.view_changed = function() {
        var t = this.get("view");
        this.bindTo("selectedStore", t);
        var e = this;
        this.geolocationListener_ && google.maps.event.removeListener(this.geolocationListener_), this.zoomListener_ && google.maps.event.removeListener(this.zoomListener_), this.idleListener_ && google.maps.event.removeListener(this.idleListener_), t.getMap().getCenter();
        var i = function() {
            t.clearMarkers(), e.listenForStoresUpdate_()
        };
        this.geolocationListener_ = google.maps.event.addListener(t, "load", i), this.zoomListener_ = google.maps.event.addListener(t.getMap(), "zoom_changed", i), this.idleListener_ = google.maps.event.addListener(t.getMap(), "idle", function() {
            return e.idle_(t.getMap())
        }), i(), this.bindTo("featureFilter", t), this.autoComplete_ && this.autoComplete_.bindTo("bounds", t.getMap())
    }, h.Panel.prototype.initAutocomplete_ = function() {
        var t = this,
            e = a("input", this.locationSearch_)[0];
        this.autoComplete_ = new google.maps.places.Autocomplete(e), this.get("view") && this.autoComplete_.bindTo("bounds", this.get("view").getMap()), google.maps.event.addListener(this.autoComplete_, "place_changed", function() {
            google.maps.event.trigger(t, "geocode", this.getPlace())
        })
    }, h.Panel.prototype.idle_ = function(t) {
        this.center_ ? t.getBounds().contains(this.center_) || (this.center_ = t.getCenter(), this.listenForStoresUpdate_()) : this.center_ = t.getCenter()
    }, h.Panel.NO_STORES_HTML_ = '<li class="no-stores">There are no stores in this area.</li>', h.Panel.NO_STORES_IN_VIEW_HTML_ = '<li class="no-stores">There are no stores in this area. However, stores closest to you are listed below.</li>', h.Panel.prototype.stores_changed = function() {
        if (this.get("stores")) {
            var t = this.get("view"),
                e = t && t.getMap().getBounds(),
                i = this.get("stores"),
                o = this.get("selectedStore");
            this.storeList_.empty(), i.length ? e && !e.contains(i[0].getLocation()) && this.storeList_.append(h.Panel.NO_STORES_IN_VIEW_HTML_) : this.storeList_.append(h.Panel.NO_STORES_HTML_);
            e = function() {
                t.highlight(this.store, !0)
            };
            for (var s = 0, n = Math.min(10, i.length); s < n; s++) {
                var r = i[s].getInfoPanelItem();
                r.store = i[s], o && i[s].getId() == o.getId() && a(r).addClass("highlighted"), r.clickHandler_ || (r.clickHandler_ = google.maps.event.addDomListener(r, "click", e)), this.storeList_.append(r)
            }
        }
    }, h.Panel.prototype.selectedStore_changed = function() {
        a(".highlighted", this.storeList_).removeClass("highlighted");
        var e = this,
            i = this.get("selectedStore");
        if (i) {
            this.directionsTo_ = i, this.storeList_.find("#store-" + i.getId()).addClass("highlighted"), this.settings_.directions && this.directionsPanel_.find(".directions-to").val(i.getDetails().title);
            var t = e.get("view").getInfoWindow().getContent(),
                o = a("<a/>").text("Directions").attr("href", "#").addClass("action").addClass("directions"),
                s = a("<a/>").text("Zoom here").attr("href", "#").addClass("action").addClass("zoomhere"),
                n = a("<a/>").text("").attr("href", "#");
            o.click(function() {
                return e.showDirections(), !1
            }), s.click(function() {
                e.get("view").getMap().setOptions({
                    center: i.getLocation(),
                    zoom: 16
                })
            }), n.click(function() {
                var t = e.get("view").getMap().getStreetView();
                t.setPosition(i.getLocation()), t.setVisible(!0)
            }), a(t).append(o).append(s).append(n)
        }
    }, h.Panel.prototype.hideDirections = function() {
        this.directionsVisible_ = !1, this.directionsPanel_.fadeOut(), this.featureFilter_.fadeIn(), this.storeList_.fadeIn(), this.directionsRenderer_.setMap(null)
    }, h.Panel.prototype.showDirections = function() {
        var t = this.get("selectedStore");
        this.featureFilter_.fadeOut(), this.storeList_.fadeOut(), this.directionsPanel_.find(".directions-to").val(t.getDetails().title), this.directionsPanel_.fadeIn(), this.renderDirections_(), this.directionsVisible_ = !0
    }, h.Panel.prototype.renderDirections_ = function() {
        var o = this;
        if (this.directionsFrom_ && this.directionsTo_) {
            var s = this.directionsPanel_.find(".rendered-directions").empty();
            this.directionsService_.route({
                origin: this.directionsFrom_,
                destination: this.directionsTo_.getLocation(),
                travelMode: google.maps.DirectionsTravelMode.DRIVING
            }, function(t, e) {
                if (e == google.maps.DirectionsStatus.OK) {
                    var i = o.directionsRenderer_;
                    i.setPanel(s[0]), i.setMap(o.get("view").getMap()), i.setDirections(t)
                }
            })
        }
    }, h.Panel.prototype.featureFilter_changed = function() {
        this.listenForStoresUpdate_()
    }, h.PanelOptions = function() {}, (h.StaticDataFeed = h.StaticDataFeed = function() {
        this.stores_ = []
    }).prototype.setStores = function(t) {
        this.stores_ = t, this.firstCallback_ ? this.firstCallback_() : delete this.firstCallback_
    }, h.StaticDataFeed.prototype.getStores = function(t, e, i) {
        if (this.stores_.length) {
            for (var o, s = [], n = 0; o = this.stores_[n]; n++) o.hasAllFeatures(e) && s.push(o);
            this.sortByDistance_(t.getCenter(), s), i(s)
        } else {
            var r = this;
            this.firstCallback_ = function() {
                r.getStores(t, e, i)
            }
        }
    }, h.StaticDataFeed.prototype.sortByDistance_ = function(i, t) {
        t.sort(function(t, e) {
            return t.distanceTo(i) - e.distanceTo(i)
        })
    }, (h.Store = h.Store = function(t, e, i, o) {
        this.id_ = t, this.location_ = e, this.features_ = i || h.FeatureSet.NONE, this.props_ = o || {}
    }).prototype.setMarker = function(t) {
        this.marker_ = t, google.maps.event.trigger(this, "marker_changed", t)
    }, h.Store.prototype.getMarker = function() {
        return this.marker_
    }, h.Store.prototype.getId = function() {
        return this.id_
    }, h.Store.prototype.getLocation = function() {
        return this.location_
    }, h.Store.prototype.getFeatures = function() {
        return this.features_
    }, h.Store.prototype.hasFeature = function(t) {
        return this.features_.contains(t)
    }, h.Store.prototype.hasAllFeatures = function(t) {
        if (!t) return !0;
        for (var e = 0, i = (t = t.asList()).length; e < i; e++)
            if (!this.hasFeature(t[e])) return !1;
        return !0
    }, h.Store.prototype.getDetails = function() {
        return this.props_
    }, h.Store.prototype.generateFieldsHTML_ = function(t) {
        for (var e = [], i = 0, o = t.length; i < o; i++) {
            var s = t[i];
            this.props_[s] && (e.push('<div class="'), e.push(s), e.push('">'), e.push(this.props_[s]), e.push("</div>"))
        }
        return e.join("")
    }, h.Store.prototype.generateFeaturesHTML_ = function() {
        var t = [];
        t.push('<ul class="features">');
        for (var e, i = this.features_.asList(), o = 0; e = i[o]; o++) t.push("<li>"), t.push(e.getDisplayName()), t.push("</li>");
        return t.push("</ul>"), t.join("")
    }, h.Store.prototype.getInfoWindowContent = function() {
        if (!this.content_) {
            var t = ['<div class="store">'];
            t.push(this.generateFieldsHTML_(["title", "address", "phone", "misc", "web"])), t.push(this.generateFeaturesHTML_()), t.push("</div>"), this.content_ = t.join("")
        }
        return this.content_
    }, h.Store.prototype.getInfoPanelContent = function() {
        return this.getInfoWindowContent()
    }, h.Store.infoPanelCache_ = {}, h.Store.prototype.getInfoPanelItem = function() {
        var t = h.Store.infoPanelCache_,
            e = this.getId();
        if (!t[e]) {
            var i = this.getInfoPanelContent();
            t[e] = a('<li class="store" id="store-' + this.getId() + '">' + i + "</li>")[0]
        }
        return t[e]
    }, h.Store.prototype.distanceTo = function(t) {
        var e = this.getLocation(),
            i = h.toRad_(e.lat()),
            o = h.toRad_(e.lng()),
            s = (e = h.toRad_(t.lat()), h.toRad_(t.lng()));
        return t = e - i, o = s - o, i = Math.sin(t / 2) * Math.sin(t / 2) + Math.cos(i) * Math.cos(e) * Math.sin(o / 2) * Math.sin(o / 2), 12742 * Math.atan2(Math.sqrt(i), Math.sqrt(1 - i))
    }, (h.DataFeed = h.DataFeed = function() {}).prototype.getStores = function(t, e, i) {}, (h.View = h.View = function(t, e, i) {
        this.map_ = t, this.data_ = e, this.settings_ = a.extend({
            updateOnPan: !0,
            geolocation: !0,
            features: new h.FeatureSet
        }, i), this.init_(), google.maps.event.trigger(this, "load"), this.set("featureFilter", new h.FeatureSet)
    }).prototype = new google.maps.MVCObject, h.View.prototype.geolocate_ = function() {
        var e = this;
        window.navigator && navigator.geolocation && navigator.geolocation.getCurrentPosition(function(t) {
            t = new google.maps.LatLng(t.coords.latitude, t.coords.longitude), e.getMap().setCenter(t), e.getMap().setZoom(11), google.maps.event.trigger(e, "load")
        }, void 0, {
            maximumAge: 6e4,
            timeout: 1e4
        })
    }, h.View.prototype.init_ = function() {
        this.settings_.geolocation && this.geolocate_(), this.markerCache_ = {}, this.infoWindow_ = new google.maps.InfoWindow;
        var t = this,
            e = this.getMap();
        this.set("updateOnPan", this.settings_.updateOnPan), google.maps.event.addListener(this.infoWindow_, "closeclick", function() {
            t.highlight(null)
        }), google.maps.event.addListener(e, "click", function() {
            t.highlight(null), t.infoWindow_.close()
        })
    }, h.View.prototype.updateOnPan_changed = function() {
        if (this.updateOnPanListener_ && google.maps.event.removeListener(this.updateOnPanListener_), this.get("updateOnPan") && this.getMap()) {
            var t = this,
                e = this.getMap();
            this.updateOnPanListener_ = google.maps.event.addListener(e, "idle", function() {
                t.refreshView()
            })
        }
    }, h.View.prototype.addStoreToMap = function(t) {
        var e = this.getMarker(t);
        t.setMarker(e);
        var i = this;
        e.clickListener_ = google.maps.event.addListener(e, "click", function() {
            i.highlight(t, !1)
        }), e.getMap() != this.getMap() && e.setMap(this.getMap())
    }, h.View.prototype.createMarker = function(t) {
        t = {
            position: t.getLocation()
        };
        var e = this.settings_.markerIcon;
        return e && (t.icon = e), new google.maps.Marker(t)
    }, h.View.prototype.getMarker = function(t) {
        var e = this.markerCache_,
            i = t.getId();
        return e[i] || (e[i] = this.createMarker(t)), e[i]
    }, h.View.prototype.getInfoWindow = function(t) {
        return t && (t = a(t.getInfoWindowContent()), this.infoWindow_.setContent(t[0])), this.infoWindow_
    }, h.View.prototype.getFeatures = function() {
        return this.settings_.features
    }, h.View.prototype.getFeatureById = function(t) {
        if (!this.featureById_) {
            this.featureById_ = {};
            for (var e, i = 0; e = this.settings_.features[i]; i++) this.featureById_[e.getId()] = e
        }
        return this.featureById_[t]
    }, h.View.prototype.featureFilter_changed = function() {
        google.maps.event.trigger(this, "featureFilter_changed", this.get("featureFilter")), this.get("stores") && this.clearMarkers()
    }, h.View.prototype.clearMarkers = function() {
        for (var t in this.markerCache_) {
            this.markerCache_[t].setMap(null);
            var e = this.markerCache_[t].clickListener_;
            e && google.maps.event.removeListener(e)
        }
    }, h.View.prototype.refreshView = function() {
        var s = this;
        this.data_.getStores(this.getMap().getBounds(), this.get("featureFilter"), function(t) {
            var e = s.get("stores");
            if (e)
                for (var i = 0, o = e.length; i < o; i++) google.maps.event.removeListener(e[i].getMarker().clickListener_);
            s.set("stores", t)
        })
    }, h.View.prototype.stores_changed = function() {
        for (var t, e = this.get("stores"), i = 0; t = e[i]; i++) this.addStoreToMap(t)
    }, h.View.prototype.getMap = function() {
        return this.map_
    }, h.View.prototype.highlight = function(t, e) {
        var i = this.getInfoWindow(t);
        t ? (i = this.getInfoWindow(t), t.getMarker() ? i.open(this.getMap(), t.getMarker()) : (i.setPosition(t.getLocation()), i.open(this.getMap())), e && this.getMap().panTo(t.getLocation()), this.getMap().getStreetView().getVisible() && this.getMap().getStreetView().setPosition(t.getLocation())) : i.close(), this.set("selectedStore", t)
    }, h.View.prototype.selectedStore_changed = function() {
        google.maps.event.trigger(this, "selectedStore_changed", this.get("selectedStore"))
    }, h.ViewOptions = function() {}
}(jQuery);
// Store Locator Min Complete
// File 1 Complete

// Store Details and Extra
// File 2 Started for CSV and Popup Creation
/**
 * @extends storeLocator.StaticDataFeed
 * @constructor
 */
function MedicareDataSource() {
  $.extend(this, new storeLocator.StaticDataFeed);

  var that = this;
  $.get('https://cdn.shopify.com/s/files/1/0044/1208/0217/files/nilkamal_frnutuire_10.csv?v=1632133466', function(data) {
    that.setStores(that.parse_(data));
  });

  // $.get('https://cdn.shopify.com/s/files/1/0044/1208/0217/files/Furniture_sublime.csv?5041', function(data) {
  //   that.setStores(that.parse_(data));
  // });

}

/**
 * @const
 * @type {!storeLocator.FeatureSet}
 * @private
 */
MedicareDataSource.prototype.FEATURES_ = new storeLocator.FeatureSet(

);

/**
 * @return {!storeLocator.FeatureSet}
 */
MedicareDataSource.prototype.getFeatures = function() {
  return this.FEATURES_;
};

/**
 * @private
 * @param {string} csv
 * @return {!Array.<!storeLocator.Store>}
 */
MedicareDataSource.prototype.parse_ = function(csv) {
  var stores = [];
  var rows = csv.split('\n');
  var headings = this.parseRow_(rows[0]);

  for (var i = 1, row; row = rows[i]; i++) {
    row = this.toObject_(headings, this.parseRow_(row));
    //console.log(row);
    var features = new storeLocator.FeatureSet;

    // ZZZ
    features.add(this.FEATURES_.getById('STORE_FORMAT-' + row.STORE_FORMAT));
    // console.log(row.STORE_NAME);

    var position = new google.maps.LatLng(row.STORE_LATITUDE, row.STORE_LONGITUDE);

    var shop = this.join_([row.STORE_NAME, row.STORE_CONTACT_NUMBER]);
    var store_address = this.join_([row.STORE_ADDRESS]);
//    var store_address = this.join_([row.STORE_ADDRESS + "<br>" + row.STORE_CITY + " - " + row.STORE_PIN_CODE + "<br>" + row.STORE_STATE + ", India"]);

//    var contact = this.join_([ "<b>Phone:</b> " + row.STORE_CONTACT_NUMBER +  "<br/><b>Timing: </b>" + row.STORE_TIMING + row.STORE_URL ] );
    var contact = this.join_([ "<b>Phone:</b> " + row.STORE_CONTACT_NUMBER ]);
    var store = new storeLocator.Store(row.STORE_CODE, position, features, {
      title: row.STORE_NAME,
      address: store_address,
      contact: contact
      // hours: row.STORE_TIMING,
      //hours: row.STORE_TIMING_ALTER,
      // iconname: row.STORE_FORMAT
    });
    
    // console.log(store);
    stores.push(store);
    
  }
  // console.log(stores);
  return stores;
};

/**
 * Joins elements of an array that are non-empty and non-null.
 * @private
 * @param {!Array} arr array of elements to join.
 * @param {string} sep the separator.
 * @return {string}
 */
MedicareDataSource.prototype.join_ = function(arr, sep) {
  var parts = [];
  for (var i = 0, ii = arr.length; i < ii; i++) {
    arr[i] && parts.push(arr[i]);
  }
  return parts.join(sep);
};

/**
 * Very rudimentary CSV parsing - we know how this particular CSV is formatted.
 * IMPORTANT: Don't use this for general CSV parsing!
 * @private
 * @param {string} row
 * @return {Array.<string>}
 */
MedicareDataSource.prototype.parseRow_ = function(row) {
  // Strip leading quote.
  if (row.charAt(0) == '"') {
    row = row.substring(1);
  }
  // Strip trailing quote. There seems to be a character between the last quote
  // and the line ending, hence 2 instead of 1.
  if (row.charAt(row.length - 2) == '"') {
    row = row.substring(0, row.length - 2);
  }

  row = row.split('","');

  return row;
};

/**
 * Creates an object mapping headings to row elements.
 * @private
 * @param {Array.<string>} headings
 * @param {Array.<string>} row
 * @return {Object}
 */
MedicareDataSource.prototype.toObject_ = function(headings, row) {
  var result = {};
  for (var i = 0, ii = row.length; i < ii; i++) {
    result[headings[i]] = row[i];
  }
  return result;
};



// File 3 For Icon Image and AddListner
// Panel.Js Included Here

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
