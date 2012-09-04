
// globals

var a = 2, A = {a: 3};

// Array module

module('arr');

	test('indexOf', function() {

		var	arr = [1, 2, 3, 2],
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

	test('each', function() {

		var	arr = [1, 2, 3, 4],
			arr2 = Array(4),
			thisCounts = 0;

		function count(arr, context) {
			var count = 0;
			thisCounts = 0;
			ree.arr.each(arr, function(c, i, m) {
				count += 1;
				thisCounts += this.a;
			}, context);
			return count;
		}

		function getSummByC(arr, context) {
			var summ = 0;
			thisCounts = 0;
			ree.arr.each(arr, function(c, i, m) {
				summ += c;
				thisCounts += this.a;
			}, context);
			return summ;
		}

		function getSummByIM(arr, context) {
			var summ = 0;
			thisCounts = 0;
			ree.arr.each(arr, function(c, i, m) {
				summ += m[i];
				thisCounts += this.a;
			}, context);
			return summ;
		}

		function checkArgs(arr, context) {
			var flag = true;
			thisCounts = 0;
			ree.arr.each(arr, function(c, i, m) {
				if(m[i] !== c) {
					flag = false;
					return true;
				}
				thisCounts += this.a;
			}, context);
			return flag;
		}

		function breakTest(arr, loopi, context) {
			var count = 0;
			thisCounts = 0;
			ree.arr.each(arr, function(c, i, m) {
				if(loopi === i) return true;
				count += 1;
				thisCounts += this.a;
			}, context);
			return count;
		}

		ok(count(arr) === 4, 'OK');
		ok(count(arr2) === 0, 'OK');
		ok(getSummByC(arr) === 10, 'OK');
		ok(getSummByIM(arr) === 10, 'OK');
		ok(checkArgs(arr), 'OK');
		ok(checkArgs(arr2), 'OK');

		ok((count(arr) || true) && thisCounts === 8, 'OK');
		ok((count(arr2) || true) && thisCounts === 0, 'OK');
		ok((getSummByC(arr) || true) && thisCounts === 8, 'OK');
		ok((getSummByIM(arr) || true) && thisCounts === 8, 'OK');
		ok((checkArgs(arr) || true) && thisCounts === 8, 'OK');
		ok((checkArgs(arr2) || true) && thisCounts === 0, 'OK');

		ok((count(arr, A) || true) && thisCounts === 12, 'OK');
		ok((count(arr2, A) || true) && thisCounts === 0, 'OK');
		ok((getSummByC(arr, A) || true) && thisCounts === 12, 'OK');
		ok((getSummByIM(arr, A) || true) && thisCounts === 12, 'OK');
		ok((checkArgs(arr, A) || true) && thisCounts === 12, 'OK');
		ok((checkArgs(arr2, A) || true) && thisCounts === 0, 'OK');

		ok(breakTest(arr, 0) === 0, 'OK');
		ok(breakTest(arr, 2) === 2, 'OK');
		ok(breakTest(arr, 5) === 4, 'OK');

		ok((breakTest(arr, 0, A) || true) && thisCounts === 0, 'OK');
		ok((breakTest(arr, 2, A) || true) && thisCounts === 6, 'OK');
		ok((breakTest(arr, 5, A) || true) && thisCounts === 12, 'OK');

	});

	test('map', function() {
		
		var arr = [1, undefined, 3, 4],
			res1 = ree.arr.map(arr, function(c, i, m) {return c * 2;}),
			res2 = ree.arr.map(arr, function(c, i, m) {return m[i] * 2;}),
			res3 = ree.arr.map(arr, function(c, i, m) {return this.a;}),
			res4 = ree.arr.map(arr, function(c, i, m) {return this.a;}, A);

		ok(res1.length === res2.length, 'OK');
		ok(res1[0] === res2[0], 'OK');
		ok(isNaN(res1[1]) === isNaN(res2[1]), 'OK');
		ok(res3[0] === 2, 'OK');
		ok(res4[1] === 3, 'OK');

	});

	test('filter', function() {

		var arr = [1, undefined, 3, 4],
			res1 = ree.arr.filter(arr, function(c, i, m) {if(c) return c;}),
			res2 = ree.arr.filter(arr, function(c, i, m) {if(m[i]) return m[i];}),
			res3 = ree.arr.filter(arr, function(c, i, m) {return this.a === 2;}),
			res4 = ree.arr.filter(arr, function(c, i, m) {return this.a === 3;}, A);

		ok(res1.length === 3, 'OK');
		ok(res2.length === 3, 'OK');
		ok(res1[3] === undefined, 'OK');
		ok(res2[3] === undefined, 'OK');
		ok(res3.length === 4, 'OK');
		ok(res4.length === 4, 'OK');

	});

	test('every', function() {

		var arr = [1, 2, 3, 4],
			arr2 = [1, undefined, 2, undefined],
			res1 = ree.arr.every(arr, function(c, i, m) {return c !== undefined;}),
			res2 = ree.arr.every(arr, function(c, i, m) {return m[i] !== undefined;}),
			res3 = ree.arr.every(arr2, function(c, i, m) {return c !== undefined;}),
			res4 = ree.arr.every(arr2, function(c, i, m) {return m[i] !== undefined;}),
			res5 = ree.arr.every(arr, function(c, i, m) {return c * this.a >= 2}),
			res6 = ree.arr.every(arr2, function(c, i, m) {return m[i] * this.a >= 3});

		ok(res1, 'OK');
		ok(res2, 'OK');
		ok(!res3, 'OK');
		ok(!res4, 'OK');
		ok(res5, 'OK');
		ok(!res6, 'OK');

	});

	test('some', function() {

		var arr = [1, 2, 3, 4],
			arr2 = [1, undefined, 2, undefined],
			res1 = ree.arr.some(arr, function(c, i, m) {return c !== undefined;}),
			res2 = ree.arr.some(arr, function(c, i, m) {return m[i] !== undefined;}),
			res3 = ree.arr.some(arr2, function(c, i, m) {return c !== undefined;}),
			res4 = ree.arr.some(arr2, function(c, i, m) {return m[i] !== undefined;}),
			res5 = ree.arr.some(arr, function(c, i, m) {return c * this.a >= 2}),
			res6 = ree.arr.some(arr2, function(c, i, m) {return m[i] * this.a >= 3});

		ok(res1, 'OK');
		ok(res2, 'OK');
		ok(res3, 'OK');
		ok(res4, 'OK');
		ok(res5, 'OK');
		ok(res6, 'OK');

	});

	test('toArray', function() {
		var res1 = ree.arr.toArray(1),
			res2 = ree.arr.toArray(1.1),
			res3 = ree.arr.toArray('abc'),
			res4 = ree.arr.toArray(null),
			res5 = ree.arr.toArray(undefined),
			res6 = ree.arr.toArray(function() {}),
			res7 = ree.arr.toArray([]),
			res8 = ree.arr.toArray([1, 2, 3]),
			res9 = ree.arr.toArray({a: 1, b: 2}),
			res10 = ree.arr.toArray([1, {a: 2, b: 3}, [4, 5, 6]], null, 'abc', undefined);

		ok(res1, 'OK');
		ok(res1.length === 1, 'OK');

		ok(res2, 'OK');
		ok(res2.length === 1, 'OK');

		ok(res3, 'OK');
		ok(res3.length === 1, 'OK');

		ok(res4, 'OK');
		ok(res4.length === 0, 'OK');

		ok(res5, 'OK');
		ok(res5.length === 0, 'OK');

		ok(res6, 'OK');
		ok(res6.length === 1, 'OK');

		ok(res7, 'OK');
		ok(res7.length === 0, 'OK');

		ok(res8, 'OK');
		ok(res8.length === 3, 'OK');

		ok(res9, 'OK');
		ok(res9.length === 2, 'OK');

		ok(res10, 'OK');
		ok(res10.length === 4, 'OK');


	});

	test('last', function() {
		var arr = [],
			arr2 = [1],
			arr3 = [1, null];

		ok(ree.arr.last(arr) === undefined, 'OK');
		ok(ree.arr.last(arr2) === 1, 'OK');
		ok(ree.arr.last(arr3) === null, 'OK');

	});

	test('pushOnce', function() {

		var arr = [];

		ok(~ree.arr.pushOnce(arr, 1), 'OK');
		ok(arr[0] === 1, 'OK');
		ok(~ree.arr.pushOnce(arr, 1), 'OK');
		ok(arr.length === 1, 'OK');

	});

	test('linear', function() {
		var arr = [1, 'abc', [undefined, null, function() {}, {a: 2}, [3, 4, 5]]],
			res = ree.arr.linear(arr);

		ok(res.length === 9, 'OK');
		ok(res[0] === 1, 'OK');
		ok(res[1] === 'abc', 'OK');
		ok(res[2] === undefined, 'OK');
		ok(res[3] === null, 'OK');
		ok(res[4].call, 'OK');
		ok(res[5].hasOwnProperty, 'OK');
		ok(res[6] === 3, 'OK');
		ok(res[7] === 4, 'OK');
		ok(res[8] === 5, 'OK');

	});

	test('delByVal', function() {

		var fn = function() {},
			arr = [undefined, 1, 1, function() {}, fn];

		ree.arr.delByVal(arr, undefined);
		ok(arr.length === 3, 'OK');

		ree.arr.delByVal(arr, function() {});
		ok(arr.length === 3, 'OK');
		ree.arr.delByVal(arr, fn);
		ok(arr.length === 2, 'OK');

		ree.arr.delByVal(arr, 1);
		ok(arr.length === 1, 'OK');

		ree.arr.delByVal(arr, 1);
		ok(arr.length === 0, 'OK');

		ree.arr.delByVal(arr, 1);
		ok(arr.length === 0, 'OK');

	});

	test('del', function() {

		var arr = [undefined, 1, 1, function() {}, 'abc'];

		ree.arr.del(arr, -1);
		ok(arr.length === 5, 'OK');

		ree.arr.del(arr, 100);
		ok(arr.length === 5, 'OK');

		ree.arr.del(arr, 0);
		ok(arr.length === 4, 'OK');
		ok(arr[0] === 1, 'OK');

	});

	test('copy', function() {
		
		var arr = [1, 2, 3, {a: 1}],
			res = ree.arr.copy(arr);

		ok(res[0] === arr[0], 'OK');
		ok(res[1] === arr[1], 'OK');
		ok(res[2] === arr[2], 'OK');
		ok(res[3] === arr[3], 'OK');

	});

	// fast copy past
	test('eachInvert', function() {
		
		var	arr = [1, 2, 3, 4],
			arr2 = Array(4),
			thisCounts = 0;

		function count(arr, context) {
			var count = 0;
			thisCounts = 0;
			ree.arr.each(arr, function(c, i, m) {
				count += 1;
				thisCounts += this.a;
			}, context);
			return count;
		}

		function getSummByC(arr, context) {
			var summ = 0;
			thisCounts = 0;
			ree.arr.each(arr, function(c, i, m) {
				summ += c;
				thisCounts += this.a;
			}, context);
			return summ;
		}

		function getSummByIM(arr, context) {
			var summ = 0;
			thisCounts = 0;
			ree.arr.each(arr, function(c, i, m) {
				summ += m[i];
				thisCounts += this.a;
			}, context);
			return summ;
		}

		function checkArgs(arr, context) {
			var flag = true;
			thisCounts = 0;
			ree.arr.each(arr, function(c, i, m) {
				if(m[i] !== c) {
					flag = false;
					return true;
				}
				thisCounts += this.a;
			}, context);
			return flag;
		}

		function breakTest(arr, loopi, context) {
			var count = 0;
			thisCounts = 0;
			ree.arr.each(arr, function(c, i, m) {
				if(loopi === i) return true;
				count += 1;
				thisCounts += this.a;
			}, context);
			return count;
		}

		ok(count(arr) === 4, 'OK');
		ok(count(arr2) === 0, 'OK');
		ok(getSummByC(arr) === 10, 'OK');
		ok(getSummByIM(arr) === 10, 'OK');
		ok(checkArgs(arr), 'OK');
		ok(checkArgs(arr2), 'OK');

		ok((count(arr) || true) && thisCounts === 8, 'OK');
		ok((count(arr2) || true) && thisCounts === 0, 'OK');
		ok((getSummByC(arr) || true) && thisCounts === 8, 'OK');
		ok((getSummByIM(arr) || true) && thisCounts === 8, 'OK');
		ok((checkArgs(arr) || true) && thisCounts === 8, 'OK');
		ok((checkArgs(arr2) || true) && thisCounts === 0, 'OK');

		ok((count(arr, A) || true) && thisCounts === 12, 'OK');
		ok((count(arr2, A) || true) && thisCounts === 0, 'OK');
		ok((getSummByC(arr, A) || true) && thisCounts === 12, 'OK');
		ok((getSummByIM(arr, A) || true) && thisCounts === 12, 'OK');
		ok((checkArgs(arr, A) || true) && thisCounts === 12, 'OK');
		ok((checkArgs(arr2, A) || true) && thisCounts === 0, 'OK');

		ok(breakTest(arr, 0) === 0, 'OK');
		ok(breakTest(arr, 2) === 2, 'OK');
		ok(breakTest(arr, 5) === 4, 'OK');

		ok((breakTest(arr, 0, A) || true) && thisCounts === 0, 'OK');
		ok((breakTest(arr, 2, A) || true) && thisCounts === 6, 'OK');
		ok((breakTest(arr, 5, A) || true) && thisCounts === 12, 'OK');

	});



// Object module

module('obj');

	test('ok test', function() {
		ok(true, 'arr ok');
	});



// Number module	

module('num');

	test('ok test', function() {
		ok(true, 'arr ok');
	});

module('str');



// String module

	test('ok test', function() {
		ok(true, 'arr ok');
	});



// Function module

module('fn');

	test('ok test', function() {
		ok(true, 'arr ok');
	});



// Type module

module('type');

test('ok test', function() {
	ok(true, 'arr ok');
});