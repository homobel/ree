
//~ <component>
//~	Name: Ree
//~	Info: Working with embedded types
//~ </component>


if(this.ree === undefined) {

	this.ree = new function() {


//~ <component>
//~	Name: Ree init file
//~	Info: Working with embedded types
//~ </component>


	var ree = this;


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


	for(var i = 0, l = Type.variants.length; i < l; i++) {
		getType[Type.variants[i]] = i;
		getType[i] = Type.variants[i];
	}

	this.type = function(something) {
		return new Type(getType(something), something);
	};
}


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


//~ <component>
//~	Name: Array Helper
//~	Info: Provides array helpers
//~ </component>


function ReeArray() {

	var parent = this;

	this.arr = new function() {

		// forEachInvert

		function eachInvert(arr, fn, thisObj) {
			for(var i = arr.length; i--; ) {
				if(i in arr) {
					fn.call(thisObj, arr[i], i, arr);
				}
			}
		}

		this.eachInvert = eachInvert;

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

		// last index

		function lastIndex(arr) {
			return arr.length - 1;
		}

		this.lastIndex = lastIndex;

		// append

		function append(arr) {
			for(var i = 1, l = arguments.length; i < l; i++) {
				arr.push(arguments[i]);
			}
			return arr;
		}

		this.append = append;

		// prepend

		function prepend(arr) {
			var args = Array.prototype.slice.call(arguments, 1);
			Array.prototype.unshift.apply(arr, args);
			return arr;
		}

		this.prepend = prepend;

		function pop(arr) {
			return arr.pop();
		}

		this.pop = pop;

/* --------------------------------------------------------------------------- */

		// indexOf

		function indexOf(arr, object, flag) {
			if(!(arr instanceof Array)) throw TypeError('Invalid argument!');
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
					if(fn.call(thisObj, arr[i], i, arr)) {
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
//~	Name: Number Helper
//~	Info: Provides number helpers
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
//~	Name: String Helper
//~	Info: Provides string helpers
//~ </component>

function ReeString() {

	this.str = new function() {

		// is mail

		var mailReg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

		function isMail(str) {
			return !!~str.search(mailReg);
		}

		this.isMail = isMail;

		// has word

		function hasWord(str, word) {
			if(str.search('\\b' + word + '\\b') === -1) {
				return false;
			}
			return true;
		};

		this.hasWord = hasWord;

		// camel case

		function camelCase(str) {
			return str.replace(/-\D/g, function(match) {
				return match.charAt(1).toUpperCase();
			});
		};

		this.camelCase = camelCase;

		// to number

		function toNumber(str) {
			return ~str.indexOf('.') ? str.toFloat() :  str.toInt();
		};

		this.toNumber = toNumber;

		// get colors

		function tenBasedColor(str) {
			if(str.length === 1) {
				str += str;
			}
			return ree.num.limit(ree.num.toInt(str, 16), 0, 255);
		}

		function getColors(str) {
			var M;
			if(str.charAt(0) === '#') {
				if(str.length === 4) {
					M = str.match(/\w/g);
				}
				else {
					M = str.match(/\w{2}/g);
				}
				if(M.length === 3) {
					M = ree.arr.map(M, tenBasedColor);
				}
				else {
					throw Error('Incorrect input string!');
				}
			}
			else {
				M = str.match(/\d{1,3}/g);
				if(M) {
					M = ree.arr.map(M, function(c) {
						return ree.num.limit(ree.num.toInt(c), 0, 255);
					});

				}
			}
			return M || [];
		};

		this.getColors = getColors;

		// to rgb

		function toRgb(str) {
			var colors = this.getColors(str);
			if(colors.length === 3) {
				return 'rgb(' + colors.join(', ') + ')';
			}
			return false;
		};

		this.toRgb = toRgb;

		// to hex

		function toHex(str) {
			var colors = this.getColors(str);
			console.log(colors);
			if(colors.length === 3) {
				return '#' + ree.arr.map(colors, function(c) {
					var color = c.toString(16);
					return (color.length === 1) ? '0' + color : color;
				}).join('');
			}
			return false;
		};

		this.toHex = toHex;

		// trim

		function trim(str, chars) {
			str = ree.str.ltrim(str, chars);
			str = ree.str.rtrim(str, chars);
			return str;
		};

		this.trim = trim;

		// ltrim

		function ltrim(str, chars) {
			chars = chars || '\\s';
			return str.replace(new RegExp('^[' + chars + ']+', 'g'), '');
		};

		this.ltrim = ltrim;

		// rtrim

		function rtrim(str, chars) {
			chars = chars || '\\s';
			return str.replace(new RegExp('[' + chars + ']+$', 'g'), '');
		};

		this.rtrim = rtrim;

		// random string

		function random(n) {
			var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
				res = '',
				n = n ? n : 8,
				i = 0;

			for(; i < n; i++) {
				res += chars.charAt(Math.floor(Math.random() * chars.length));
			}

			return res;
		};

		this.random = random;

		// at

		function at(str, i) {
			return str.charAt(i);
		}

		this.at = at;

	};

}


//~ <component>
//~	Name: Function Helper
//~	Info: Provides function helpers
//~ </component>


function ReeFunction() {

	this.fn = new function() {

		function defer(fn, delay, context) {

			var args = Array.prototype.slice(arguments, 2);

			return setTimeout(function() {
				fn.apply(context, args);
			}, delay);
		}

		this.defer = defer;

	};

}


	ReeType.call(this);
	ReeObject.call(this);
	ReeArray.call(this);
	ReeNumber.call(this);
	ReeString.call(this);
	ReeFunction.call(this);

	};

}
else {
	throw Error('ree init error -  property already present in ' + this.toString());
}
