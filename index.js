  
      /**
         * Sample JavaScript code for youtube.channels.list
         * See instructions for running APIs Explorer code samples locally:
         * https://developers.google.com/explorer-help/guides/code_samples#javascript
         */
       
        function authenticate() {
            if(gapi.auth2!=undefined){
          //    console.log(gapi.client);
              
            gapi.auth2.getAuthInstance()
                .signIn({scope: "https://www.googleapis.com/auth/youtube.readonly"})
                .then(function(data) {
                  console.log("***********************")
                  console.log("Sign-in successful");return data; },
                      function(err) { console.error("Error signing in", err); }).then((data)=>{
                        console.log(gapi.client);
                        localStorage.setItem('gmailid',data.Es.kt);
                      //  console.log(localStorage.getItem('gmailid'))
                          loadClient();
                      })
          
                    }}
          function loadClient() {
            localStorage.setItem('apikey',"AIzaSyAVxccr4fSWZQi3HsnfYuKwuKfHJnYKDXo");
            gapi.client.setApiKey("AIzaSyAVxccr4fSWZQi3HsnfYuKwuKfHJnYKDXo");
            return gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
                .then(function() { console.log("GAPI client loaded for API");
              },
                      function(err) { console.error("Error loading GAPI client for API", err); });
          }
          // Make sure the client is loaded and sign-in is complete before calling this method.
        //  console.log(gapi.client)
    // if(localStorage.getItem('apikey')!=undefined){
    //   gapi.client.setApiKey(localStorage.getItem('apikey'));
    //   gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
    //   }
    function search(){
    //   return gapi.client.youtube.search.list({
    //     "part": [
    //       "snippet"
    //     ],
    //     "q":"savageprogrammer"
    //   })
    //       .then(function(response) {
    //               // Handle the results here (response.result has the parsed body).
    //               console.log("Response", response);
    //             },
    //             function(err) { console.error("Execute error", err); });
    return gapi.client.youtube.videoCategories.list({})
    .then(function(response) {
            // Handle the results here (response.result has the parsed body).
            console.log("Response", response);
          },
          function(err) { console.error("Execute error", err); });  
  }      
   function execute() {
      if(gapi.client!=undefined){
        var channel=document.getElementById("channelName").value
        console.log(channel);
        return gapi.client.youtube.channels.list({
          "part": [
            "snippet,contentDetails,statistics"
          ],
          "forUsername": `${channel}`
        })
            .then(function(response) {
                    // Handle the results here (response.result has the parsed body).
                    return new Promise((resolve,reject)=>{
                        console.log("Response", response);
                        var playlistId=response.result.items[0].contentDetails.relatedPlaylists.uploads;
                      //  console.log(playlistId);
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
                "maxResults":10
              })
                  .then(function(response) {
                          // Handle the results here (response.result has the parsed body).
                          console.log("Response", response);
                          var videos=response.result.items;
                          var ul=document.getElementById("ul");
                          videos.forEach(video => {
                            var entry = document.createElement('li');
                            entry.innerHTML=`<iframe width="560" height="315" src="https://www.youtube.com/embed/${video.snippet.resourceId.videoId}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
                            ul.append(entry);
                          });
                        },
                         function(err) { console.error("Execute error", err); });
             })
      }}
      gapi.load("client:auth2", function() {
        
        // console.log(gapi.auth2);
        gapi.auth2.init({client_id: "104520586886-25kc7v84ugpar8tgi7f4u8562kdat4ai.apps.googleusercontent.com"})
        .then(()=>{
          var temp1=JSON.stringify(gapi.auth2, function(key, value) {
            if (typeof value === 'function') {
              return value.toString();
            } else {
              return value;
            }
          });
          //  console.log(temp1)
          localStorage.setItem('gapi.auth2',temp1);
          // console.log("HIHIH")
        //  console.log(gapi.client)
          //  console.log(JSON.parse(localStorage.getItem('gapi.auth2')))
          // console.log(gapi.auth2);
            if(localStorage.getItem('apikey')!=undefined){
      gapi.client.setApiKey(localStorage.getItem('apikey'));
      gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
      }
        })
      })
    //  console.log(document.getElementById("login")+"HI");   
    //  execute.onclick=execute()
    document.getElementById("execute").addEventListener("click",execute)
    document.getElementById("login").addEventListener("click",authenticate);
    document.getElementById("search").addEventListener("click",search);