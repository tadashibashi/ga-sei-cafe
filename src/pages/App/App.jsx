import React, {createContext, useState} from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import { getUser } from '../../utilities/users-service';
import AuthPage from '../AuthPage/AuthPage';
import NewOrderPage from '../NewOrderPage/NewOrderPage';
import OrderHistoryPage from '../OrderHistoryPage/OrderHistoryPage';
import NavBar from '../../components/NavBar/NavBar';

export const UserContext = createContext(null);

export default function App() {
  const [user, setUser] = useState(getUser());
  return (
    <main className="App">
      { user ?
        <UserContext.Provider value={{user, setUser}}>
          <NavBar user={user} setUser={setUser} />
          <Routes>
            {/* client-side route that renders the component instance if the path matches the url in the address bar */}
            <Route path="/orders/new" element={<NewOrderPage />} />
            <Route path="/orders" element={<OrderHistoryPage />} />
          </Routes>
        </UserContext.Provider>
        :
        <AuthPage setUser={setUser} />
      }
    </main>
  );
}
