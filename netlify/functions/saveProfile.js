// API url to this lambda funtion: /.netlify/functions/like
let firebase = require('./firebase')

exports.handler = async function(event) {
    console.log("!!!!!!!!!!!!SaveProfile!!!!!!!!!!!!!!!!!!!!!")
  let db = firebase.firestore()

  // 🔥🔥🔥 Code-Along
  // Implement the like function
  // Step 2:  Parse out the like data, i.e. the event.body – pull out
  //          the user id and the post id that is provided
  //          in the POST request, and assign to variables. Use
  //          console.log if necessary, to ensure the values are what
  //          you're expecting.

  // console.log(event)
  let body = JSON.parse(event.body)
  let userId = body.userId
  let name = body.name
  let profilePic = body.profilePic
  let description = body.description
  let email = body.email

  // console.log(`post id is ${postId}`)
  // console.log(`user id is ${userId}`)

  // Step 3:  Check in the firestore collection to see if the user has
  //          already liked the post before adding a new like.
  
await db.collection("profiles").doc(userId).set({
    name: name,
    userId: userId,
    profilePic: profilePic,
    description: description,
    email: email
})
console.log("!!!!!!!!!!!!SaveProfile!!!!!!!!!!!!!!!!!!!!!")
    return {
    statusCode: 200,
    body: JSON.stringify({success: true})
  }

}