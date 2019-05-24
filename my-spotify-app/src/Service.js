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
export const listen =(url,trackName) =>{
    let playerBox =  document.querySelector('.Player-Box');
    playerBox.style.display = 'block';

    let TrackName =  document.querySelector('.Track-Name-Audio');
    TrackName.innerHTML = ` ${trackName}`;

    let player =  document.querySelector('.Player')
    player.src = url;

    let scroll =  document.querySelector('.Scroll-Up');
    scroll.className = "Scroll-Up Scroll-And-Audio";
    console.log(scroll)

    let appContent =  document.querySelector('.Homepage-Box');
    appContent.className = "Homepage-Box App-Content-bottom " ;
  }

 export const ScrollUp = () =>{
    window.scroll({
        top: 0, 
        left: 0, 
        behavior: 'smooth'
      });
 }

//  export const buttonScroll = () =>{
//     console.log(window.pageYOffset)
//     if(window.pageYOffset >= 200 ){
//         console.log('ODPAL SIĘ')
//     }else{
//         console.log('schowaj się')
//     }
//  }



 