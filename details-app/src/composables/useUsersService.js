import { ref } from "vue";
 const BASE_URL = import.meta.env.VITE_API_BASE_URL;
export function useUsersService(){
    const users = ref([])

    const loading     = ref(false)
    const error       = ref(null)   
    const fieldErrors = ref({})     
    const created     = ref(null)

    async function createUser(payload) {
        try {
             const response = await fetch(`${BASE_URL}/add-user`,{method: 'POST', body: JSON.stringify(payload),headers: []} )
            const body = await response.json()
             
            if(!response.ok){
                const err = new Error(body?.error ?? `Request failed with status ${response.status})`)
                err.status = response.status
                err.errors = body?.errors ?? {}
                throw err
            }
            created.value = body
            return body


        } catch (e) {
             error.value = e.message
             fieldErrors.value = e.errors ?? {}
            throw e
            
        }finally{
            loading.value = false
        }


        
    }

    async function fetchUsers(){
        try {
             const response = await fetch(`${BASE_URL}/users`,{method: 'GET',headers: []} )
            let body = await response.json()
             
            if(!response.ok){
                const err = new Error(body?.error ?? `Request failed with status ${response.status})`)
                err.status = response.status
                err.errors = body?.errors ?? {}
                throw err
            }
            users.value = body
            


        } catch (e) {
             error.value = e.message
             fieldErrors.value = e.errors ?? {}
            throw e
            
        }finally{
            loading.value = false
        }

    }

    async function updateUser(payload, id){

        try {
            const response = await fetch(`${BASE_URL}/user/${id}`,{method: 'PUT',body: JSON.stringify(payload), headers: { 'Content-Type': 'application/json' }})
            const body = await response.json()
            if (!response.ok){

                const err = new Error(body?.error ?? `Request failed with status ${response.status})`)
                err.status = response.status
                err.errors = body?.errors ?? {}
                throw err

            }
            return body;

            
        } catch (e) {

             error.value = e.message
             fieldErrors.value = e.errors ?? {}
        }
        finally{
            loading.value = false
        }

    }

    async function deleteUser(id) {

        try {

        const response = await fetch(`${BASE_URL}/user/${id}`, {method: "DELETE", headers: { 'Content-Type': 'application/json' }})
        const body = await response.json()

        if(!response.ok){
               const err = new Error(body?.error ?? `Request failed with status ${response.status})`)
                err.status = response.status
                err.errors = body?.errors ?? {}
                throw err
        }

        return body;
            
        } catch (error) {
            
        }

    }

    return {createUser, fetchUsers, updateUser, deleteUser,  loading, error,fieldErrors, created, users }
}