function sayHello(){
    alert('Hell from function');
}

const h2 = 
    document.getElementsByTagName('h2')[0];

h2.addEventListener('click', function(){
    alert('addEvent listener');
});

h2.addEventListener('click', sayHello);

document.getElementById('title')
    .addEventListener('click', sayHello);

    
