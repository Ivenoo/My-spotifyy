    // LOSOWA LICZBA  WYKORZYSTYWANA DO RANDOM OFFSET//
export const randomOffset = () =>{
    const randomOffset = Math.floor(Math.random()*10);
    return (randomOffset)
}
    //LOSOWA LITERA DO WYSWIETLANIA NP LOSOWYCH PIOSENEK//
export const randomLetter = () =>{
    const alphabet = "abcdefghijklmnopqrstuvwxyz";
    const randomLetter = alphabet[Math.floor(Math.random() * alphabet.length)];
    return(randomLetter)
}
export const listen =(url) =>{
    let player =  document.querySelector('.Player');
    player.style.display = 'block';
    player.src = url
  }