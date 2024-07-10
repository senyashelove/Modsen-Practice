const { Transform } = require('stream');

class UpperCaseTransformStream extends Transform {
  constructor() {
    super();
  }

  _transform(chunk, encoding, callback) {
    const upperCaseData = chunk.toString().toUpperCase();
    this.push(upperCaseData);
    callback();
  }
}

const upperCaseTransform = new UpperCaseTransformStream();

const readableStream = createReadableStreamSomehow();

const writableStream = createWritableStreamSomehow();

readableStream.pipe(upperCaseTransform).pipe(writableStream);