class Gallery{
    static SHOW_CLASS = 'show';
    static CONTAINER_CLASS = 'gallery-container';
    static ITEM_CLASS = 'gallery-item';

    constructor(container, config){
        this.container = container;
        this.config = config;
        this.currentVisible = null;

        this.init();
    }

    init(){
        this.applyClasses();
        this.addButtons();
        this.show(0);
        this.autoplay();
    }

    applyClasses(){
        this.container.classList.add(Gallery.CONTAINER_CLASS);
        Array.prototype.forEach.call(this.container.children,(el) => {
            el.classList.add(Gallery.ITEM_CLASS);
        });
    }

    addButtons(){
        const leftBtn = document.createElement('li');
        leftBtn.className = 'gallery-button left';
        leftBtn.innerText = '<'
        leftBtn.addEventListener('click', () => this.prev());

        const rightBtn = document.createElement('li');
        rightBtn.innerText = '>'
        rightBtn.className = 'gallery-button right';
        rightBtn.addEventListener('click', () => this.next());


        this.container.appendChild(leftBtn);
        this.container.appendChild(rightBtn);
    }

    autoplay(){
        setTimeout(() => {
            this.next();
            this.autoplay();
        }, this.config.delay);
    }

    show(index){
        if (this.container.children[index]){
            this.setCurrentVisible(this.container.children[index]);
        }
    }

    setCurrentVisible(el){
        this.hideCurrentVisible();
        this.currentVisible = el;
        this.currentVisible.classList.add(Gallery.SHOW_CLASS)
    }

    hideCurrentVisible(){
        this.currentVisible && this.currentVisible.classList.remove(Gallery.SHOW_CLASS)
    }

    next(){
        const nextSibling = this.currentVisible.nextElementSibling;

        if (nextSibling.classList.contains(Gallery.ITEM_CLASS)){
            this.setCurrentVisible(nextSibling);
        } else {
            this.show(0);
        }
    }

    prev(){
        const prevSibling = this.currentVisible.previousElementSibling;

        if(prevSibling){
            this.setCurrentVisible(prevSibling);
        } else {
            this.show(this.container.children.length - 1 - 2); // 2 last elements are buttons
        }
    }

}

const myGallery = new Gallery(
                        document.getElementById('container'),
                        { delay: 1000}
                        )
// myGallery.show(2);
// myGallery.next();
// myGallery.prev();