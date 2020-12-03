// import firebaseconfig from './firebase';
import firebase from 'firebase'

export const authMethods = {
  // firebase helper methods go here... 
  signup: (email: string, password: string, setErrors: any,setToken: any ) => {
    firebase.auth().createUserWithEmailAndPassword(email,password) 
      //make res asynchonous so that we can make grab the token before saving it.
      .then( async (res: any) => {
        const token = await Object.entries((res.user) as object)[5][1].b;
        //set token to localStorage 
        await localStorage.setItem('token', token)
        setToken(token)
        //grab token from local storage and set to state. 
          console.log(res)
        })
        .catch(err => {
        setErrors((prev: any) => ([...prev, err.message]))
      })
    },
  signin: (email: string, password: string, setErrors: any, setToken: any) => {
    //change from create users to...
    firebase.auth().signInWithEmailAndPassword(email, password) 
      //everything is almost exactly the same as the function above
      .then( async res => {
        const token = await Object.entries((res.user) as object)[5][1].b
          //set token to localStorage 
          await localStorage.setItem('token', token)
          
          
          setToken(window.localStorage.token)
        })
        .catch(err => {
          setErrors((prev: any) => ([...prev, err.message]))
        })
      },
      //no need for email and password
      signout: (setErrors: any, setToken: any) => {
      // signOut is a no argument function
    firebase.auth().signOut().then( res => {
      //remove the token
      localStorage.removeItem('token')
        //set the token back to original state
        setToken(null)
    })
    .catch(err => {
      //there shouldn't every be an error from firebase but just in case
      setErrors((prev: any) => ([...prev, err.message]))
      //whether firebase does the trick or not i want my user to do there thing.
        localStorage.removeItem('token')
          setToken(null)
            console.error(err.message)
    })
    },
  }