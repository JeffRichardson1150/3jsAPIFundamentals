/*
# Callbacks
A callback function is function executed by another function. Usually this occurs when data needs to be processed or modified in some way so that it can be used later within the original function.
*/

function callbackFunction(){
    const data = {
        name: 'Ralf Machio', 
        age: 66, 
        occupation: 'kickboxing'
    }
    return data;
}

function showGreeting(dataFromFunction){
    return "hello " + dataFromFunction.name + ", I hear you're the greatest?!"
}

console.log(
    showGreeting(callbackFunction())
)



