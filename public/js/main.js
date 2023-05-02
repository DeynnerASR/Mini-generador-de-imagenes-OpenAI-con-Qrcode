(() =>{
    const qr = document.getElementById('qrcode');


    function onSubmit(e){
        e.preventDefault();

        document.querySelector('.msg').textContent = '';
        document.querySelector('.msg').src= '';

        const prompt = document.querySelector('#prompt').value;
        const size = document.querySelector('#size').value;

        if(prompt === ''){
            alert('PORFAVOR ESCRIBE UNA DESCRIPCION DE TU IMAGEN');
            return
        }

        generateImageRequest(prompt,size);
    }
    async function generateImageRequest(prompt,size){
       
        try {
            showSpinner();

            const response = await fetch('/openai/generateimage',{
                method : 'POST',
                headers : {
                    'Content-Type': 'application/json'
                } ,
                body: JSON.stringify({
                    prompt,
                    size
                })
            });

            if(!response.ok){
                removeSpinner();
                throw new Error('LA IMAGEN NO PUDO SER GENERADA');
            }

            const data = await response.json();
            
            const imageUrl = data.data;

            document.querySelector('#image').src = imageUrl;
            qr.innerHTML = '';
            removeSpinner();

        } catch (error) {
            document.querySelector('.msg').textContent = error;
        }
    }

    function showSpinner(){
        document.querySelector('.spinner').classList.add('show');
    }
    function removeSpinner(){
        document.querySelector('.spinner').classList.remove('show');
    }

    document.querySelector('.crearCodigo').addEventListener('click', (e)=>{      
        e.preventDefault();
        const urlImagen = document.querySelector('#image').src;         
        qr.innerHTML = '';
        generateQRCode(urlImagen);
        const saveUrl = qr.querySelector('img').src;
        console.log(urlImagen);        
    })

    const generateQRCode = (url) => {
        const qrcode = new QRCode(qr, {
          text: url,
          width: 300,
          height: 300,
        });
      };


    document.querySelector('#image-form').addEventListener('submit', onSubmit);
})()