export const postResults = async (data) => {
      const results = await fetch("https://sipeca.onrender.com/sipeca/simular",{
          headers:{
              "Content-Type" : "application/json"
          },
          body:JSON.stringify(data),
          method:"POST"
  })
  return await results.json()
};
