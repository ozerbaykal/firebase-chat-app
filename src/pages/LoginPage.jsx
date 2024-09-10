import { signInWithPopup } from "firebase/auth";
import {auth,provider} from "../firebase/index"


const LoginPage = ({setIsAuth}) => {
  
  const handleClick=()=>{
    signInWithPopup(auth,provider)
    //state i güncelle
    .then((data)=>{
      setIsAuth(data.user.refreshToken);
      localStorage.setItem("token",data.user.refreshToken)
    })
    .catch((err)=>console.log(err));
    //local storage'ı güncelle
   
  

  };

    return (
    
    
    <div className="container">
      <div className="login">
        <h1>Chat Odası</h1>
        <p>Devam etmek için giriş yapınız</p>
        <button onClick={handleClick}>
          <img src="g-logo.png" alt="google" />

          <span>Google ile Gir</span>
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
