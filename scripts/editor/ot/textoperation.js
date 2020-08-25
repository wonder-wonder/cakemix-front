// Not complete

class TextOperation {
  constructor() {
    // When an operation is applied to an input string, you can think of this as
    // if an imaginary cursor runs over the entire string and skips over some
    // parts, deletes some parts and inserts characters at some positions. These
    // actions (skip/delete/insert) are stored as an array in the "ops" property.
    this.ops = []
    // An operation's baseLength is the length of every string the operation
    // can be applied to.
    this.baseLength = 0
    // The targetLength is the length of every string that results from applying
    // the operation on a valid input string.
    this.targetLength = 0
  }

  equals(other) {
    if (this.baseLength !== other.baseLength) {
      return false
    }
    if (this.targetLength !== other.targetLength) {
      return false
    }
    if (this.ops.length !== other.ops.length) {
      return false
    }
    for (let i = 0; i < this.ops.length; i++) {
      if (this.ops[i] !== other.ops[i]) {
        return false
      }
    }
    return true
  }

  // Operation are essentially lists of ops. There are three types of ops:
  //
  // * Retain ops: Advance the cursor position by a given number of characters.
  //   Represented by positive ints.
  // * Insert ops: Insert a given string at the current cursor position.
  //   Represented by strings.
  // * Delete ops: Delete the next n characters. Represented by negative ints.

  isRetain = op => {
    return typeof op === 'number' && op > 0
  }

  isInsert = op => {
    return typeof op === 'string'
  }

  isDelete = op => {
    return typeof op === 'number' && op < 0
  }

  // After an operation is constructed, the user of the library can specify the
  // actions of an operation (skip/insert/delete) with these three builder
  // methods. They all return the operation for convenient chaining.

  // Skip over a given number of characters.
  retain(n) {
    if (typeof n !== 'number') {
      throw new TypeError('retain expects an integer')
    }
    if (n === 0) {
      return this
    }
    this.baseLength += n
    this.targetLength += n
    if (this.isRetain(this.ops[this.ops.length - 1])) {
      // The last op is a retain op => we can merge them into one op.
      this.ops[this.ops.length - 1] += n
    } else {
      // Create a new op.
      this.ops.push(n)
    }
    return this
  }

  // Insert a string at the current position.
  insert(str) {
    if (typeof str !== 'string') {
      throw new TypeError('insert expects a string')
    }
    if (str === '') {
      return this
    }
    this.targetLength += str.length
    const ops = this.ops
    if (this.isInsert(ops[ops.length - 1])) {
      // Merge insert op.
      ops[ops.length - 1] += str
    } else if (this.isDelete(ops[ops.length - 1])) {
      // It doesn't matter when an operation is applied whether the operation
      // is delete(3), insert("something") or insert("something"), delete(3).
      // Here we enforce that in this case, the insert op always comes first.
      // This makes all operations that have the same effect when applied to
      // a document of the right length equal in respect to the `equals` method.
      if (this.isInsert(ops[ops.length - 2])) {
        ops[ops.length - 2] += str
      } else {
        ops[ops.length] = ops[ops.length - 1]
        ops[ops.length - 2] = str
      }
    } else {
      ops.push(str)
    }
    return this
  }

  // Delete a string at the current position.
  delete(n) {
    if (typeof n === 'string') {
      n = n.length
    }
    if (typeof n !== 'number') {
      throw new TypeError('delete expects an integer or a string')
    }
    if (n === 0) {
      return this
    }
    if (n > 0) {
      n = -n
    }
    this.baseLength -= n
    if (this.isDelete(this.ops[this.ops.length - 1])) {
      this.ops[this.ops.length - 1] += n
    } else {
      this.ops.push(n)
    }
    return this
  }
}
