export const useStoreInLocal1 = (token) => {
   return localStorage.setItem('AgentToken' , token)   
}

export const useStoreInLocal2 = (token) => {
   return localStorage.setItem('AdminToken' , token)   
}
