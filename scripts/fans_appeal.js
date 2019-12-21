document.addEventListener("DOMContentLoaded",function(){
    let allAppeals = [];

    document.getElementById("sendButton").addEventListener("click",addAppeal);
    window.addEventListener("online", function (event) {
        provider.get("appeals", (appeals) => {
            if (appeals) {
                allAppeals = appeals;
            }
            sendAllAppealsToServer(allAppeals);
            showAllAppeals(allAppeals);
            provider.remove("appeals");
            allAppeals = [];
        });
    });


    if(isOnline()){
        sendAllAppealsToServer(allAppeals);
        provider.remove("appeals");
        allAppeals = [];

        let req = new XMLHttpRequest();
        req.open("GET","/appeal",true);
        req.send();
        req.onreadystatechange = function(){
            if(req.readyState === XMLHttpRequest.DONE){
                if(req.status != 200){
                    console.log("Something wrong!!!");
                }else{
                    let data = JSON.parse(req.responseText);
                    showAllAppeals(data);
                }
            }
        };
    }

    function addAppeal(){
        const commentText = document.getElementsByClassName("commentSection")[0].value.trim();
        if (commentText === "") {
            alert("Enter text in comment section!");
            document.getElementById("sendButton").blur();
            return;
        }
        const nickname = prompt("Enter your nickname: ", "User").trim();
        if (nickname === "" || nickname == null) {
            alert("Nickname is incorrect!");
            document.getElementById("sendButton").blur();
            return;
        }
        const time = new Date();


        if (isOnline()) {
            sendAppealToServer(nickname,time,commentText);
            showAppeal(nickname, time, commentText);
            alert("Successfully sent to server");
        } else {
            allAppeals.push({name: nickname, time: time, text: commentText});
            provider.add("appeals", allAppeals);
            alert("Saved to storage");
        }
        document.getElementById("sendButton").blur();
        document.getElementsByClassName("commentSection")[0].value = "";
    }

    function showAppeal(name,time,text){
    const commentBlock = document.createElement("div");
    commentBlock.id = "content";
    const date = document.createElement("div");
    date.className = "date";
    date.innerHTML = "<p>" + name + "</p>" + "<p>" + time.getHours() + ":"
        + (time.getMinutes() < 10 ? "0" : "") + time.getMinutes()
        + "</p>" + "<p>" + time.getDate() + "." + (time.getMonth() + 1) + "." + time.getFullYear() + "</p>";
    const comment = document.createElement('div');
    comment.id = "text-fans-appeal";
    comment.innerHTML = "<p>" + text + "</p>";
    console.log(name);
    console.log(time);
    console.log(text);
    commentBlock.prepend(date);
    commentBlock.appendChild(comment);

    const referenceNode = document.getElementById("box-content");
    referenceNode.prepend(commentBlock)
}
    function showAllAppeals(allAppeals) {
        for(let i = 0; i< allAppeals.length; i++){
            showAppeal(allAppeals[i].name, new Date(allAppeals[i].time),allAppeals[i].text)
        }
    }
    function sendAppealToServer(name, time, text) {
        fetch("/appeal", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({name: name, time: time, text: text}),
        })
            .catch(error => console.error("Cannot fetch data:", error));
    }

    function sendAllAppealsToServer(allAppeals) {
        for (let i = 0; i < allAppeals.length; i++) {
            sendAppealToServer(allAppeals[i].name, allAppeals[i].time, allAppeals[i].text)
        }
    }

});
