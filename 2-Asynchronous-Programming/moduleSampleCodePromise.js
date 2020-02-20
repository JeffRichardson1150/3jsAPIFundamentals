/*
Creating a Promise
We'll use this example throughout our discussion on promises:

    Remember back to the good old days. If you were a good, well-behaved child that did your chores and stuff, then you were basically promised a gift from Santa.

    As we all know, you can't really slack off because Santa is always watching... Yes, even when you are asleep. You won't know if you've been good enough until December 25 (or whenever you celebrate) and sit down to tear off the wrapping paper or look in your stocking. Until December 25th, you do lots of other things, you don't just sit there and wait to see what Santa brings.

    There's really only two possible outcomes that you'll find:

    You've been good enough to earn the gift promised from Old Kris Kringle, the King of Jingling.
    You've made Father Christmas's naughty list and end up with coal.

    Here's what our example looks like in JavaScript:
*/

// Boolean declaration 
let amIGood = false;

// Promise 
let iCanHasGift = new Promise(
    function (resolve, reject) {
        if (amIGood) {
            let gift = {
                brand: 'HasMattelbro',
                item: 'Turbo-Man action figure'
            };
            resolve(gift); // fulfilled 
        } else {
            let naughty = "You've made Santa's naughty list; enjoy your coal!";
            reject(naughty); // rejected
        }
    }
);

/*
Consuming Promises
Let's consume our promise.
*/

// Promise call 
let checkTwice = function () {
    iCanHasGift
        .then(function (fulfilled) {
            // nice list = gift
            console.log(fulfilled);
        // output: { brand: 'HasMattelbro', item: 'Turbo-Man action figure'} 
        })
        .catch(function (error) {
            // naughty list = coal
            console.log(error);
        // output: "You've made Santa's naughty list; enjoy your coal!"
        });
};

checkTwice();

/*
    checkTwice - function that consumes the promise iCanHasGift
    .then - used with function(fulfilled) {...} if promise is resolved.
    .catch - used with function(error){...} if promise is rejected.
    fulfilled - the value passed in resolve(). In our case, gift is the fulfilled value.
    error - the value passed in reject(). In our case, naughty is the error value.
*/

/*
ASYNC
# Promises Continued
Promises are asynchronous: each promise starts when the previous succeeds and uses the previous promise's result.

To see this in action, let's log a message before and after we call the promise.
*/
// 2nd promise
let playDate = function (gift) {
    return new Promise(
        function (resolve, reject) {
            let message = "Salutations fellow child I enjoy interacting with! I notice you received a posable plastic Batman figurine during the Yultide season. What do you think of my new " + gift.brand + ' ' + gift.item + '?';

            resolve(message); 
        }
    );
};

// Promise call
let checkTwice = function () {
    console.log('before Christmas'); // log before
    iCanHasGift
        .then(playDate)
        .then(function (fulfilled) {
            console.log(fulfilled);
        })
        .catch(function (error) {
            console.log(error)
        });
    console.log('after opening gifts'); // log after
}

checkTwice()
/*
What do you think the order of output will be?

    before Christmas
    Salutations fellow child I enjoy interacting with! I notice you received a posable plastic Batman figurine during the Yultide season. What do you think of my new HasMattelbro Turbo-Man action figure?
    after opening gifts

You would think this is the correct order, but you would be wrong. It's actually:

    before Christmas
    after opening gifts
    Salutations fellow child I enjoy interacting with! I notice you received a posable plastic Batman figurine during the Yultide season. What do you think of my new HasMattelbro Turbo-Man action figure?

If you think about it, it does make sense. You wouldn't play with your new action figures before Christmas. You haven't received them yet!

This is where asynchronous programming fits in. The code will run without blocking or waiting for the result. Anything that needs to wait for a promise to proceed is put in .then.
*/

