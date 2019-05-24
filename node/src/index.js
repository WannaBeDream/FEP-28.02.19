console.log('require');

let counts = 0;
function add(a, b){
    return a + b;
}

function counter(){
    return ++counts;
}

module.exports = {
    add,
    counter
}