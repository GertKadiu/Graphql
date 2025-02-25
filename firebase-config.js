import { initializeApp, getApp, getApps } from "firebase/app";
import {
  FIREBASE_API_KEY,
  FIREBASE_STORAGE_BUCKET,
  FIREBASE_API_ID,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_PROJECT_ID
} from "@env";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  storageBucket: FIREBASE_STORAGE_BUCKET,
  appId: FIREBASE_API_ID,
  authDomain: FIREBASE_AUTH_DOMAIN ,
  projectId: FIREBASE_PROJECT_ID
};

if (getApps().length === 0) {
  initializeApp(firebaseConfig);
}

const fbConfig = getApp();
const storage = getStorage(fbConfig);

const uploadToFirebase = async(uri, name, onProgress) => {
   const fetchResponse = await fetch(uri)
   const theBlob = await fetchResponse.blob();

const imageRef = ref(storage, `images/${name}`);

const uploadTask = uploadBytesResumable(imageRef, theBlob);

return new Promise((resolve, reject) => {
    uploadTask.on('state_changed', 
  (snapshot) => {
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    onProgress && onProgress(progress);
  }, 
  (error) => {
    // Handle unsuccessful uploads
    reject(error);
  }, 
  async() => {
    const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
    resolve({
        downloadUrl,
        metadata: uploadTask.snapshot.metadata,
    })
  });
})

}

export { fbConfig, storage, uploadToFirebase };
