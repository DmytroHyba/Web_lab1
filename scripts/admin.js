document.addEventListener("DOMContentLoaded", function() {
    let allNews = [];

    document.getElementById("addImageButton").addEventListener("click", addImage);
    document.getElementById("sendNewsButton").addEventListener("click", sendNews);
    window.addEventListener("online", function (event) {
        provider.get("news", (news) => {
            if (news) {
                allNews = news;
            }
            sendAllNewsToServer(allNews);
            provider.remove("news");
            allNews = [];
        });
    });

    provider.get("news", (news) => {
        if (news) {
            allNews = news;
        }
    });

    function addImage(){
    const input =  document.querySelector("input[type=file]");
    const uploadedImage = document.getElementById("uploadedImage");
    if(input.files[0] != null){
        uploadedImage.setAttribute("src", `images/${input.files[0].name}`);
    }
    document.getElementById("addImageButton").blur();
}

function sendNews(){
    let newsImageSrc,newsTitle,newsBody;
    newsImageSrc = document.getElementById("uploadedImage").getAttribute("src");
    newsTitle = document.getElementById("newsTitle").value.trim();
    if (newsTitle === "" || newsTitle == null) {
        alert("News title is incorrect!");
        document.getElementById("sendNewsButton").blur();
        return;
    }
    newsBody = document.getElementById("newsBody").value.trim();
    if (newsBody === "" || newsBody == null) {
        alert("News body is incorrect!");
        document.getElementById("sendNewsButton").blur();
        return;
    }
    console.log(newsTitle);
    if (isOnline()) {
        alert("Successfully sent to server");
        sendNewsToServer(newsImageSrc,newsTitle,newsBody);
    } else {
        allNews.push({imgSrc: newsImageSrc, title: newsTitle, body: newsBody});
        provider.add("news", allNews);
        alert("Saved to storage");
    }
    document.getElementById("newsTitle").value = "";
    document.getElementById("newsBody").value = "";
    document.getElementById("sendNewsButton").blur();
}
    function sendNewsToServer(imgSrc,title,body) {
        fetch("/all_news",{
            method:"POST",
            headers: {
                "Content-type": "application/json"
            },
            body:JSON.stringify({imgSrc:imgSrc,title:title,body:body}),
        })
            .catch(error => console.error("Cannot fetch data:",error));
    }

    function sendAllNewsToServer(allNews){
        for(let i = 0; i < allNews.length;i++){
            sendNewsToServer(allNews[i].imgSrc,allNews[i].title,allNews[i].body)
        }
    }
});
