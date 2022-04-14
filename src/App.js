import './App.css';
import { Post } from './Components/Post';
import { useEffect, useState } from 'react'
import { auth, db } from '../src/Firebase'
import Modal from '@material-ui/core/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Input } from '@mui/material';
import { Header } from './Components/Header';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function App() {
  const [posts, setPosts] = useState([]);
  const [openSignUp, setOpenSignUp] = useState(false);
  const [openLogIn, setOpenLogIn] = useState(false);
  // Sign Up Variables
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // User is logged in...
        console.log(authUser);
        setUser(authUser);
      }
      else {
        // User is logged out...
        setUser(null);
      }
    })
    return () => {
      unsubscribe();
    }
  }, [user, username]);

  useEffect(() => {
    // Run piece of code once when page reloads. and in spacific condition
    db.collection('posts').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      //everytime new post added, this code gets fired.
      setPosts(snapshot.docs.map(doc => ({
        id: doc.id,
        post: doc.data()
      })));
    })
  }, [])
  const signUp = (event) => {
    event.preventDefault();
    auth.createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        return authUser.user.updateProfile({
          displayName: username
        })
      })
      .catch((error) => alert(error.message));
    setOpenSignUp(false);
  }
  const signIn = (event) => {
    event.preventDefault();
    auth.signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error.messege))
    setOpenLogIn(false);
  }
  return (
    <div className="app">
      <form className="app__signup">
        <Modal
          open={openSignUp}
          onClose={() => setOpenSignUp(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <center>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                <img src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                  alt="" className="header__img"
                />
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <Input type="text" value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Username"
                />
                <Input type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                />
                <Input type="text" value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password" /><br />
                <button onClick={(event) => signUp(event)}
                >Sign Up</button>
              </Typography>
            </center>
          </Box>
        </Modal>

        <Modal
          open={openLogIn}
          onClose={() => setOpenLogIn(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <center>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                <img src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                  alt="" className="header__img"
                />
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <Input type="text" value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Username"
                />
                <Input type="text" value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password" /><br />
                <button onClick={(event) => signIn(event)}
                >Log In</button>
              </Typography>
            </center>
          </Box>
        </Modal>
      </form>
      <Header user={user} />
      {
        user ? (<Button onClick={() => auth.signOut()}>Log Out</Button>) :
          (
            <div className='login__container'>
              <Button onClick={() => setOpenLogIn(true)}>Log In</Button>
              <Button onClick={() => setOpenSignUp(true)}>Sign In</Button>
            </div>)
      }
      {
        posts.map(({ id, post }) => {
          return (
            <Post key={id} Username={post.username} ImageURL={post.imageURL} Caption={post.caption} />
          )
        })
      }
    </div >
  );
}
export default App;