class Gallery{

}

const myGallery = new Gallery(
                        document.getElementById('container'),
                        { delay: 1000}
                        )
myGallery.show(2);
myGallery.next();
myGallery.prev();