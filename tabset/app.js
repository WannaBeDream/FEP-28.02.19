class Tabset{
    static WRAPPER_CLASS = 'tabset-wrapper';
    static ELEMENTS_LIST_CLASS = 'tabset-elements';
    static TITLES_LIST_CLASS = 'tabset-titles';
    static TITLE_CLASS = 'tabset-heading';
    static ACTIVE_CLASS = 'active';

    constructor(container){
        this.container = container;

        this.init();
    }

    init(){
        this.wrapContainer();
        this.copyTitles();
        this.addEventListener();
        this.show(0);
    }

    wrapContainer(){
        this.titlesList = document.createElement('div');
        this.titlesList.className = Tabset.TITLES_LIST_CLASS;

        const wrapper = document.createElement('div');
        wrapper.className = Tabset.WRAPPER_CLASS;
        wrapper.appendChild(this.titlesList);

        this.container.parentNode.insertBefore(wrapper, this.container);
        wrapper.appendChild(this.container);

        this.container.classList.add(Tabset.ELEMENTS_LIST_CLASS);
    }

    copyTitles(){
        const titles = this.container.querySelectorAll(`.${Tabset.TITLE_CLASS}`);

        Array.prototype.forEach.call(titles, (el) =>  this.titlesList.appendChild(el));
    }

    addEventListener(){
        this.titlesList.addEventListener('click', (e)=> this.onTitleClick(e));
    }

    onTitleClick(e){
        const titleIndex = Array.prototype.indexOf.call(this.titlesList.children, e.target);

        if (titleIndex >= 0){
            this.show(titleIndex);
        }
    }

    hideAll(){
        Array.prototype.forEach.call(this.titlesList.children, (titleEl, index) =>{
            this.hide(index);
        })
    }

    hide(index){
        if (!this.titlesList.children[index]) {
            return;
        }
        this.titlesList.children[index].classList.remove(Tabset.ACTIVE_CLASS);
        this.container.children[index].classList.remove(Tabset.ACTIVE_CLASS);
    }

    show(index){
        if (!this.titlesList.children[index]) {
            return;
        }

        this.hide(this.activeIndex);
        this.activeIndex = index;

        this.titlesList.children[index].classList.add(Tabset.ACTIVE_CLASS);
        this.container.children[index].classList.add(Tabset.ACTIVE_CLASS);
    }

    next(){
        const newIndex = this.activeIndex + 1;

        if (this.activeIndex >= this.titlesList.children.length) {
            newIndex = 0;
        }

        this.show(newIndex);
    }

    prev(){
        const newIndex = this.activeIndex - 1;

        if (this.activeIndex < 0) {
            newIndex = this.titlesList.children.length - 1;
        }

        this.show(newIndex);
    }
}

const tabs = new Tabset(
                        document.getElementById('container')
                    );

tabs.show();
tabs.next();
tabs.prev();