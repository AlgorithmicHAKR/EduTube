const gmailId=localStorage.get('gmailId')
var ul=document.getElementById("ul");
fetch(`./api/subcribes?gmailId=${gmailId}`).then((channels)=>{
    channels.forEach(channelId=>{
         getvideos(channelId)
     })
})
function getvideos(channelId){
    if(gapi.client!=undefined){
        return gapi.client.youtube.channels.list({
          "part": [
            "snippet,contentDetails,statistics"
          ],
          "id": `${channelId}`
        })
            .then(function(response) {
                    // Handle the results here (response.result has the parsed body).
                    return new Promise((resolve,reject)=>{
                        console.log("Response", response);
                        var playlistId=response.result.items[0].contentDetails.relatedPlaylists.uploads;
                    
                        resolve(playlistId);
                    })  
                  },
                  function(err) { console.error("Execute error", err); })
             .then((playlistId)=>{
               console.log(playlistId)
              return gapi.client.youtube.playlistItems.list({
                "part": [
                  "snippet"
                ],
                "playlistId": playlistId,
                "maxResults":4
              })
                  .then(function(response) {
                          // Handle the results here (response.result has the parsed body).
                          console.log("Response", response);
                          var videos=response.result.items;
                        
                          videos.forEach(video => {
                            var entry = document.createElement('li');
                            entry.innerHTML=`<iframe width="250" height="250" src="https://www.youtube.com/embed/${video.snippet.resourceId.videoId}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
                            ul.append(entry);
                          });
                        },
                         function(err) { console.error("Execute error", err); });
             })
      }
}


gapi.load("client:auth2", function() {
  gapi.auth2.init({client_id: "104520586886-25kc7v84ugpar8tgi7f4u8562kdat4ai.apps.googleusercontent.com"})
  .then(()=>{
      if(localStorage.getItem('apikey')!=undefined){
          gapi.client.setApiKey(localStorage.getItem('apikey'));
          gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
      }
  })
})
function experitment(){
  
}