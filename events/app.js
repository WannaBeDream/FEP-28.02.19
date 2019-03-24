function onElementClick(event){
    event.stopPropagation();

    toggleBackground(event.target);

    console.log(event);
    // alert('Hell from function');
    // this.removeEventListener('click', sayHello);
}

const h2 = 
    document.getElementsByTagName('h2')[0];

h2.addEventListener('click', sayHello);

document.body.addEventListener('click', function(e){
    console.log('body', e);

    toggleBackground(e.target);

})

function toggleBackground(el){
    el.style.background =
        el.style.background === 'yellow' ?
            'red':'yellow';
}

