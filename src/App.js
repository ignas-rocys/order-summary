import React, { useState, useEffect } from "react";
import phoneServices from "./services/service";
import Content from "./components/Content";
import Header from "./components/Header";
import Input from "./components/Input";
import Form from "./components/Form";
import UserNameAndPhone from "./components/UserNameAndPhone";
import ErrorMessage from "./components/ErrorMessage";

import './app.css';

function App() {
  const [data, setData] = useState([]);
  const [filterIs, setFilterIs] = useState(false);
  const [filteredData, setFilteredData] = useState([]); 
  const [deletedUser, setDeletedUser] = useState();
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    phoneServices.getAll().then((initialContacts) => setData(initialContacts));
  }, []);

  useEffect(() => {
    phoneServices.getAll().then((initialContacts) => setData(initialContacts));
  }, [deletedUser]);

  const handleFilter = (e) => {
    setFilterIs(true);
    setFilteredData(data.filter((user) => user.name.startsWith(e.target.value)))
    if(e.target.value.length === 0) {
      setFilterIs(false)
    }
  };

  const handleSubmit = (e, userInfo) => {
    e.preventDefault();
    if(!userInfo.name || !userInfo.phone) {
      setErrorMessage('Please provide all data')
      return setTimeout(() => {setErrorMessage(null)}, 3000)
    }
    // Create new user obj
    let newObj = {
      name: userInfo.name,
      phone: userInfo.phone,
      id: Math.random() * 5,
    };
    // check if user exist
    const ifUserExist = data.filter(
      (user) => user.name === userInfo.name && user.phone === userInfo.phone
    );
    // if it's exist then makea  err message
    if (!ifUserExist[0]) {
      // if it's not exit make api call and update db with new data
      return phoneServices
        .addNew(newObj)
        .then((newContact) => setData([...data, newContact]));
      
    } else {
      setErrorMessage("User exist, please add another user");
      return setTimeout(() => {setErrorMessage(null)},3000 )
    }
  };

  const handleDelete = (id) => {
    phoneServices.deleteContact(id).then((deletedContact) => {
      const newData = data.filter((user) => user.id !== deletedContact.id);
      setData(newData);
      setDeletedUser(deletedContact);
    });
  };

  return (
    <div className="App">
      {errorMessage !== null ? (
        <ErrorMessage errorMessage={errorMessage} />
      ) : null}
      <Header headerTitle={"PhoneBook"} />
      <Content className="flex-row">
        <Input
          onChange={handleFilter}
          type={"text"}
          placeholder={"filter by"}
        />
      </Content>
      <Header headerTitle={"Add new"} />
      <Content>
        <Form handleSubmit={handleSubmit} />
      </Content>
      <Header headerTitle={"Numbers"} />
      <Content className="flex-column">
        {
          filterIs ? filteredData.map((userInfo) => (
            <UserNameAndPhone
              key={userInfo.id}
              name={userInfo.name}
              phone={userInfo.phone}
              handleDelete={() => handleDelete(userInfo.id)}
            />
          )) : data.map((userInfo) => (
            <UserNameAndPhone
              key={userInfo.id}
              name={userInfo.name}
              phone={userInfo.phone}
              handleDelete={() => handleDelete(userInfo.id)}
            />
          ))

        }
      </Content>
    </div>
  );
}

export default App;
