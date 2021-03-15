let firebase = require('./firebase')

exports.handler = async function(event) {
  console.log("!!!!!!!!!!!!!!GetOnePick!!!!!!!!!!!!!!ooooooooooooooo!!!!!!!")
  console.log(event.queryStringParameters.userid)
  let data = [] // sample only...
  let db = firebase.firestore()

  // let body = JSON.parse(event.body)
  let sourceUserId = event.queryStringParameters.userid

  
  let querySnapshot = await db.collection('profiles')
                        .where('userId', '!=',sourceUserId )
                        .get()

  let items = querySnapshot.docs
  console.log(items.length);
  let hasLike = true;
  let randomIndex;

  while(hasLike){
    randomIndex = Math.floor(Math.random() *items.length);   
    let querySnapshot2 = await db.collection('likes')
     .where('sourceUserId', '==',sourceUserId )
     .where('targetUserId', '==',items[randomIndex].data().userId )
    .get()
        console.log(querySnapshot2.size);           
        if(querySnapshot2.size!=1){
            hasLike = false
            break
        }
  }

  data.push({
      userId: items[randomIndex].data().userId,
      name: items[randomIndex].data().name,
      profilePic: items[randomIndex].data().profilePic,
      description: items[randomIndex].data().description,
    })

   console.log(data)
   console.log("!!!!!!!!!!!!!!!GetOnePick!!!!!!!!!ooooooooooooooooooo!!!!!!!!!!!")


  return {
    statusCode: 200,
    body: JSON.stringify(data)
  }
}