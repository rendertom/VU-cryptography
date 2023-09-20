module.exports = class Cheff {
  constructor(ciphertext) {
    this.ciphertext = ciphertext;
    this.history = [];
    this.string = ciphertext;
  }

  auto(max = 50) {
    let i = 0;
    while (true && i < max) {
      i++;
      if (this.needsDecoding()) {
        const temp = new Cheff(this.string).toUTF8();
        if (temp.needsDecoding()) {
          this.toBase64();
        } else {
          this.history = this.history.concat(temp.history);
          this.string = temp.string;
          return this;
        }
      } else if (this.isValidHex()) {
        this.fromHex();
      } else if (this.isValidBase64()) {
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

  needsDecoding() {
    const whiteList = 'ĄąČčĘęĖėĮįŠšŲųŪūŽž';
    const regex = new RegExp(`[^\x00-\x7F${whiteList}]`);
    return regex.test(this.string);
  }

  toBase64() {
    this.string = btoa(this.string);
    this.history.push('toBase64');
    return this;
  }

  toUTF8() {
    this.string = new TextDecoder('UTF-8').decode(
      new Uint8Array(Buffer.from(this.string, 'binary'))
    );
    this.history.push('toUTF8');
    return this;
  }

  toString() {
    return {
      ciphertext: this.ciphertext,
      history: this.history,
      result: this.string,
    };
  }
};
