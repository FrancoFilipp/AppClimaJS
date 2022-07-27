let datos = 'HELLO WORD'

function get_datos(a){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
        if(a == "a") {resolve(datos)}
        else {reject(new Error("ERROR NOSE PUEDE '" + a + "' no es 'a'"))}
        }, 1000)
    })
} 

async function recive_data(r){
    try{
        // await solo funciona con async afuera
        let espera = await get_datos(r) 
        console.log("primera forma : " + espera) 
    }
    catch(err){
        console.log("primera forma : " + err.message)
    }
}    

recive_data("a")

get_datos("b")
    .then(dato =>  console.log("segunda forma : " + dato))
    .catch(err => console.log("segunda forma : " + err.message))
