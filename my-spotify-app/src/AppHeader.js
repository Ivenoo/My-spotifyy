import React from 'react';




class AppHeader extends React.Component {
  

 
  render() {
    return(
      <div className='App-Menu'>
        <img src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/3c2de0d3-f642-445f-9852-f3505837f06c/dbx7cht-1b9e03b6-5395-48ea-bee2-e9f3c8a79c39.png/v1/fill/w_886,h_902,strp/chibi_goku_ultra_instinto_by_jaredsongohan_dbx7cht-pre.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTA0MiIsInBhdGgiOiJcL2ZcLzNjMmRlMGQzLWY2NDItNDQ1Zi05ODUyLWYzNTA1ODM3ZjA2Y1wvZGJ4N2NodC0xYjllMDNiNi01Mzk1LTQ4ZWEtYmVlMi1lOWYzYzhhNzljMzkucG5nIiwid2lkdGgiOiI8PTEwMjQifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.waIqZu6Dsk_O21tNz307ragHqkcx21sRrBLBPN42Tug"
         height="40px" width="40px" alt=" " className="Home-Page" onClick ={this.props.selectAction.bind(this, "homePage")} value="homePage"/>
        <button className="main-button" onClick ={this.props.selectAction.bind(this, "findSound")}>Find Sound</button>
        <button className="main-button" onClick={this.props.selectAction.bind(this, "findArtist")}>Find Artist</button>
        <button className="main-button" onClick={this.props.selectAction.bind(this, "findGenres")}>Find Genres</button>
        <button className="main-button" onClick={this.props.selectAction.bind(this, "findAlbum")}>Find Album</button>
        <button className="main-button" onClick={this.props.selectAction.bind(this, "favourite")}>Favourite</button>
      </div>
    )
  }
}

export default AppHeader;
