firebase.auth().onAuthStateChanged(async function(user) {
  if (user) {
    // Signed in
    console.log('signed in')
    console.log(user)

  
    renderMatches(user)
    // let response = await fetch(`/.netlify/functions/getMatches?userid=abc`)
    // let posts = await response.json()
    // console.log(response)
    // console.log(posts)



    renderDailyPick(user)
    // response = await fetch(`/.netlify/functions/getDailyPick?userid=123455`)
    // posts = await response.json()
    // console.log(response)
    // console.log(posts)




    //  response = await fetch('/.netlify/functions/like', {
    //   method: 'POST',
    //   body: JSON.stringify({
    //     sourceUserId: "abc",
    //     targetUserId: "def"
    //   })
    // })
    // console.log(response)

    // response = await fetch('/.netlify/functions/like', {
    //   method: 'POST',
    //   body: JSON.stringify({
    //     sourceUserId: "def",
    //     targetUserId: "abc"

    //   })
    // })
    // console.log(response)


    response = await fetch('/.netlify/functions/saveProfile', {
      method: 'POST',
      body: JSON.stringify({
        userId: user.uid,
        name: "David Liu",
        profilePic: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fobserver.com%2F2020%2F09%2Fpierce-brosnan-lists-malibu-beach-home-for-sale-orchid-house-pictures%2F&psig=AOvVaw0S0Ig6LnRnVsRyxL_2WOm0&ust=1615923414974000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCODPsYKGs-8CFQAAAAAdAAAAABAJ",
        description: "This is David",
        email: "test@email.com"
      })
    })
    console.log(response)




    response = await fetch(`/.netlify/functions/getProfile?userid=${user.uid}`)
    posts = await response.json()
    console.log(response)
    console.log(posts)


  //   document.querySelector('.sign-in-or-sign-out').innerHTML = `
  //   <p class="text-white-500">Hello ${user.displayName}<p>
  //   <button class="text-pink-500 underline sign-out">Sign Out</button>
  // `
        // Sign-out button
        document.querySelector('.sign-in-or-sign-out').innerHTML = `
        <button class="text-pink-500 underline sign-out">Sign Out</button>
      `
      document.querySelector('.sign-out').addEventListener('click', function(event) {
        console.log('sign out clicked')
        firebase.auth().signOut()
        document.location.href = 'index.html'
      })



  } else {
    // Signed out
    console.log('signed out')

    // Initializes FirebaseUI Auth
    let ui = new firebaseui.auth.AuthUI(firebase.auth())

    // FirebaseUI configuration
    let authUIConfig = {
      signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID
      ],
      signInSuccessUrl: 'index.html'
    }

    // Starts FirebaseUI Auth
    ui.start('.sign-in-or-sign-out', authUIConfig)
  }
})

async function renderMatches(user){
  let response = await fetch(`/.netlify/functions/getMatches?userid=${user.uid}`)
  let matches = await response.json()
  console.log(response)
  console.log(matches)
}

async function renderDailyPick(user){
    response = await fetch(`/.netlify/functions/getDailyPick?userid=${user.uid}`)
    posts = await response.json()
    console.log(response)
    console.log(posts)
}
