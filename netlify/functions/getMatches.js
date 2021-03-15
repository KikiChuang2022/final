let firebase = require('./firebase')

exports.handler = async function(event) {
  console.log("!!!!!!!!!!!!!!GetMatches!!!!!!!!!!!!!!!!!!!!!")
  console.log(event.queryStringParameters.userid)
  let data = [] // sample only...
  let db = firebase.firestore()

  // let body = JSON.parse(event.body)
  let sourceUserId = event.queryStringParameters.userid

  
  let querySnapshot = await db.collection('likes').doc(userid).get()


  let numberOfLikes = querySnapshot.size
  console.log(numberOfLikes);
  let items = querySnapshot.docs
  for (let j=0; j<items.length; j++) {
     console.log(items[j].data().targetUserId);
     querySnapshot = await db.collection('likes')
                              .where('sourceUserId', '==',items[j].data().targetUserId )
                              .where('targetUserId', '==',sourceUserId )
                              .get()
      console.log(querySnapshot.size);           
      if(querySnapshot.size==1){
        data.push({
          userId: items[j].data().targetUserId,                                           // the post ID
        })
      }
  }

   console.log("!!!!!!!!!!!!!!!getMatches!!!!!!!!!!!!!!!!!!!!")


  return {
    statusCode: 200,
    body: JSON.stringify(data)
  }
}