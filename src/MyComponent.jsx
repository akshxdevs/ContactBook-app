import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
export const MyComponent = () => {
  const [username,setUsername] = useState("Akash");
  const hour = new Date().getHours();
  const [showContacts, setShowContactsBar] = useState(false);
  const [showHomePage, setShowHomePage] = useState(true);
  const [showAddNewContactBar,setShowAddNewContactBar] = useState(false);
  const [searchTerm,setSearchTerm] = useState("");
  const [userContact,setUserContact] = useState([]);
  // const [profileEdit,setProfileEdit] = useState(false);
  // const [editUsername,setEditUsername] = useState(false);
  // const [editAddress,setEditAddress] = useState(false);
  const [contacts,setContacts] = useState([
    { name: "Ajith", phoneNo: 1234567890,username:"Akash" },
    { name: "Balaji", phoneNo: 9987654321,username:"Akash" },
    { name: "Basker", phoneNo: 9988776655,username:"Akash"},
    {name:"Ankut",phoneNo:8877665544,username:"Suman" },
  ]);
  const [newContact,setNewContacts] = useState({name:"",phoneNo:""})
  const greetings = hour > 12 ? "Good evening" : "Good morning";



  const handleArrowFunction = () => {
    setShowHomePage(false);
    setShowContactsBar(true);
  };

  const handleChange = (e) => {
    const {name,value} = e.target
    setNewContacts({
      ...newContact,
      [name]:value,
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newContact.name && newContact.phoneNo) {
      setContacts([...contacts,newContact]);
      setNewContacts({name:"",phoneNo:""});
      toast.success("Contact Created Sucessfully..")
    }
  }

  const handleSearchBar = (e) => {
    setSearchTerm(e.target.value)
  }

  const handleRemoveContact = (phoneNo) => {
    setContacts(contacts.filter(contact => contact.phoneNo != phoneNo));
    toast.success("Contact Deleted Sucessfully..")
  }
  const filteredContacts = contacts.filter((contact)=>
    contact.name.toLowerCase().startsWith(searchTerm.toLowerCase()) || 
    contact.phoneNo.toString().startsWith(searchTerm)
  );

  useEffect(()=>{
    const filtered = contacts.filter((contract)=>contract.username === username);
    setUserContact(filtered);
  },[username,contacts])

  // const handleUsernameChange = (e) => {
  //   const newUsername = e.target
  //   setUsername(newUsername);
  // }

  // const handleUsernameChangeSubmit = (e) => {
  //   e.preventDefault()
  // }

  

  return (
    <div className="flex justify-center items-center h-screen bg-gray-200">
      {showHomePage ? (
        <div className="w-96 h-96 p-10 bg-white rounded-lg flex flex-col justify-center items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                 <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
            </svg>
            <h1 className="text-center text-2xl font-bold">My Contact App</h1>
            <h1 className="text-center text-xl font-semibold">
                Hello {username}, {greetings}
            </h1>
            <p className="mt-2">Welcome to the app.</p>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
            </svg>
            <button
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                onClick={handleArrowFunction}>
                <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6">
                    <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m8.25 4.5 7.5 7.5-7.5 7.5"
                    />
                </svg>
            </button>
        </div>
      ) : null}
      {showContacts ? (
        <div className="w-96 h-max p-10 bg-white rounded-lg">
          <div className="flex gap-44 pl-1 pb-3">
            <div className="flex">
              <button className="underline" onClick={()=>{
                setShowHomePage(true);
                setShowContactsBar(false);
              }}>Back</button>
            </div>
            <div className="flex ml-auto">
              <button onClick={()=> {
                setProfileEdit(true);
                setShowContactsBar(false);
              }
              }>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                </svg>
              </button>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex gap-24">
                <div><h2 className="text-md font-semibold pt-0 pl-1">My Contacts</h2></div>
                <div><button className="text-xs pt-1" onClick={()=>{
                    setShowContactsBar(false);
                    setShowAddNewContactBar(true);
                    }}>Add New Contacts</button></div>
            </div>
            <input
              className="w-79 p-2 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              placeholder="Search your contacts here..."
              value={searchTerm}
              onChange={handleSearchBar}
            />
            <div>
              {filteredContacts.length > 0 ? (
                <div className="pl-1 pt-3">
                  {filteredContacts.map((contact) => (
                    <div className="flex gap-5 border-solid border-2 border-gray-200 mt-2 rounded-xl "key={contact.phoneNo}> 
                    <div className="flex justify-center items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-10">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        </svg>
                    </div>
                    <div>
                        <h5 className="font-semibold">{contact.name}</h5>
                        <p>{contact.phoneNo}</p>
                    </div>
                    <div className="flex justify-center items-center ml-auto">
                        <button className="p-2" onClick={() => handleRemoveContact(contact.phoneNo)} >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                            </svg>
                        </button>
                    </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex justify-center items-center">
                  <h1>No Contacts Available</h1>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : null}
       {showAddNewContactBar ? (
        <div className="w-96 h-96 p-10 bg-white rounded-lg">
          <div className="p-10">
          <button className="underline" onClick={()=>{
                setShowAddNewContactBar(false);
                setShowContactsBar(true);
              }}>Back</button>
            <h1 className="text-center pb-5 font-bold text-xl">Add To Contact</h1>
            <form onSubmit={handleSubmit}>
              <input 
                type="text"
                placeholder="Enter your name.."
                name="name"
                value={newContact.name}
                className="border border-cyan-700 rounded-xl p-2 mb-1"
                onChange={handleChange}
              />
              <input 
                type="text"
                placeholder="Enter your phone no.."
                name="phoneNo"
                value={newContact.phoneNo}
                className="border border-cyan-700 rounded-xl p-2 mb-1"
                onChange={handleChange}
              />
              <button className="border border-slate-300 hover:border-slate-400 p-1 w-full rounded-xl mt-5" type="submit">
                Create Contact
              </button>
            </form>
          </div>
        </div>
      ) : null}
      {/* {profileEdit ? (
        <div className="w-96 h-96 p-10 bg-white rounded-lg">
          <div className="flex flex-col justify-center items-center pt-20">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            </svg>
            {editUsername ? (
              <div className="flex">
                <p>Username: </p> 
                <input 
                type="text"
                placeholder="Enter new username."
                value={username}
                onChange={handleUsernameChange}
                 />
                <button onClick={handleUsernameChangeSubmit}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                  </svg>
                </button>
              </div>
            ):(

              <div className="flex">
                <p>Username: {username}</p>
                <button onClick={()=>{setEditUsername(true)}}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                  </svg>
                </button>
              </div>
            )}
            <div className="flex">
            <p>Address: {""}</p>
            <button onClick={()=>{setEditAddress(true)}}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
              </svg>
            </button>
            </div>
          </div>      
        </div>
      ):null} */}
      <ToastContainer/>
    </div>
  );
};

