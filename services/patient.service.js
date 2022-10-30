
export async function getPatients() {
       try {
              const response = await fetch("https://medicalserverh.herokuapp.com/api/patients/", {
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
