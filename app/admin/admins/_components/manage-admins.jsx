'use client'

import { Button } from "@/components/ui/button"
import { db } from "@/firebase.config"
import { useAuth } from "@clerk/nextjs"
import { collection, onSnapshot, query } from "firebase/firestore"
import { useEffect, useState } from "react"
import { AdminListItem } from "./admin-list-item"
import { UserListItem } from "@/components/user-list-item"
import { addDocument, removeDocument } from "@/lib/firebaseUtils"

export const ManageAdmins = ({ clerkUsers }) => {

  const { userId } = useAuth()

  const [firebaseAdmins, setFirebaseAdmins] = useState([])
  const [error, setError] = useState(null)
  const [selected, setSelected] = useState([])

  useEffect(() => {
    const q = query(collection(db, 'admins'))
    const unsub = onSnapshot(q, querySnapshot => {
      querySnapshot.forEach(snapshot => {
        const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        setFirebaseAdmins(data)
      })
    })

    return () => unsub()
  }, [])

  const handleSelect = (user) => {
    if(selected.includes(user)) {
      setSelected(users => users.filter(u => u.id !== user.id))
    } else {
      setSelected(users => [...users, user])
    }
  }

  const handleMakeAdmin = async () => {
    await Promise.all(selected.map(user => addDocument('admins', { admin: true }, user.id)))
    setSelected([])
  }

  const handleRemoveAdmin = async (id) => {
    if(admins.length <= 1) {
      setError('You must have atleast one admin')
      setTimeout(() => {setError(null)}, 4000)
      return
    }
    if(id == userId) {
      setError('You cannot remove yourself')
      setTimeout(() => {setError(null)}, 4000)
      return
    }

    await removeDocument('admins', id)
    setError(null)
  }

  const admins = clerkUsers.filter(user => firebaseAdmins.some(admin => admin.id === user.id))
  const users = clerkUsers.filter(user => !firebaseAdmins.some(admin => admin.id === user.id))

  return (
    <>
    
    <div className="flex gap-4">
      <div className="flex-1">
        <p className="mb-2 font-semibold text-lg">Admins</p>
        <div className="border rounded-xl min-h-96">
          {
            admins && admins.map(admin => (
              <AdminListItem key={admin.id} onClick={() => handleRemoveAdmin(admin.id)} imageUrl={admin.imageUrl} email={admin.email} />
            ))
          }
        </div>
      </div>
      <div className="flex-1">
        <p className="mb-2 font-semibold text-lg">Users</p>
        <div className="border rounded-xl min-h-96">
          {
            users && users.map(user => (
              <UserListItem key={user.id} onClick={() => handleSelect(user)} imageUrl={user.imageUrl} email={user.email} isSelected={selected.includes(user)}  />
            ))
          }
        </div>
      </div>
    </div>
    <div className="flex justify-end mt-4">
      <Button disabled={selected.length === 0} onClick={handleMakeAdmin} >Make Selected Admin</Button>
    </div>
      {
        error && (
          <div className="flex justify-center">
            <p className="text-red-500 px-10 bg-red-500/10 py-1 rounded-lg">{error}</p>
          </div>
        )
      }
    </>
  )
}