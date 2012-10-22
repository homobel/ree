
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
