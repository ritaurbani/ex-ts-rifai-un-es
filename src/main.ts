//ESECUZIONE
//Type guards personalizzati 

//gestisco fetch usando gnerics con funzione di appoggio asincrona




type chefBirthday = {
  birthday: string
}

async function getChefBirthday(id: number): Promise<chefBirthday | null> {
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
  return chef.birthDate
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

