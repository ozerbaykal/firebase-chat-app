import {
  addDoc,
  collection,
  onSnapshot,
  serverTimestamp,
  where,
  query,
  orderBy,
} from "firebase/firestore";
import { db, auth } from "../firebase";
import { useEffect, useRef, useState } from "react";
import Message from "../components/Message";
import EmojiPicker from "emoji-picker-react";

const ChatPage = ({ room, setRoom }) => {
  const [messages, setMessages] = useState([]);
  const lastMsg = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [text, setText] = useState("");
  //form gönderilince mesajı veri tabanına kaydet
  const handleSubmit = async (e) => {
    e.preventDefault();

    //mesaj document'inin kaydedileceği koleksiyonun refaransını al
    const messagesCol = collection(db, "messages");

    //refansı alınan koleksiyona document'i ekle
    await addDoc(messagesCol, {
      text: e.target[0].value,
      room,
      author: {
        id: auth.currentUser.uid,
        name: auth.currentUser.displayName,
        photo: auth.currentUser.photoURL,
      },
      createdAt: serverTimestamp(),
    });
    //formu sıfırla
   setText("");
  };
  //mevcut odada gönderilen mesajları anlık olarak al
  useEffect(() => {
    //1)abone olunacak koleksiyonun referansını al
    const messagesCol = collection(db, "messages");
    //2)sorgu ayarlarını yap
    const q = query(
      messagesCol,
      where("room", "==", room),
      orderBy("createdAt", "asc")
    );

    //3)onSanapshot :anlık olarak kolleksiyondaki değişimleri izler her değiştiğinde
    //callback fonksiyon tetiklenir ve güncellemeleri alır
    const unsub = onSnapshot(q, (snapshot) => {
      let temp = [];
      snapshot.docs.forEach((doc) => {
        //4)data metodu ile dökümanların içerisindeki veriye erişip geçici diziye aktardık
        temp.push(doc.data());
      });
      //son mesaja odakla
      lastMsg.current.scrollIntoView({ behavior: "smooth" });

      setMessages(temp);
    });
    //kullanıcı sayfadan ayrıldığı anda izlemeyi durdur
    return () => {
      unsub();
    };
  }, []);

  return (
    <div className="chat-page">
      <header>
        <p>{auth.currentUser?.displayName}</p>
        <p>{room}</p>
        <button onClick={() => setRoom(null)}>Farklı Oda</button>
      </header>
      <main>
        {messages.length < 1 ? (
          <p className="warn">Sohbete ilk Mesajı Gönderin</p>
        ) : (
          messages.map((data, key) => <Message data={data} key={key} />)
        )}
        <div ref={lastMsg} />
      </main>
      <form className="send-form" onSubmit={handleSubmit}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="mesajınızı yazınız"
          type="text"
        />
        <div>
          <EmojiPicker
            onEmojiClick={(e) => {
              setText(text + e.emoji);
              setIsOpen(false);
            }}
            open={isOpen}
            skinTonesDisabled
          />

          <button type="button" onClick={() => setIsOpen(!isOpen)}>🙂</button>
        </div>

        <button type="submit"> Gönder</button>
      </form>
    </div>
  );
};

export default ChatPage;
