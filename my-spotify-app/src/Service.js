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

export const hidePlayer = () => {
    let playerBox =  document.querySelector('.Player-Box');
    playerBox.style.display = 'none';

    let scroll =  document.querySelector('.Scroll-Up');
    scroll.className = "Scroll-Up";

    let player =  document.querySelector('.Player')
    player.src = "";
    
    if(document.querySelector('.Homepage-Box')){
        let appContent =  document.querySelector('.Homepage-Box');
        appContent.className = "Homepage-Box" ;
    }else if(document.querySelector('.Find-Sounds')){
        let appContent =  document.querySelector('.Find-Sounds');
        appContent.className = "Find-Sounds" ;
    }else if(document.querySelector('.Find-Albums')){
        let appContent =  document.querySelector('.Find-Albums-Album-Tracks');
        appContent.className = "Find-Albums-Album-Tracks" ;
        let appContent2 =  document.querySelector('.Find-Albums-Box');
        appContent2.className = "Find-Albums-Box" ;
    }else if(document.querySelector('.Favourite-Song-Box')){
        let appContent =  document.querySelector('.Favourite-Song-Box');
        appContent.className = "Favourite-Song-Box" ;
    }else if(document.querySelector('.Playlists-Box')){
        let appContent =  document.querySelector('.Playlists-Box');
        appContent.className = "Playlists-Box" ;
        let appContent2 =  document.querySelector('.Playlists-Tracks');
        appContent2.className = "Playlists-Tracks" ;
        
    }
}



export const ScrollUp = () =>{
    window.scroll({
        top: 0, 
        left: 0, 
        behavior: 'smooth'
      });
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

    if(document.querySelector('.Homepage-Box')){

        let appContent =  document.querySelector('.Homepage-Box');
        appContent.className = "Homepage-Box App-Content-bottom " ;

    }else if(document.querySelector('.Find-Sounds')){
        let appContent =  document.querySelector('.Find-Sounds');
        appContent.className = "Find-Sounds Find-Sounds-And-Player" ;

    }else if(document.querySelector('.Find-Albums')){
        let appContent =  document.querySelector('.Find-Albums-Album-Tracks');
        appContent.className = "Find-Albums-Album-Tracks Find-Album-Tracks-And-Player" ;
        let appContent2 =  document.querySelector('.Find-Albums-Box');
        appContent2.className = "Find-Albums-Box Find-Albums-And-Player" ;
    }else if(document.querySelector('.Favourite-Song-Box')){
        let appContent =  document.querySelector('.Favourite-Song-Box');
        appContent.className = "Favourite-Song-Box Find-Fav-And-Player" ;
    }else if(document.querySelector('.Playlists-Box')){
        let appContent =  document.querySelector('.Playlists-Box');
        appContent.className = "Playlists-Box Find-Album-Tracks-And-Player" ;
        let appContent2 =  document.querySelector('.Playlists-Tracks');
        appContent2.className = "Playlists-Tracks Find-Albums-And-Player" ;
    }


}



 // DO ZNIKANIA PRZYCISKU SCROLL UP///


//  export const buttonScroll = () =>{
//     console.log(window.pageYOffset)
//     if(window.pageYOffset >= 200 ){
//         console.log('ODPAL SIĘ')
//     }else{
//         console.log('schowaj się')
//     }
//  }
