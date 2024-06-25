class Rectangle {
    constructor(width, height) {
      this.width = width;
      this.height = height;
    }
  
    Square() {
      return this.width * this.height;
    }
  
    Perimeter() {
      return 2 * (this.width + this.height);
    }
  }
  
  const myrect = new Rectangle(7, 3);

  console.log(`Площадь прямоугольника: ${myrect.Square()}`);
  console.log(`Периметр прямоугольника: ${myrect.Perimeter()}`);