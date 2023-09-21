export const codeGenerator = () => {
  const caracter = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const codeLength = 8; // Puedes ajustar la longitud del código según tus necesidades
  let code = '';

  for (let i = 0; i < codeLength; i++) {
    const indice = Math.floor(Math.random() * caracter.length);
    code += caracter[indice];
  }
  return code
}




