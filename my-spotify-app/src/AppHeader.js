import React from 'react';
import {Link} from 'react-router-dom'




class AppHeader extends React.Component {
  

 
  render() {
    return(
      <div className='App-Menu'>
        <Link to="/"><img src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/3c2de0d3-f642-445f-9852-f3505837f06c/dbx7cht-1b9e03b6-5395-48ea-bee2-e9f3c8a79c39.png/v1/fill/w_886,h_902,strp/chibi_goku_ultra_instinto_by_jaredsongohan_dbx7cht-pre.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTA0MiIsInBhdGgiOiJcL2ZcLzNjMmRlMGQzLWY2NDItNDQ1Zi05ODUyLWYzNTA1ODM3ZjA2Y1wvZGJ4N2NodC0xYjllMDNiNi01Mzk1LTQ4ZWEtYmVlMi1lOWYzYzhhNzljMzkucG5nIiwid2lkdGgiOiI8PTEwMjQifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.waIqZu6Dsk_O21tNz307ragHqkcx21sRrBLBPN42Tug"
         height="40px" width="40px" alt=" " className="Home-Page" value="homePage"/> </Link>
        <Link to="/findsound"><button className="main-button">Find Sound</button> </Link>
        <Link to="/findartist"><button className="main-button" >Find Artist</button> </Link>
        <Link to="/findgenres"><button className="main-button">Find Genres</button></Link>
        <Link to="/findalbum"> <button className="main-button" >Find Album</button></Link>
        <Link to="/favourite"><button className="main-button">Favourite</button> </Link>
      </div>
    )
  }
}

export default AppHeader;
