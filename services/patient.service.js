
export async function getPatients() {
       try {
              const response = await fetch("http://localhost:5000/api/patients/", {
                     method: 'GET',
                     mode: 'cors',
                     cache: 'no-cache',
                     headers: {
                            'Content-Type': 'application/json'
                     },
                     referrerPolicy: 'no-referrer',
                    
              })
       return response.json()
           


       } catch (error) {
              console.log(error);
       }
}
