import { db } from "@/firebase.config"
import { deleteDoc, doc, getDoc, setDoc, updateDoc, collection, getDocs, query } from "firebase/firestore"


export const getDocumentById = async (collectionName, docId) => {
  const docRef = doc(db, collectionName, docId)
  const docSnap = await getDoc(docRef)

  if(docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() }
  } else {
    return null
  }
}

export const updateDocument = async (collectionName, docId, data) => {
  const docRef = doc(db, collectionName, docId)
  await updateDoc(docRef, data)
  return docRef
}

export const addDocument = async (collectionName, data, id = null) => {
  let docRef

  if(id)
    docRef = doc(db, collectionName, id)
  else
    docRef = doc(collection(db, collectionName))

  await setDoc(docRef, data)
  return docRef
}

export const removeDocument = async (collectionName, docId) => {
  const docRef = doc(db, collectionName, docId)
  await deleteDoc(docRef)
}

export const getCollection = async (collectionName) => {
  const querySnapshot = await getDocs(query(collection(db, collectionName)))
  const data = []
  querySnapshot.forEach(doc => {
    data.push({ id: doc.id, ...doc.data() })
  })

  return data
}