<template>
    <div>    
  <div class="row sticky-top pt-2 pb-2">
  <div class="col-sm-6 d-flex flex-column align-items-end justify-content-center">
    <Transition name="fade" mode="out-in">
      <div v-if="isSubmitted" class="alert alert-success alert-dismissible" role="alert">
        User has been updated successfully
      </div>
    </Transition>

     <Transition name="fade" mode="out-in">
      <div v-if="isDeleted" class="alert alert-success alert-dismissible" role="alert">
        User has been marked as Deleted
      </div>
    </Transition>

     <Transition name="fade" mode="out-in">

      <div v-if="responseError" class="alert alert-danger alert-dismissible" role="alert">
        Oops, something went wrong. Please contact our support team.
      </div>
    </Transition>
   
  </div>

  <div class="col-sm-6 d-flex flex-column align-items-end text-end">
    <h2>Details List View</h2>
    <p class="mb-0">Filter, sort, and manage your details.</p>
  </div>
</div>
    
    <div class="row mb-3">
        <div class="col-sm-6 d-flex flex-row justify-content-between align-items-center gap-2">
          <input class="form-control" ref="searchInput"  v-model="searchQuery" name="serachInput"   placeholder="Search for a User" />
                    
    </div>
    </div>

<div class="row mb-3">
  <!-- User List card -->
  <div class="col-12 col-lg-6 mb-3 mb-lg-0">
    <div class="card">
      <div class="card-header">
        <span>User List</span>
      </div>
      <div class="card-body">
        <TransitionGroup name="list" tag="ul" class="list-view">
          <li
            v-for="item in filteredItems"
            :key="item.id"
            @click="selectItem(item)"
            :class="['list-item', { 'is-selected': selectedItem?.id === item.id }]"
          >
            {{ item.name }}
          </li>
        </TransitionGroup>
      </div>
    </div>
  </div>

    <div v-if="!selectedItem" class="col-12 col-lg-6 align-items-center">
    <div class="center no-item-selected">
      <img src="/searching.svg" width="300" alt="" />
            <p>No Item selected, simply search or pick from the list</p>

    </div>
  </div>

  <!-- User Breakdown card -->
  <div class="col-12 col-lg-6">
    <Transition name="list" mode="out-in">
      <div v-if="selectedItem" class="card">
        <div class="card-header flex-row justify-content-between align-items-center gap-2">
      <div class="row mb-3 d-flex align-items-center">
                <div class="col-sm-6 d-flex flex-row justify-content-start align-items-center gap-2">
                <span>User Breakdown</span>
                </div>
        <div class="col-sm-6 d-flex flex-row justify-content-end align-items-center  gap-2">
            <button   class="btn btn-primary" :disabled="!selectedItem"  data-bs-toggle="modal" data-bs-target="#updateUserModal">Edit</button>
        <button class="btn btn-warning" :disabled="!selectedItem"  data-bs-toggle="modal" data-bs-target="#deleteUserModal">Delete</button>

      </div>
      
    </div>

        </div>
        <div class="card-body">
          <div>
            <div class="user-image">
              <img src="/usericon.svg" width="50" alt="" />
            </div>
            
            <div class="row card-row">
              <div class="gap-2 col-sm-6 col-6 col-md-6 col-lg-6 d-flex flex-row">
<span class="fw-semibold">Status:</span>
  <span
    class="badge"
    :class="selectedItem.is_deleted ? 'text-bg-warning' : 'text-bg-success'"
    v-text="selectedItem.is_deleted ? 'Deactivated' : 'Active'"
  ></span>  
              </div>
                </div>

            <div class="row card-row">
              <div class="gap-2 col-sm-6 col-6 col-md-6 col-lg-6 d-flex flex-row">
              <span class="fw-semibold">Name:</span><span>{{ selectedItem.name }}</span>
              </div>
              <div class="gap-2 col-sm-6 col-6 col-md-6 col-lg-6 d-flex flex-row">
                 <span class="fw-semibold">Email:</span><span>{{ selectedItem.email }}</span>
              </div>
             
            </div>

            <div class="row mb-3">
              <div class="gap-2 col-sm-6 col-6 col-md-6 col-lg-6 d-flex flex-row">

              <span class="fw-semibold">Contact: </span><span class="d-flex justify-content-end">{{ selectedItem.contact_number }}</span>
              </div>

                <div class="gap-2 col-sm-6 col-6 col-md-6 col-lg-6 d-flex flex-row">
                <span class="fw-semibold">Gender: </span> <span>Male</span>
              </div>
              </div>

          </div>
        </div>
      </div>
    </Transition>
  </div>
  </div>
   <ModalConfirm  @update="updateDetails" id="updateUserModal">
            <template v-slot:modal-title>
                <h5>Editing {{selectedItem.name}}</h5>
            </template>
            <template v-slot:modal-body>

              <div class="mb-3">
                       <label  class="status-label">Status</label>
                      <div class="status-row form-check form-switch d-flex flex-row justify-content-start">
                        <input  v-model="isActive" class="form-check-input form-control" type="checkbox" role="switch" name="is_deleted" id="is_deleted">

                      <span
                        class="badge"
                        :class="selectedItem.is_deleted ? 'text-bg-warning' : 'text-bg-success'"
                        v-text="selectedItem.is_deleted ? 'Deactivated' : 'Active'"
                      ></span> 
                 </div>    
              </div>

  

                <Field  
    v-model="selectedItem.name"
    :validate-on-input="false"
    :validate-on-change="false"
    :validate-on-model-update="false"
    :validate-on-blur="true" 
    name="name" v-slot="{ field, errors, errorMessage, meta }"  v-bind="field"  type="text" placeholder="Jane Doe">
<div class="mb-3">
    <div class="d-flex align-items-center justify-content-between">  
     <label for="name" class="form-label mb-1">Full Name</label>     
         <Transition name="fade" mode="out-in">
                <span v-show="meta.touched && meta.validated && meta.valid" class="text-success">&#10003;</span>  
        </Transition>   
    </div>
          <input id="name" name="name" v-bind="field" type="text" class="form-control" placeholder="Jane Doe" aria-label="Client's Name">
          <Transition name="fade" mode="out-in">
             <span class="text-danger" v-if="(errors.length)">{{ errorMessage }}</span>
             </Transition>

                   </div>

      </Field>

<Field  
    v-model="selectedItem.email"
    :validate-on-input="false"
    :validate-on-change="false"
    :validate-on-model-update="false"
    :validate-on-blur="true" 
    name="email" v-slot="{ field, errors, errorMessage, meta }"  v-bind="field"  type="email" placeholder="jane@example.com">
<div class="mb-3">
    <div class="d-flex align-items-center justify-content-between">  
     <label for="email" class="form-label mb-1">Email</label>     
         <Transition name="fade" mode="out-in">
                <span v-show="meta.touched && meta.validated && meta.valid" class="text-success">&#10003;</span>  
        </Transition>   
    </div>
          <input v-bind="field" type="text" class="form-control" placeholder="jane@example.com" aria-label="Recipient’s username">
          <Transition name="fade" mode="out-in">
             <span class="text-danger" v-if="(errors.length)">{{ errorMessage }}</span>
             </Transition>
                   </div>

      </Field>


             <Field     
             v-model="selectedItem.contact_number"
    :validate-on-input="false"
    :validate-on-change="false"
    :validate-on-model-update="false"
    :validate-on-blur="true" 
    name="contact_number" v-slot="{ field, errors, errorMessage, meta }"  v-bind="field"  type="tel" placeholder="(+27) 123-4567">
                        <div class="mb-3">
                          <div class="d-flex align-items-center justify-content-between">
                          <label for="contact_number" class="form-label mb-1">Contact</label>
                           <Transition name="fade" mode="out-in">
                            <span v-show="meta.touched && meta.validated && meta.valid" class="text-success">&#10003;</span>
                          </Transition>
                      </div>

                      <input id="contact_number" name="contact_number" class="form-control"  v-bind="field" type="tel" placeholder="(+27) 123-4567"  aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"/>
         
                    <Transition name="fade" mode="in-out">
                      <span class="text-danger" v-if="(errors.length)">{{ errorMessage }}</span>
                    </Transition>
        </div>

      </Field>

                    
           <Field   
           v-model="selectedItem.message"  
    :validate-on-input="false"
    :validate-on-change="false"
    :validate-on-model-update="false"
    :validate-on-blur="true" 
    name="message" v-slot="{ field, errors, errorMessage, meta }"   type="tel" placeholder="(+27) 123-4567">
        <div class="mb-3">
            <div class="d-flex align-items-center justify-content-between">
              <label for="message" class="form-label mb-2">Message</label>
               <Transition name="fade" mode="out-in">
                 <span
                       v-if="meta.touched && meta.validated && meta.valid"
                        class="text-success">&#10003;</span>
               </Transition>
                </div>

            <textarea name="message" id="message" class="form-control" v-bind="field" type="tel" placeholder="Whats on your mind?" />
         

          <Transition name="fade" mode="out-in">
             <span class="text-danger" v-if="(errors.length)">{{ errorMessage }}</span>
             </Transition>
        </div>
      </Field>
            
    </template>
        </ModalConfirm>

        <DeleteConfirmModal @delete="deleteUser" id="deleteUserModal">
            <template v-slot:modal-title>
                              <h5>Delete {{selectedItem.name}}</h5>

            </template>
            <template v-slot:modal-body>
               <div  class="alert alert-warning alert-dismissible" role="alert">
                  Are you sure you want to delete this item? 
              </div>
            </template>
        </DeleteConfirmModal>
</div>

  
</template>

<script setup>
import { Field } from 'vee-validate';
import { computed, inject, ref, nextTick, onMounted } from 'vue'
import { defineEmits } from 'vue';
import ModalConfirm from './modals/ModalConfirm.vue';
import DeleteConfirmModal from './modals/DeleteConfirmModal.vue'

const items = inject('items');
const selectedItem = ref('')
const searchInput = ref(null) 
const searchQuery = ref('')    
const isSubmitted = ref(false)
const isDeleted = ref(false) 
const responseError = ref(false)
const isActive = computed({
  get: () => !selectedItem.value?.is_deleted,
  set: (value) => selectedItem.value.is_deleted = value ? 0: 1
})


const filteredItems = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()
  if (!query) return items.value
  return items.value.filter(item =>
    item.name.toLowerCase().includes(query)
  )
})

const emit = defineEmits(['updateUser', 'delete'])

function selectItem(item){
    selectedItem.value = item 


}

async function updateDetails() {

  selectedItem.value.is_deleted = isActive;

try {
    await new Promise((resolve, reject) => {
      emit('updateUser', { selectedItem: selectedItem.value, resolve, reject })
    })
    isSubmitted.value = true
    responseError.value = false

  } catch (err) {
      responseError.value = true

  } finally {
      setTimeout(() => {
      isSubmitted.value = false
      responseError.value = false;

      

    }, 3500)


}
}

async function deleteUser(id) {
  try {

    await new Promise((resolve,reject) => {
      emit('deleteUser', selectedItem.value)
      
    })
    isDeleted.value  = true;
      responseError.value = false;
    
  } catch (error) {
    isDeleted.value = false
    responseError.value = true
    
  }finally{
    setTimeout(() => {
      responseError.value = false
      isDeleted.value = false
      
      
    }, 3500);
  }

  
}



onMounted(async () => {
  items.value = items.value
  await nextTick()
  searchInput.value?.focus()
})

function toggleBadge(value){
  selectedItem.value.is_deleted = !value

}
</script>

<style >
.list-view {
  list-style: none;
  overflow-y: scroll;
  height: 400px; 

}

.list-item {
  padding: 0.75rem 1rem;
  border-bottom: 1px solid #e5e7eb;
  color: #111827;
  cursor: pointer;
    transition: background-color 0.4s ease;
}
.list-item:hover{
background-color: #f1f5f9;   
  color: #0f172a;
  box-shadow: inset 3px 0 0 #3b82f6;
}

.list-item:last-child {
  border-bottom: none;
}



.list-header {
  position: relative;
  align-items: end;
}

.list-header h2 {
  margin: 0 0 6px;
  font-size: 1.75rem;
  color: #111827;
}

.list-enter-active,
.list-leave-active,
.list-move {
  transition: all 0.4s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
.list-leave-active {
  position: absolute; 
}


.action-buttons{
    display: flex;
    flex-direction: column;
    gap: 1rem;
    flex-shrink: 0;
    padding: 1rem;
    box-shadow: 0 0 24px rgba(35, 64, 148, 0.15);

}
.field-row {

  gap: 8rem;
  margin-bottom: 16px;
}


.filter{
    display: flex;

align-content: end;  
align-items: center;
position: relative;
  border: 2px solid #111827 ;
}

label {
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-weight: 600;
  color: #374151;
}

input,
textarea {
  width: 100%;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  padding: 10px 12px;
  color: #111827;
  background: #fff;
  box-sizing: border-box;
}

input:focus,
textarea:focus {
  outline: 2px solid rgba(59, 130, 246, 0.2);
  border-color: #3b82f6;
}

.list-item.is-selected {
  background-color: #dbeafe; 
}
.user-card{
    display: grid;
    grid-template-columns: 2fr 2fr;
    border-left: 1px solid black;
}

.card-label{
  gap: 1rem;
}

.user-image {
    border-radius: 360px;
    border:1px solid black;
    width: 50px;
    margin-bottom: 1rem;
}
.no-item-selected {
    position: relative;
    align-self: center;
}
.success {
    color: #16a34a;
}
.fade-enter-active,
.fade-leave-active,
.fade-move {
  transition: all 0.4s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
.fade-leave-active {
  position: relative; 
}

.card-row
{
  margin-bottom: 0.5rem;
}

.status-row {
  gap: 2rem;
}
.status-label {
  margin: 0;
  padding: 0;
  display: flex;
}

</style>
