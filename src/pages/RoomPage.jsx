

const RoomPage = ({ setIsAuth,setRoom }) => {
  const logout= ()=>{
    //state i false'çkerek login sayfasına dönmesini sağladık
    setIsAuth(false);
    //local'deki tokeni kaldır
    localStorage.removeItem("token");

  }
  //form gönderilince
  const handleSubmit =(e)=>{
    e.preventDefault();

    setRoom(e.target[0].value.toLocaleLowerCase());

  }
  return (
    <form onSubmit={handleSubmit} className="room-page" > 
      <h1>Chat Odası</h1>
      <p>Hangi odaya gireceksiniz?</p>
      <input type="text" required placeholder="ör:haftaiçi" />
      <button type="submit">Odaya Gir</button>
      <button onClick={logout} type="button">Çıkış Yap</button>
    </form>
  );
};

export default RoomPage;
