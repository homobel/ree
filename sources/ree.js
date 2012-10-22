
//~ <component>
//~	Name: Ree
//~	Info: Working with embedded types
//~ </component>


if(this.ree === undefined) {

	this.ree = new function() {

//~ require: ree-init.js

	};

}
else {
	throw Error('ree init error -  property already present in ' + this.toString());
}
