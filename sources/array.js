
//~ <component>
//~	Name: Yarray
//~	Info: Provide array helpers
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
