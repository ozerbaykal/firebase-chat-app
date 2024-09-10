import { auth } from "../firebase";

const Message = ({ data }) => {
  //eğer bu mesajı bu cihazda oturumu açık olan user attıysa:sağ tarafta

  if (auth.currentUser.uid === data.author.id) {
    return <p className="msg-user">{data.text}</p>;
  }
  //eğer farklı bir kullanıcı attıysa:sol tarafta göster
  return (
    <div className="msg-other">
      <div>
        <img src={data.author.photo} alt="profilepicture" />
        <span>{data.author.name}</span>

      </div>
      <p className="msg-text">{data.text}</p>
    </div>
  );
};

export default Message;
