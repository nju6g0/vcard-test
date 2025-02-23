import firebase from 'firebase/app'
import 'firebase/messaging'

const firebaseConfig = {
  apiKey: 'AIzaSyDskbbFlFBW7qs7GEHaPlrxanxkeD2x6vU',
  authDomain: 'vcard-test-2571e.firebaseapp.com',
  projectId: 'vcard-test-2571e',
  storageBucket: 'vcard-test-2571e.firebasestorage.app',
  messagingSenderId: '540209097281',
  appId: '1:540209097281:web:ca9633c0d3be3d5bc9b4c0',
  measurementId: 'G-2PLDP22BDB',
}

firebase.initializeApp(firebaseConfig)

export const messaging = firebase.messaging()
