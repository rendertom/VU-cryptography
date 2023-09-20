
const utf8 = require('utf8');

module.exports = class Sheff {
  constructor(ciphertext) {
    this.ciphertext = ciphertext;
    this.history = [];
    this.string = ciphertext;
    this.surrogates = 'ĄąČčĘęĖėÄĮįŠšŲųŪūŽž'
      .split('')
      .map((char) => utf8.encode(char).split(''));
  }


  auto(max = 50) {
    let i = 0;
    while (true && i < max) {
      i++;
      if (this.hasCharacterOutOfRange()) {
        this.toBase64();
      } else if (this.isValidHex(this.string)) {
        this.fromHex();
      } else if (this.isValidBase64(this.string)) {
        this.fromBase64();
      } else {
        return this;
      }
    }
  }

  fromBase64() {
    this.string = atob(this.string);
    this.history.push('fromBase64');
    return this;
  }

  fromHex() {
    const hexBytes = this.string.match(/.{1,2}/g);
    if (!hexBytes) throw new Error('Invalid Hex string');

    this.string = hexBytes
      .map((byte) => String.fromCharCode(parseInt(byte, 16)))
      .join('');
    this.history.push('fromHex');
    return this;
  }

  isValidBase64() {
    return /^[A-Za-z0-9+/]+[=]{0,2}$/.test(this.string);
  }

  isValidHex() {
    return /^[0-9a-fA-F]+$/.test(this.string);
  }

  toBase64() {
    this.string = btoa(this.string);
    this.history.push('toBase64');
    return this;
  }

  // TODO: this makes no sense
  hasCharacterOutOfRange() {
    for (let i = 0; i < this.string.length; i++) {
      const char = this.string[i];
      const nextChar = this.string[i + 1];
      if (nextChar) {
        for (var j = 0; j < this.surrogates.length; j++) {
          if (
            char === this.surrogates[j][0] &&
            nextChar === this.surrogates[j][1]
          ) {
            return false;
          }
        }
      }
      if (!this.isPrintableCharacter(char)) {
        return true;
      }
    }
    return false;
  }

  isPrintableCharacter(char) {
    const charCode = char.charCodeAt(0);
    return charCode >= 32 && charCode <= 127;
  }

  toString() {
    return {
      ciphertext: this.ciphertext,
      history: this.history,
      result: utf8.decode(this.string),
    };
  }
}
