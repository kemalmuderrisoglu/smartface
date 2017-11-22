const extend = require('js-base/core/extend');
const PgFeedDesign = require('ui/ui_pgFeed');
const LviFeed = require("../components/LviFeed");
const Color = require('sf-core/ui/color');
const feedService = require("../service/feed");

const PgFeed = extend(PgFeedDesign)(
  // Constructor
  function(_super) {
    // Initalizes super class for this page scope
    _super(this);
    // overrides super.onShow method
    this.onShow = onShow.bind(this, this.onShow.bind(this));
    // overrides super.onLoad method
    this.onLoad = onLoad.bind(this, this.onLoad.bind(this));
    const page = this;
    page.data = [];
    page.pageIndex = 1;

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
  setTimeout(function() {
    fetchData.call(page);
  }, 300);

}

/**
 * @event onLoad
 * This event is called once when page is created.
 * @param {function} superOnLoad super onLoad function
 */
function onLoad(superOnLoad) {
  superOnLoad();
  const page = this;
  page.lvFeed.refreshEnabled = true;

  page.lvFeed.onRowCreate = function() {
    var lviFeed = new LviFeed({});
    return lviFeed;
  };

  page.lvFeed.onRowBind = function(listViewItem, index) {
    var lblText = listViewItem.findChildById(1000);
    var itemData = page.data[index];
    if (itemData) {
      lblText.text = itemData.title;
      lblText.backgroundColor = Color.create(itemData.backgroundColor);
    }

    var isLastItem = (index === page.data.length - 1) && index < 19;
    if (isLastItem) {
      page.pageIndex++;
      fetchData.call(page);
    }

  };

  page.lvFeed.onPullRefresh = function() {
    page.lvFeed.itemCount = page.data.length = 0;
    page.pageIndex = 1;
    fetchData.call(page);
  };

}

function loadData(data) {
  const page = this;

  page.data = page.data.concat(data);

  page.lvFeed.itemCount = page.data.length;
  page.lvFeed.refreshData();

  page.flWait.visible = false;
  page.lvFeed.visible = true;
  page.lvFeed.stopRefresh();

}

function fetchData() {
  const page = this;
  feedService.getFeed(page.pageIndex).then(function(data) {
    loadData.call(page, data);
  }).catch(function(e) {
    alert("error");
  });

  console.log("fetchData");
}

module && (module.exports = PgFeed);
