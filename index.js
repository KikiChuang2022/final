firebase.auth().onAuthStateChanged(async function(user) {
  if (user) {
    // Signed in
    console.log('signed in')
    console.log(user)

    document.querySelector('.sign-in-or-sign-out').innerHTML = `
      <p class="text-white-500">Hello ${user.displayName}<p>
      <button class="text-pink-500 underline sign-out">Sign Out</button>
    `
    document.querySelector('.sign-out').addEventListener('click', function(event) {
      // console.log('sign out clicked')
      firebase.auth().signOut()
      document.location.href = 'index.html'
    })

    
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




     response = await fetch('/.netlify/functions/like', {
      method: 'POST',
      body: JSON.stringify({
        sourceUserId: user.uid,
        targetUserId:"abc" 
      })
    })
    console.log(response)

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

async function renderMatches(user){
  let response = await fetch(`/.netlify/functions/getMatches?userid=${user.uid}`)
  let matches = await response.json()
  console.log(response)
  console.log(matches)

  // from Gino- show match

  for (let i = 0; i < user.length; i++) {
    let leg = user[i]
    document.querySelector('.matches').insertAdjacentHTML('beforeend', `
      <div class="border-4 border-gray-900 p-4 my-4 text-left">
        <div class="flex">
          <div class="w-1/2">
            <h2 class="text-2xl py-1">${leg.displayName}</h2>
            <p class="font-bold text-gray-600">${leg.email}</p>
          </div>
        </div>
      </div>
    `)
  }


}

async function renderDailyPick(user){
    response = await fetch(`/.netlify/functions/getDailyPick?userid=${user.uid}`)
    dailyPick = await response.json()
    console.log(response)
    console.log(dailyPick)

    let dailyName = dailyPick[0].name
    let dailyProfilPic = dailyPick[0].profilePic
    let dailyDescription = dailyPick[0].description
    console.log(dailyProfilPic)
    document.querySelector('.right').insertAdjacentHTML('beforeend',`
      <div class="md:flex"> 
        <div class="mx-2 my-4 pt-2 pb-2 text-center text-xl font-extrabold">
          <img src=${dailyProfilPic}>
          <h2 class="text-blue-600">${dailyName}</h2>
          <h3 class="text-black-700">${dailyDescription}</h3>
        </div>
      </div>

      <div class="md:flex"> 
        <div class="mx-2 my-4 pt-2 pb-2 w-1/4 text-center text-xl text-gray-50 font-extrabold  border-2 rounded-lg">
          <div class ="bg-blue-500">V</div>
          <div class ="bg-red-500">X</div>
        </div>
      </div>
    `)
}