import './App.css';
import { Post } from './Components/Post';
import { useEffect, useState } from 'react'
import { auth, db } from '../src/Firebase'
import Modal from '@material-ui/core/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Input } from '@mui/material';


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
  const [open, setOpen] = useState(false);
  // Sign Up variables 
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  useEffect(() => {
    // Run piece of code once when page reloads. and in spacific condition
    db.collection('posts').onSnapshot(snapshot => {
      //everytime new post added, this code gets fired.
      setPosts(snapshot.docs.map(doc => ({
        id: doc.id,
        post: doc.data()
      })));
    })
  }, [])
  const createUser = (e) => {
    e.preventDefault();
    auth.createUserWithEmailAndPassword(email, password).catch((error) => alert(error.message));
  }

  return (
    <div className="app">
      <form>
        <Button onClick={() => setOpen(true)}>Sign In</Button>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <center>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                <img src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" alt="" className="header__img" />
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>

                <Input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
                <Input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                <Input type="text" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" /><br />
                <button onClick={(e) => createUser(e)}>Sign Up</button>
              </Typography>
            </center>
          </Box>
        </Modal>

      </form>
      {/* Header */}
      <div className="app__header">
        <img src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" alt="" className="header__img" />
      </div>

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
