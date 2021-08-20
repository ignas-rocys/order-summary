import React, { useState,useEffect } from "react";
import phoneServices from './services/service';
import Content from "./components/Content";
import Header from "./components/Header";
import Input from "./components/Input";
import Form from "./components/Form";
import UserNameAndPhone from "./components/UserNameAndPhone";

function App() {
  const [isFilter, setIsFilter] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [data, setData] = useState([]);
  const [deletedUser, setDeletedUser] = useState();

  useEffect(() => {
    phoneServices.getAll().then( (initialContacts) => setData(initialContacts) );
  },[])

  useEffect(() => {
    phoneServices.getAll().then( (initialContacts) => setData(initialContacts) );
  }, [deletedUser])

  const handleFilter = (e) => {
    let filterState, dataFiltered;

    if (e.target.value.length > 0) {
      filterState = true;
      dataFiltered = data.filter((data) => {
        return data.name.toLowerCase().startsWith(e.target.value);
      });
    } else {
      filterState = false;
    }
    setIsFilter(filterState);
    setFilteredData(dataFiltered);
  };

  const handleSubmit = (e,userInfo) => {
    e.preventDefault();
    let newObj = {
      name: userInfo.name,
      phone: userInfo.phone,
      id: Math.random() * 5
    }

    phoneServices.addNew(newObj).then(( newContact) => setData([...data, newContact]))
  };

  const handleDelete = (id) => {
    phoneServices.deleteContact(id).then((deletedContact) => {
      const newData  = data.filter( (user) => user.id !== deletedContact.id );
      setData(newData);
      setDeletedUser(deletedContact);
    })
  }

  return (
    <div className="App">
      <Header headerTitle={"PhoneBook"} />
      <Content>
        <p>filter shown with</p>
        <Input
          onChange={handleFilter}
          type={"text"}
          placeholder={"filter by"}
        />
      </Content>
      <Header headerTitle={"Add new"} />
      <Content>
        <Form handleSubmit={handleSubmit}/>
      </Content>
      <Header headerTitle={"Numbers"} />
      <Content>
        {
          isFilter ? 
          filteredData.map((filteredUser) =>  
          <UserNameAndPhone key={filteredUser.id} name={filteredUser.name} phone={filteredUser.phone} handleDelete={ () => handleDelete(filteredUser.id)}/> ) 
          :  
          data.map((userInfo) => <UserNameAndPhone key={userInfo.id} name={userInfo.name} phone={userInfo.phone} handleDelete={ () => handleDelete(userInfo.id)} />)
        }
      </Content>
    </div>
  );
}

export default App;
