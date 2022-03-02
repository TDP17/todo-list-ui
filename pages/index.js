import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Home from '../components/Home';

import List from '../components/List';

const App = () => {
  const router = useRouter()

  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [warning, setWarning] = useState(''); // warning state on form submit

  const logout = async () => {
    const response = await fetch(`http://localhost:5000/auth/logout`, {
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
    });
    if (response.ok)
      setUserLoggedIn(false);
    router.reload();
  }

  useEffect(() => {
    const getJWT = async () => {
      const response = await fetch(`http://localhost:5000/auth/getJWT`, {
        method: 'GET',
        mode: 'cors',
        credentials: 'include',
      });
      if (response.ok)
        setUserLoggedIn(true);
      else
        setUserLoggedIn(false);
    }
    getJWT();
  }, [userLoggedIn]);

  return (
    <>
      {userLoggedIn ? <List logout={logout} /> : <Home setUserLoggedIn={setUserLoggedIn} warning={warning} setWarning={setWarning} />}
    </>
  )
}

export default App;