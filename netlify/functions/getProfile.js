let firebase = require('./firebase')

exports.handler = async function(event) {
  console.log("!!!!!!!!!!!!!!GetProfile!!!!!!!!!!!!!!!!!!!!!")
  console.log(event.queryStringParameters.userid)
  let data = [] // sample only...
  let db = firebase.firestore()

  // let body = JSON.parse(event.body)
  let sourceUserId = event.queryStringParameters.userid

  
  let querySnapshot = await db.collection('profiles').doc(sourceUserId).get()

  data.push({
      userId: querySnapshot.data().userId,
      name: querySnapshot.data().name,
      profilePic: querySnapshot.data().profilePic,
      description: querySnapshot.data().description,
      email: querySnapshot.data().email,
    })
  
   console.log(data)
   console.log("!!!!!!!!!!!!!!!GetProfile!!!!!!!!!!!!!!!!!!!!")


  return {
    statusCode: 200,
    body: JSON.stringify(data)
  }
}