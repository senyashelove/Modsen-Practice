function accessobject(obj, property) {
    try {
      return obj[property];
    } catch (error) {
      if (error instanceof TypeError) {
        console.log(`Ошибка:'${property}' не найдено`);
        return null;
      } else {
        throw error;
      }
    }
  }

const object = { name: 'Arseni', age: 20 };
console.log(accessobject(object, 'name')); 
console.log(accessobject(object, 'names'));