function sayHello(event){

    console.log(event);
    alert('Hell from function');
    this.removeEventListener('click', sayHello);
}

const h2 = 
    document.getElementsByTagName('h2')[0];

h2.addEventListener('click', sayHello);

document.getElementById('title')
    .addEventListener('click', sayHello);

    
