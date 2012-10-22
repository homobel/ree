
//~ <component>
//~	Name: Object Helper
//~	Info: Provides object helpers
//~ </component>

function ReeObject() {

	this.obj = new function() {

		function propOfVal(obj, val, identityFlag) {
			for(var prop in obj) {
				if(obj.hasOwnProperty(prop) && ((identityFlag && obj[name] === val) || obj[name] == val)) {
					return name;
				}
			}
		}

		this.propOfVal = propOfVal;

		// each

		function each(obj, fn, thisObj) {
			for(var prop in obj) {
				if(fn.call(thisObj, obj[prop], prop, this)) {
					break;
				}
			}
		}

		this.each = each;

		function isEmpty(obj) {
			for(var prop in obj) {
				if(obj.hasOwnProperty(prop)) {
					return false;
				}
			}
			return true;
		}

		this.isEmpty = isEmpty;

		function join() {
			var Obj = {};
			for(var i = 0; i < arguments.length; i++) {
				if(arguments[i]) {
					for(var p in arguments[i]) {
						if(arguments[i].hasOwnProperty(p)) {
							Obj[p] = arguments[i][p];
						}
					}
				}
			}
			return Obj;
		}

		this.join = join;

		function _joinSoft(target, extender) {
			for(var prop in extender) {
				if(extender.hasOwnProperty(prop)) {
					if(typeof extender[prop] == 'object') {
						target[prop] = joinSoft(target[prop], extender[prop]);
					}
					else {
						target[prop] = extender[prop];
					}
				}
			}
			return target;
		}

		function joinSoft() {
			var Obj = copyObj(arguments[0]);
			for(var i = 0; i < arguments.length; i++) {
				if(arguments[i]) {
					Obj = _joinSoft(Obj, arguments[i]);
				}
			}
			return Obj;
		}

		this.joinSoft = joinSoft;

		function copy(obj) {
			return join(obj);
		}

		this.copy = copy;

		function extend(target) {
			for(var i = 1; i < arguments.length; i++) {
				if(arguments[i]) {
					for(var prop in arguments[i]) {
						if(arguments[i].hasOwnProperty(prop)) {
							target[prop] = arguments[i][prop];
						}
					}
				}
			}
			return target;
		}

		this.extend = extend;

		function innerProp(obj, prop, val) {

			prop = prop.split('.');
			var pl = prop.length - 1;

			if(val === undefined) {
				if($.arr.every(prop, function(c, i) {
					if(typeof obj === 'object' && c in obj) {
						obj = obj[c];
						return true;
					}
				})) {
					return obj;
				}
			}
			else {
				$.arr.each(prop, function(c, i) {
					if(i === pl) {
						return obj[c] = val;
					}
					else {
						if(typeof obj[c] !== 'object') {
							if(innerProp.mode) {
								obj[c] = {};
							}
							else {
								throw Error('Can\'t redeclare property in strict mode!');
							}
						}
						obj = obj[c];
					}
				});
			}
		}

		// 0 - on the strict mode

		innerProp.mode = 1;

		this.innerProp = innerProp;

	};

}
