document.getElementById('uploadInput').addEventListener('change', function() {
    const thumbnailContainer = document.getElementById('thumbnailContainer')
    thumbnailContainer.innerHTML = ''

    if (uploadInput) {
        uploadInput.addEventListener('change', function() {
            thumbnailContainer.innerHTML = ''; 

            
            [...this.files].forEach(file => {
                const fileReader = new FileReader();

                fileReader.onload = function(e) {
                    if (file.type.startsWith('image/')) {
                        const img = document.createElement('img');
                        img.src = e.target.result;
                        thumbnailContainer.appendChild(img);
                    } else {
                        const fileIcon = document.createElement('div');
                        fileIcon.className = 'file-icon';
                        fileIcon.textContent = '📄';
                        thumbnailContainer.appendChild(fileIcon);
                    }
                };

                if (file.type.startsWith('image/')) {
                    fileReader.readAsDataURL(file);
                } else {
                    
                    fileReader.readAsDataURL(file);
                }
            });
        });
    } else {
        console.error('Elemento de input não encontrado!');
    }
});

async function upload() {
            const fileInput = document.getElementById("uploadInput");
            const fileLabel = document.getElementById('fileLabel');
            const uploadButton = document.getElementById('uploadButton');
            const progressElement = document.getElementById('uploadProgress');
            const loader = document.getElementById('loader');

            fileInput.disabled = true;
            fileLabel.style.pointerEvents = 'none';
            fileLabel.setAttribute('disable', 'true');
            uploadButton.disabled = true;
            loader.style.display = 'block';
            progressElement.hidden = false;


            
            
            
            const su = new SmashUploader({ region: "us-east-1", token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjgwOGJjMWViLTA3OTEtNGQ1OS04ZTMyLTU1ODBjZDdkYjM0YS1ldSIsInVzZXJuYW1lIjoiMDYyZGNiODUtMzI0Mi00YjY5LWE0NDYtYmJhN2M5N2QxMWI4IiwicmVnaW9uIjoidXMtZWFzdC0xIiwiaXAiOiIxODkuMzYuMjA1LjEzOCIsInNjb3BlIjoiTm9uZSIsImFjY291bnQiOiJmMTE4MjcxMC04N2QyLTQ1NmYtOTY5YS0xZTE1ODhhNzg5MjAtZWEiLCJpYXQiOjE3MjQxNTY5NTMsImV4cCI6NDg3OTkxNjk1M30.YVM41Xo0wT1neiAKUVLsHOted_hKYebcKh-syKjerN0" })

            try {
              const transfer = await su.upload({ files: [...fileInput.files]});
              console.log("transfer", transfer);
              progressElement.value = 100;
            }
            
            catch(error) {
              console.log("Error", error);
              progressElement.hidden = true;
            }

            finally{
            fileInput.disabled = false;
            fileLabel.style.pointerEvents = 'auto';
            fileLabel.setAttribute('disabled');
            uploadButton.disabled = false;
            loader.style.display = 'none';
            }

            su.on('progress', (event) => {
              const progressData = event.data && event.data.progress;

              if (progressData && progressData.percent !== undefined) {
                progressElement.value = progressData.percent;
                console.log("Progress", progressData.percent);
              } else {
                console.log("Deu erro");
              }
              
             })

            

            /* su.upload({ files: [...fileInput.files] })
                .then(transfer => {
                   console.log("Transfer", transfer);
                   progressElement.value = 100; 
                   })
                .catch(error => {
                   console.log("Error", error);                    
                   });

            // su.on('progress', (event) => { console.log(event.data.progress.percent); });

            su.on('progress', (event) => {
              const progressData = event.data && event.data.progress;

              if (progressData && progressData.percent !== undefined) {
                progressElement.value = progressData.percent;
                console.log("Progress", progressData.percent);
              } else {
                console.log("Deu erro");
              }
              
             })*/

        }