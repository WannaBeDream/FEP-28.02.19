function Shape(color){
    this.color = color;
}

Shape.prototype.getColor = function (){
    return this.color;
}

Shape.prototype.getArea = function (){
    return 'UNDEFIED'
}

function Circle(color, r){
    this.color = color;
    this.r = r;
}

Circle.prototype = new Shape();

Circle.prototype.getArea = function (){
    return 3.14*this.r*this.r;
}

function Rectangle(h, w){
    this.w = w;
    this.h = h;
    
}
Rectangle.prototype = new Shape();

Rectangle.prototype.getArea = function(){ return this.h * this.w}


function Square(w){
    this.w = w;
}

Square.prototype = new Rectangle();


const square = new Square(3);
const circle = new Circle('green', 20);


console.log('circle', circle)
console.log('square', square)