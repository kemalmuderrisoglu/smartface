/* 
		You can modify its contents.
*/
const extend = require('js-base/core/extend');

const LviFeedDesign = require('library/LviFeed');

const LviFeed = extend(LviFeedDesign)(
  //constructor
  function(_super, props, pageName) {
    // initalizes super class for this scope
    _super(this, props || LviFeedDesign.defaults);
    this.pageName = pageName;
  }

);

module && (module.exports = LviFeed);