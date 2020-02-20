/*
    - can be thought of as an alternate way of writing promise based code
        * allows us to avoid chaining promises

    - async/await allows to program using asynchronous requests, like a request to an API, in an synchronous manner - while still allowing other code to run in the background
    - unlock the use of await
*/

/*
// syntax
async function myFn() {
    // await
}

const myFn = async () => {
    // await
}


function myFn() {
    await // generates an error; can't use in a normal function. Can only use the await keyword inside an async function
}

// ============================================================
// The body is wrapped in a Promise
async function fn() {
    return 'hello';
}

fn().then(dataFromAsyncFunction => {
    console.log(dataFromAsyncFunction);
})

fn().then(console.log);  // print the result of the resolved Promise
fn().then(console.log()); // displays nothing

// ==================================================
function fn() {
    return Promise.resolve('hello');
}

fn().then(console.log)

*/
// ============================================

const request = async () => {
    const response = await fetch('https://random.dog/woof.json');
    const json = await response.json();
    return json;
}

request().then(dogObj => {
    console.log(dogObj);
})