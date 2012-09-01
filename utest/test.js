
module('arr');

test('indexOf', function() {

	var arr = [1, 2, 3, 2],
		obj = {0: 'a', 1: 'b', 2: 'c', 3: 'd', 4: 'e'},
		num = 13;

	function testInvalidArgument(arg, val, attr) {
		try {
			ree.arr.indexOf(arg, val, attr);
			return false;
		}
		catch(e) {
			return true;
		}
	}

	ok(ree.arr.indexOf(arr, 2) === 1, 'OK');
	ok(ree.arr.indexOf(arr, 4) === -1, 'OK');
	ok(ree.arr.indexOf.call(num, arr, 2) === 1, 'OK');
	ok(ree.arr.indexOf.call(num, arr, 4) === -1, 'OK');
	ok(testInvalidArgument(obj, 'c'), 'OK');
	ok(testInvalidArgument(obj, 'z'), 'OK');

	ok(ree.arr.indexOf(arr, 2, true) === 3, 'OK');
	ok(ree.arr.indexOf(arr, 4, true) === -1, 'OK');
	ok(ree.arr.indexOf.call(num, arr, 2, true) === 3, 'OK');
	ok(ree.arr.indexOf.call(num, arr, 4, true) === -1, 'OK');
	ok(testInvalidArgument(obj, 'z', true), 'OK');
	ok(testInvalidArgument(obj, 'c', true), 'OK');

});

module('obj');

test('ok test', function() {
	ok(true, 'arr ok');
});

module('num');

test('ok test', function() {
	ok(true, 'arr ok');
});

module('str');

test('ok test', function() {
	ok(true, 'arr ok');
});

module('fn');

test('ok test', function() {
	ok(true, 'arr ok');
});

module('type');

test('ok test', function() {
	ok(true, 'arr ok');
});