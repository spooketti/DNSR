let fileUpload = document.getElementById("faceUpload")
let photoPreview = document.getElementById("uploadPreview")
let endpoint = "http://127.0.0.1:6221/getPrediction/"
fileUpload.addEventListener('change', function(event) {
    pfpChanged = true
    const file = event.target.files[0]; // Get the selected file
    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const imageUrl = event.target.result; // Get the image URL
            const image = new Image();
            image.src = imageUrl;
            image.onload = function() {
                pfpChanged = true
                ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
                sendButton.classList.remove("locked")
            };
        };
        reader.readAsDataURL(file); // Read the file as a data URL
    }
  });


function sendFace()
{
    if(sendButton.classList.contains("locked"))
    {
        return
    }
    let payload = {"image":canvas.toDataURL()}
    fetch(endpoint,
        {
            method:"POST",
            headers: {
                "Content-Type": "application/json",
              },
            body: JSON.stringify(payload)
        }).then(response =>{
            if(response.ok)
            {
                //chatbox.value = null;
                return response.json()
            }
            throw new Error("Network response failed")
        }).then(data => {
            //console.log("Response:", data);
            let img = new Image()
            img.src = data["image"]
            img.onload = function()
            {
                ctx.drawImage(img,0,0,canvas.width,canvas.height)
            }
            for(let i=0;i<8;i++)
            {
                let doc = document.getElementById(`s${i}`)
                doc.innerText = data[i.toString()]
            }
            document.getElementById("gconf").innerText = data["gconf"]
            
          })
          .catch(error => {
            console.error("There was a problem with the fetch", error);
          });
}