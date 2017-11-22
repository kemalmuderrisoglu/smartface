/* 
		You can modify its contents.
*/
const extend = require('js-base/core/extend');
const PgMapDesign = require('ui/ui_pgMap');
const MapView = require('sf-core/ui/mapview');
const Color = require('sf-core/ui/color');

const Timer    = require("sf-core/timer");
const Location = require('sf-core/device/location'); 


const PgMap = extend(PgMapDesign)(
  // Constructor
  function(_super) {
    // Initalizes super class for this page scope
    _super(this);
    // overrides super.onShow method
    this.onShow = onShow.bind(this, this.onShow.bind(this));
    // overrides super.onLoad method
    this.onLoad = onLoad.bind(this, this.onLoad.bind(this));

  });

/**
 * @event onShow
 * This event is called when a page appears on the screen (everytime).
 * @param {function} superOnShow super onShow function
 * @param {Object} parameters passed from Router.go function
 */
function onShow(superOnShow) {
  superOnShow();
  const page = this;
  
  Location.start(Location.Android.Provider.AUTO);
  Location.onLocationChanged = function(event) {
    
      page.mapview.onCreate = function() {
        page.mapview.centerLocation = {
            latitude: event.latitude,
            longitude: event.longitude
        };
        var myPin = new MapView.Pin({
            location: {
                latitude: event.latitude,
                longitude: event.longitude
            },
            title: 'Smartface Inc.',
            subtitle: '2nd Floor, 530 Lytton Ave, Palo Alto, CA 94301',
            color: Color.RED,
            onPress: function() {
                const Application = require('sf-core/application');
                Application.call("geo:" + myPin.location.latitude + ',' + myPin.location.longitude, {
                    'hl': 'en',
                });
            }
        });
        page.mapview.addPin(myPin);
      }
  };

  Timer.setTimeout({
      delay: 30000, 
      task: function() { Location.stop() }
  });

  
}

/**
 * @event onLoad
 * This event is called once when page is created.
 * @param {function} superOnLoad super onLoad function
 */
function onLoad(superOnLoad) {
  superOnLoad();
}

module && (module.exports = PgMap);