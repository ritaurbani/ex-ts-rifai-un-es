//ESECUZIONE
//Type guards personalizzati "is" is chefBirthday

//gestisco fetch usando gnerics con funzione di appoggio asincrona - RITORNA BOOLEANO
//type guard verifico se oggetto sconosciuto rispetta struttura del tipo chefBirthday
//check esistenza proprieta
//tipo corrispondente a quello dichiarato
//RITORNA BOOLEANO che conferma che result e effettivamente il valore atteso

function isChef(dati:unknown): dati is ChefType{//controllo se dati rispecchia type chefBirthday
  
  if(dati &&
    typeof dati === "object" &&
    dati !== null &&
      // "id" in chef &&
      // typeof chef.id === "number" &&
    "birthDate" in dati &&
    typeof dati.birthDate === "string"
  ) {
    return true
  }
  return false
}


type ChefType = {
  // id: number
  birthDate: string
}

async function getChefBirthday(id: number): Promise<ChefType | null> {
  try{
    const response = await fetch(`https://dummyjson.com/recipes/${id}`)
  const recipes = await response.json();
  console.log(recipes)//vedo a ceh punto sono
  const user = await fetch(`https://dummyjson.com/users/${recipes.userId}`)
  const chef = await user.json()
  //json ci ritorna come promessa qualcosa che risolve un any (dati:any) con unknown non funziona
  //quindi type narrowing per confermare che dati ricevuti siano effettivamente type chefBirthday
  //gestisco fetch usando gnerics con funzione di appoggio asincrona
  console.log(chef)
  // return {...recipes, chef} //ritorna promise che risolve quel valore
  if(!isChef(chef)){
    throw new Error("formato type chef non valido")
  }
   return chef.birthDate
}catch(errore){
  if(errore instanceof Error){
    console.error("errore durante recupero dati:", errore.message)
  } else {
    console.error("errore sconosciuto", errore)
  }
  return null
}
}
//INVOCAZIONI

getChefBirthday(1)
.then(birthday => console.log("Data di nascita dello chef:", birthday))
.catch(error => console.error("Errore:", error.message));

// (async () => {
//   try {
//     const birthday = await getChefBirthday(1)
//     console.log("Data di nascita dello chef:", birthday)
//   } catch (error) {
//     console.error("Errore:", error.message)
//   }
//   console.log("Fine!")//lo vediamo perche abbiamo gestito bene
// })()

