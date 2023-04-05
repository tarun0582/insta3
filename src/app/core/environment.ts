
export const environment = {
    production: false,
    firebaseConfig: {
        apiKey: "AIzaSyAt3BVxR9gCcdHSMNLY6qRZdnvxcAz1w6w",
        authDomain: "instagram-a303f.firebaseapp.com",
        projectId: "instagram-a303f",
        storageBucket: "instagram-a303f.appspot.com",
        messagingSenderId: "668249430748",
        appId: "1:668249430748:web:e91755cb9d30f89482b219"
    }
  };
  export const sidenavLink=[
    {
        name:"instagram",
        value:'home',
    },
    {
        name:"search",
        value:'search',
    },
    {
        name:"message",
        value:'message',
    },
    {
        name:"post",
        value:'post',
    },
    {
        name:"logout",
        value:'logout',
    },
  ]
 export const validator={
email:/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
password: /^(?=.{6,})(?=.*[a-z])(?=.*[0-9])(?=.*[A-Z])(?=.*[@#$%^&+=]).*$/,
text:/^[a-zA-Z,'.\-\s]*$/,
  }