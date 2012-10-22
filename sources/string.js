
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
