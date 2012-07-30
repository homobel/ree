
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
