
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

		// trim

		function trim(str, chars) {
			str = ltrim(str, chars);
			str = rtrim(str, chars);
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
