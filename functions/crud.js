import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase/fire";

function generateRandomId() {
  // Characters to use for generating the ID
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  let randomId = "";
  for (let i = 0; i < 16; i++) {
    randomId += characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
  }
  return randomId;
}

export const createData = async (collectionName, data) => {
  const id = generateRandomId();
  try {
    const docRef = doc(db, collectionName, id);
    await setDoc(docRef, {
      id,
      ...data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const readData = async (collection, id) => {
  try {
    const docRef = doc(db, collection, id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("document data:", docSnap.data());
      return docSnap.data();
    } else {
      console.log("no document");
    }
  } catch (error) {
    console.log(error);
  }
};

export const updateData = async (collection, id, data) => {
  try {
    const docRef = doc(db, collection, id);
    await updateDoc(docRef, {
      id,
      ...data,
    });
    console.log("document updated!");
  } catch (error) {
    console.log(error);
  }
};

export const deleteData = async (collection, data, id) => {
  try {
    const docRef = doc(db, collection, id);
    await deleteDoc(docRef);
    console.log("document deleted!");
  } catch (error) {
    console.log(error);
  }
};

export const readAllData = async (collectionName) => {
  try {
    const newDataArr = [];
    const querySnapshot = await getDocs(collection(db, collectionName));

    querySnapshot.forEach((doc) => {
      console.log(doc.id, " ", doc.data());
      newDataArr.push(doc.data());
    });
    return newDataArr;
  } catch (error) {
    console.log(error);
  }
};

export const listenToCollection = (collectionName, callback) => {
  const collectionRef = collection(db, collectionName);

  return onSnapshot(collectionRef, (querySnapshot) => {
    const newDataArr = [];
    querySnapshot.forEach((doc) => {
      newDataArr.push(doc.data());
    });
    callback(newDataArr);
  });
};
