
//~ <component>
//~	Name: Yfunction
//~	Info: Provide function helpers
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
