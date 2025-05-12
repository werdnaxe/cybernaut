import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';

function App () {

  // state for creating new user data (React controls the value of the input field)
  const [newUsername, setNewUserName] = useState('')
  
  // state for fetching existing user data
  const [data, setData] = useState([])

  // POST (create) user when button is clicked
  const createUser = async () => {
    try {
      const payload = { 
        username: newUsername, 
        email: `${newUsername}@example.com`,
        password: 'defaultpassword' 
      }
      const response = await axios.post('http://localhost:5000/api/users', payload)
      const newUser = response.data
      console.log('User created:', newUser)
      setNewUserName('')
    } catch (error) {
      console.error('Error creating user:', error)
    }
  }

  // GET user by id
  const fetchUserByID = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/users/681bef98aae7a2a61ceed06f')
      setData(response.data)
      console.log(response.data)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  // React hook to fetch data upon initial rendering of component (this is a side effect)
  useEffect(( ) => {
    fetchUserByID()
  }, [])
  
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </div>
  );
}

export default App;
