
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
