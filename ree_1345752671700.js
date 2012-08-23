
//~ <component>
//~	Name: Ree Lib
//~	Info: Working with embedded types
//~ </component>

this.ree = new function() {


//~ <component>
//~	Name: Ree Lib init file
//~	Info: Working with embedded types
//~ </component>



//~ <component>
//~	Name: Type Helper
//~	Info: Provides type function
//~ </component>


function ReeType() {

	// Type obj

	function _Type() {

		this.toString = function() {
			return Type.variants[this.val];
		};

		this.is = function(typeStr) {
			if(typeof typeStr === 'string') {
				return Type.variants[this.val] === typeStr;
			}
			else {
				return (Type.variants[this.val] === 'object' || Type.variants[this.val] === 'function') && this.source instanceof typeStr;
			}
		};

	}

	function Type(n, val) {
		this.val = n;
		this.source = val;
	}

	function type(val) {

	}

	Type.prototype = new _Type();

	Type.variants = [
		'undefined',
		'boolean',
		'number',
		'string',
		'function',
		'array',
		'object',
		'NaN',
		'null',
		'unknown'
	];

	// Logic fn

	function getType(something) {

		var type = typeof something;

		if(type === 'undefined') {
			return getType['undefined'];
		}
		else if(type === 'boolean') {
			return getType['boolean']
		}
		else if(type === 'number') {
			if(isNaN(something)) {
				return getType['NaN'];
			}
			else {
				return getType['number'];
			}
		}
		else if(type === 'string') {
			return getType['string'];
		}
		else if(type === 'function' && something.call) {
			return getType['function'];
		}
		else if(something === null) {
			return getType['null'];
		}
		else if(type === 'unknown') {
			return getType['unknown'];
		}
		else {
			return getType['object'];
		}

	}

	Type.variants.forEach(function(c, i) {
		this[c] = i;
		this[i] = c;
	}, getType);

	this.type = function(something) {
		return new Type(getType(something), something);
	};
}


//~ <component>
//~	Name: Yobject
//~	Info: Provide object helpers
//~ </component>

function ReeObject() {

	this.obj = new function() {

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
		
	};

}


//~ <component>
//~	Name: Yarray
//~	Info: Provide array helpers
//~ </component>

function ReeArray() {

	var parent = this;

	this.arr = new function() {

		// forEachInvert

		function forEachInvert(arr, fn, thisObj) {
			for(var i = arr.length; i--; ) {
				if(i in arr) {
					fn.call(thisObj, arr[i], i, arr);
				}
			}
		}

		this.forEachInvert = forEachInvert;

		// copy

		function copy(arr) {
			return arr.slice(0);
		};

		this.copy = copy;

		// del

		function del(arr, n) {
			if(n in arr) {
				arr.splice(n, 1);
			}
			return arr;
		}

		this.del = del;

		// delByVal

		function delByVal(arr, value) {
			del(arr, indexOf(arr, value));
			return arr;
		}

		this.delByVal = delByVal;

		// linear

		function linear(arr) {
			var M = [];
			function linear(m) {
				if(m instanceof Array) {
					each(m, linear);
				}
				else {
					M.push(m);
				}
			}

			linear(arr);
			return M;
		}

		this.linear = linear;

		// pushOnce

		function pushOnce(arr, n) {
			var index = indexOf(arr, n);
			if(!~index) {
				arr.push(n);
				return arr.length - 1;
			}
			return index;
		}

		this.pushOnce = pushOnce;

		// last

		function last(arr) {
			return arr[arr.length - 1];
		}

		this.last = last;

/* --------------------------------------------------------------------------- */

		// indexOf

		function indexOf(arr, object, flag) {
			if(flag) {
				for(var i = arr.length - 1; i >= 0; i--) {
					if(i in arr && arr[i] === object) {
						return i;
					}
				}
			}
			else {
				for(var i = 0, l = arr.length; i < l; i++) {
					if(i in arr && arr[i] === object) {
						return i;
					}
				}
			}
			return -1;
		}

		this.indexOf = indexOf;

		// each

		function each(arr, fn, thisObj) {
			for(var i = 0, l = arr.length; i < l; i++) {
				if(i in arr) {
					if(fn.call(thisObj, arr[i], i, this)) {
						break;
					}
				}
			}
		}

		this.each = each;

		// map

		function map(arr, fn, thisObj) {
			var result = new Array(arr.length);
			for(var i = 0, l = arr.length; i < l; i++) {
				if(i in arr) {
					result[i] = fn.call(thisObj, arr[i], i, arr);
				}
			}
			return result;
		}

		this.map = map;

		// filter

		function filter(arr, fn, thisObj) {
			var result = [];
			for(var i = 0, l = arr.length; i < l; i++) {
				if(i in arr && fn.call(thisObj, arr[i], i, arr)) {
					result.push(arr[i]);
				}
			}
			return result;
		}

		this.filter = filter;

		//every

		function every(arr, fn, thisObj) {
			for(var i = 0, l = arr.length; i < l; i++) {
				if(i in arr && !fn.call(thisObj, arr[i], i, arr)) {
					return false;
				}
			}
			return true;
		}

		this.every = every;

		// some

		function some(arr, fn, thisObj) {
			for(var i = 0, l = arr.length; i < l; i++) {
				if(i in arr && fn.call(thisObj, arr[i], i, arr)) {
					return true;
				}
			}
			return false;
		}

		this.some = some;

		// to array

		function toArraySimple(obj) {

			var type = parent.type(obj);

			if(type.is(Array)) {
				return obj;
			}
			else if(type.is('object')) {
				if(obj.toArray && typeof obj.toArray === 'function') {
					return obj.toArray();
				}
				else if(obj.length !== undefined) {
					var arr = [];
					for(var i = 0, l = obj.length; i < l; i++) {
						arr.push(obj[i]);
					}
					return arr;
				}
				else {
					var arr = [];
					for(var prop in obj) {
						if(obj.hasOwnProperty(prop)) {
							arr.push(obj[prop]);
						}
					}
					return arr;
				}
			}
			else if(type.is('undefined') || type.is('null') || type.is('unknown')) {
				return [];
			}

			return [obj];
		}

		this.toArray = function() {
			var l = arguments.length;
			if(l > 1) {
				var M = [];
				for(var i = 0; i < l; i++) {
					M = M.concat(toArraySimple(arguments[i]));
				}
				return M;
			}
			else {
				return toArraySimple(arguments[0]);
			}
		};


	};

}


//~ <component>
//~	Name: Ynumber
//~	Info: Provide number helpers
//~ </component>

function ReeNumber() {

	this.num = new function() {

		this.limit = function(num, a, b) {
			if(b === undefined) {
				return num;
			}
			var min = Math.min(a, b), max = Math.max(a, b);
			return Math.min(max, Math.max(min, num));
		};

		this.toInt = function(num, base) {
			return parseInt(num, base || 10);
		};

		this.toFloat = function(num) {
			return parseFloat(num);
		};

		this.isInt = function(num) {
			return typeof num === 'number' && num % 1 === 0;
		};

		this.isFloat = function(num) {
			return typeof num === 'number' && num % 1 !== 0;
		};

		this.rand = function(num) {
			return Math.round(num * Math.random());
		};

		this.toRad = function(num) {
			return num * Math.PI / 180;
		};

		this.toDeg = function(num) {
			return num * 180 / Math.PI;
		};

	};

}


//~ <component>
//~	Name: Ystring
//~	Info: Provide string helpers
//~ </component>

function ReeString() {

	var parent = this;

	this.str = new function() {

		this.isMail = function(str) {
			return !!~str.search(/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/);
		};

		this.hasWord = function(str, word) {
			if(str.search('\\b' + word + '\\b') === -1) {
				return false;
			}
			return true;
		};

		this.camelCase = function(str) {
			return str.replace(/-\D/g, function(match) {
				return match.charAt(1).toUpperCase();
			});
		};

		this.toNumber = function(str) {
			return ~str.indexOf('.') ? str.toFloat() :  str.toInt();
		};

		function tenBasedColor(str) {
			if(str.length === 1) {
				str += str;
			}
			return parent.num.limit(parent.num.toInt(str, 16), 0, 255);
		}

		this.getColors = function(str) {
			var M;
			if(str.charAt(0) === '#') {
				if(str.length === 4) {
					M = str.match(/\w/g);
				}
				else {
					M = str.match(/\w{2}/g);
				}
				if(M.length === 3) {
					M = parent.arr.map(M, tenBasedColor);
				}
				else {
					throw Error('Incorrect input string!');
				}
			}
			else {
				M = str.match(/\d{1,3}/g);
				if(M) {
					M = parent.arr.map(M, function(c) {
						return parent.num.limit(parent.num.toInt(c), 0, 255);
					});

				}
			}
			return M || [];
		};

		this.toRgb = function(str) {
			var colors = this.getColors(str);
			if(colors.length === 3) {
				return 'rgb(' + colors.join(', ') + ')';
			}
			return false;
		};

		this.toHex = function(str) {
			var colors = this.getColors(str);
			console.log(colors);
			if(colors.length === 3) {
				return '#' + parent.arr.map(colors, function(c) {
					var color = c.toString(16);
					return (color.length === 1) ? '0' + color : color;
				}).join('');
			}
			return false;
		};

		this.trim = function(str, chars) {
			str = parent.str.ltrim(str, chars);
			str = parent.str.rtrim(str, chars);
			return str;
		};

		this.ltrim = function(str, chars) {
			chars = chars || '\\s';
			return str.replace(new RegExp('^[' + chars + ']+', 'g'), '');
		};

		this.rtrim = function(str, chars) {
			chars = chars || '\\s';
			return str.replace(new RegExp('[' + chars + ']+$', 'g'), '');
		};

	};

}


//~ <component>
//~	Name: Yfunction
//~	Info: Provide function helpers
//~ </component>

function ReeFunction() {

	this.fn = new function() {
		
	};

}


	ReeType.call(this);
	ReeObject.call(this);
	ReeArray.call(this);
	ReeNumber.call(this);
	ReeString.call(this);
	ReeFunction.call(this);

};
