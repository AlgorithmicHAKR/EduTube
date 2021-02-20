gapi.load("client:auth2", function() {
    gapi.auth2.init({client_id: "104520586886-25kc7v84ugpar8tgi7f4u8562kdat4ai.apps.googleusercontent.com"});
  });
  function authenticate() {
    if(gapi.auth2!=undefined){
    gapi.auth2.getAuthInstance()
        .signIn({scope: "https://www.googleapis.com/auth/youtube.readonly"})
        .then(function(data) { console.log("Sign-in successful");return data; },
              function(err) { console.error("Error signing in", err); }).then((data)=>{
                console.log(data);
                localStorage.setItem('gmailid',data.Es.kt);
                localStorage.setItem('fname',data.Es.bT);
                localStorage.setItem('lname',data.Es.dR);
                fetch("/api/users",{
                    method:"POST",
                    body:{
                        gmailId:localStorage.getItem('gmailid'),
                        firstName:localStorage.getItem('fname'),
                        lastName:localStorage.getItem("lname")
                    }
                }).then(msg=>{
                    console.log(msg);
                })
                  loadClient();
              })
  
            }}
  function loadClient() {
    localStorage.setItem('apikey',"AIzaSyAVxccr4fSWZQi3HsnfYuKwuKfHJnYKDXo");
    gapi.client.setApiKey("AIzaSyAVxccr4fSWZQi3HsnfYuKwuKfHJnYKDXo");
    return gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
        .then(function() { console.log("GAPI client loaded for API");
            window.location.href="/home"
      },
              function(err) { console.error("Error loading GAPI client for API", err); });
  }
  document.getElementById("login").addEventListener("click",authenticate);
