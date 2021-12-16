import React, {useState, useEffect} from "react";
import Search from "./Search";
import Sidebar from "./Sidebar";
import Content from "./Content";


function NoteContainer() {

  const [notes, setNotes] = useState([])
  const [displayNote, setDisplayNote] = useState({})
  const [search, setSearch] = useState("")
  const [editToggle, setEditToggle] = useState(false)

  useEffect(() => fetch("http://localhost:3000/notes")
    .then(resp => resp.json())
    .then(notesData => {
      setNotes(notesData)
  }), [])

  function handleUpdatedNote(updatedNote) {
    let filteredNotes = notes.map(note => {
      if (note.id === updatedNote.id) {
       return updatedNote
      }
       return note
    })
    setNotes(filteredNotes)
  }
  
  const addDisplayNote = (note) => {
    setDisplayNote(note)
  }

  const searchList = notes.filter(note => (note.title.toLowerCase().includes(search.toLowerCase()) || 
  (note.body.toLowerCase().includes(search.toLocaleLowerCase()))))

  const addNewNote = (newNote) => {
    setNotes([...notes, newNote])
  }

  const handleEditToggle = (boolean) => {
    setEditToggle(boolean)
  }

  return (
    <>
      <Search search={search} setSearch={setSearch} />
      <div className="container">
        <Sidebar 
          notes={searchList} 
          addDisplayNote={addDisplayNote} 
          addNewNote={addNewNote} 
          handleEditToggle={handleEditToggle}
        />
        <Content 
          displayContent={displayNote} 
          handleUpdatedNote={handleUpdatedNote} 
          setDisplayNote={setDisplayNote} 
          editToggle={editToggle}
          handleEditToggle={handleEditToggle}
        />
      </div>
    </>
  );
}

export default NoteContainer;