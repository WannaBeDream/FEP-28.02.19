class Album{
    static WRAPPER_CLASS = 'album-wrapper';
    static THUMBNAILS_LIST_CLASS = 'album-thumbnails-list';
    static PREVIEW_CLASS = 'album-preview';

    constructor(container){
        this.container = container;

        this.init();
    }

    init(){
        this.wrapContainer();
        this.addEventListener();
    }

    wrapContainer(){
        this.preview = document.createElement('img');
        this.preview.className = Album.PREVIEW_CLASS;

        const wrapper = document.createElement('div');
        wrapper.className = Album.WRAPPER_CLASS;

        wrapper.appendChild(this.preview);

        this.container.parentNode.insertBefore(wrapper, this.container);
        wrapper.appendChild(this.container);

        this.container.classList.add(Album.THUMBNAILS_LIST_CLASS);

    }

    addEventListener(){
        this.container.addEventListener('mousemove', (e)=> this.onTumbnailMousemove(e))
    }

    onTumbnailMousemove(e){
        if (e.target.tagName === 'IMG'){
            this.showPreview(e.target.src);
        }
    }

    showPreview(src){
        this.preview.src = src;
    }
}

const album = new Album(document.getElementById('container'));