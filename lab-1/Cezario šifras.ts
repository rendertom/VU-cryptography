const alphabet: string = 'AĄBCČDEĘĖFGHIĮYJKLMNOPRSŠTUŲŪVZŽ';
const ciphertext: string = 'Uk no tueže muvdiunuel?';
const shift: number = 6;

console.log(caesarDecrypt(ciphertext, shift, alphabet));

function caesarDecrypt(text: string, shift: number, alphabet: string): string {
  alphabet = alphabet.toLowerCase();
  return text
    .split('')
    .map((char: string) => {
      let index: number = alphabet.indexOf(char.toLowerCase());
      if (index === -1) return char;

      index = (index + shift) % alphabet.length;

      return char === char.toUpperCase()
        ? alphabet[index].toUpperCase()
        : alphabet[index];
    })
    .join('');
}
