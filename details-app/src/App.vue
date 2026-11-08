<script setup>
import DetailsForm from './DetailsForm.vue'
import { provide, ref, onMounted , inject, defineEmits} from 'vue'
import ListView from './ListView.vue';
import { useDetailsForm } from './composables/useDetailsForm.js';
import { useUsersService } from './composables/useUsersService.js';
const getItems = () => []
const items = ref(getItems())
const {createUser, fetchUsers, updateUser, deleteUser, loading, error, fieldErrors, users} = useUsersService()
provide('items', users)
const currentTab = ref('DetailsForm')

const tabs = {
  DetailsForm,
  ListView,
  Reports: {
    template: '<div class="home-tab"><h2>Welcome to the Home Tab</h2><p>This is the home tab content.</p></div>',
  },
}

onMounted(async ()=>{

  items.value = await fetchUsers()

})

function deleteItem(item) {
const i = items.value.indexOf(item)
  if (i > -1) {
    items.value.splice(i, 1)
  }
}

async function submitDetails({ values, resolve, reject }) {

  try{
    const user = await createUser(values)
    resolve(user)
    fetchUsers();

  } catch(e){
    reject(e)

  }   

}


async function updateDetails({selectedItem,resolve,reject}) {


  try {
    const updated = await updateUser(selectedItem,selectedItem.id)
    resolve(updated)
    
  } catch (error) {
    reject(error)
  }
  
}


  async function removeUser({id, resolve,reject}) {

    try {

      const deleted = await deleteUser(id)
      resolve(deleted)
    } catch (error) {
      reject(error)
      
    }
    
  }



</script>

<template class="no-overflow">
  <div class="p-2 col-12 col-sm-12 col-md-12 d-flex flex-column align-items-end">
<img src="https://cdn.prod.website-files.com/636b2011338aac3f165d2841/6ab24c6efcdaa41fde0fddaf_WCU%20Logo_HeaderFooter.png" sizes="200px" width="200" alt="">

  </div>

    <div class="tabs">
    <button
       v-for="(_, tab) in tabs"
       :key="tab"
       :class="['tab-button', { active: currentTab === tab }]"
       @click="currentTab = tab"
     >
      {{ tab }}
    </button>
    
    <KeepAlive >
	  <component  @updateUser="updateDetails" @deleteUser="removeUser" @submit="submitDetails" :is="tabs[currentTab]" class="tab"></component>
    </KeepAlive>
  </div>

  <div class="footer">
    <span>Challenge proudly facilitated by </span>
    <img src="https://cdn.prod.website-files.com/636b2011338aac3f165d2841/6ab24c6efcdaa41fde0fddaf_WCU%20Logo_HeaderFooter.png" sizes="200px" width="200" alt="">

  </div>
</template>

<style >


.tab-button {
  padding: 6px 10px;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  border: 1px solid #ccc;
  cursor: pointer;
  background: #f0f0f0;
}
.tab-button:hover {
  background: #e0e0e0;
}
.tab-button.active {
  background: #e0e0e0;
}
.tab {
  border: 1px solid #ccc;
  padding: 2rem;
  box-sizing: border-box
}

.tabs{
  display: flexbox;
  padding-top: 1rem;
  top:0;
  overflow-x: hidden;
}

.footer {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  /* padding: 2rem 0 0 2rem; */
}


</style>
