import React ,{useState, useEffect} from 'react';
import './App.css';
import Post from "./Post";
import {db, auth} from "./firebase";
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Input } from '@material-ui/core';
import ImageUpload from "./ImageUpload";

function getModalStyle() {
  const top = 50 ;
  const left = 50 ;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function App() {

  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const[posts, setPost] = useState([]);
  const[open, setOpen]= useState(false);
  const[openSignIn, setOpenSignIn]= useState(false);
  const[username, setUsername] = useState('');
  const[email, setEmail] = useState('');
  const[password, setPassword] = useState('');
  const[user, setUser] = useState(null);

  useEffect(()=>{
      const unsubscribe = auth.onAuthStateChanged((authUser)=>{
          if(authUser){
            console.log(authUser);
            setUser(authUser);
          }
          else{
            setUser(null);
          }
      })
      return()=>{
        unsubscribe();
      }
},[user, username]);

  useEffect(()=>{
      db.collection('post').orderBy('timestamp','desc').onSnapshot(snapshot=>{
        setPost(snapshot.docs.map(doc=>({
          id:doc.id, 
          post:doc.data()
        })));
      })
  },[]);

  const signUp= (event)=>{
      event.preventDefault();

      auth
        .createUserWithEmailAndPassword(email,password) 
        .then((authUser)=>{
          return authUser.user.updateProfile({
                    displayName:username
                 })
        })
        .catch((error)=>alert(error.message));
      setOpen(false);
  }
  const signIn= (event)=>{
    event.preventDefault();
    auth.signInWithEmailAndPassword(email,password)
    .catch((error)=>alert(error.message));;
    
    setOpenSignIn(false);
}

  return (
    <div className="app">
     
        <Modal open={open} onClose={() => setOpen(false)}>
          <div style={modalStyle} className={classes.paper}>
            <form className="app__signup">
                <center>
                  <img className="app__headerImage"
                      src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" 
                      alt="" />
                </center>
                <Input 
                  placeholder="Username"
                  type="text"
                  value={username}
                  onChange={(e)=>setUsername(e.target.value)}
                />
                <Input 
                  placeholder="Email"
                  type="email"
                  value={email}
                  onChange={(e)=>setEmail(e.target.value)}
                />
                <Input 
                  placeholder="Password"
                  type="password"
                  value={password}
                  onChange={(e)=>setPassword(e.target.value)}
                />
                <Button type="submit" onClick={signUp}>SignUp</Button>
              </form>
          </div>
      </Modal>
      <Modal open={openSignIn} onClose={() => setOpenSignIn(false)}>
        <div style={modalStyle} className={classes.paper}>
          <form className="app__signup">
              <center>
                <img className="app__headerImage"
                    src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" 
                    alt="" />
              </center>
              <Input 
                placeholder="Email"
                type="email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
              />
              <Input 
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
              />
              <Button type="submit" onClick={signIn}>Sign In</Button>
            </form>
        </div>
      </Modal>
      <div className="app__header">
        <img className="app__headerImage"
             src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" 
             alt="" />
        {user?(
        <Button onClick={() => auth.signOut()}>LogOut</Button>
      ):
      (
        <div className="app__loginContainer">
            <Button onClick={() => setOpenSignIn(true)}>Sign In</Button>
            <Button onClick={() => setOpen(true)}>Sign Up</Button>
        </div>
    
      )}
      </div>
      
      
      {
        posts.map(({id,post})=>(
            <Post 
                  key={id}
                  username={post.username}
                  caption={post.caption}
                  imageUrl={post.imageUrl}/>
        ))
      }
      {user?.displayName ? (
            <ImageUpload username={user.displayName}/>
      ):(
        <h3>Login To Upload </h3>
      )}

    </div>
  );
}

export default App;
