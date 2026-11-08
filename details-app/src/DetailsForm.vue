<template>
  <form class="details-form form-group form-group-sm" @submit="('onSubmit',form)">
    <div class="form-header">
    <div class="header-wrapper">
      <h2>Details</h2>
      <Transition name="fade" mode="out-in">
            <span v-if="isSubmitted" class="alert alert-success alert-dismissible"">User Added Successfully</span>
            </Transition>

        <Transition name="fade" mode="out-in">
        <span v-if="responseError" class="alert alert-danger alert-dismissible">Something went wrong. Please contact our support team</span>

        </Transition>
                </div>

      <h5>Tell us a little more about yourself.</h5>
    </div>

    
    <div class="row mb-3">
        <div class="col-6 col-sm-12 col-md-4 d-flex flex-column justtify">
<Field     :validate-on-input="false"
  :validate-on-change="false"
  :validate-on-model-update="false"
  :validate-on-blur="true" 
  name="name" v-slot="{ field, errors, errorMessage, meta }"  v-bind="field"  type="text" placeholder="Jane Doe">
          <span class="d-flex mb-2">Full name</span>
          <div class="d-flex input-group input-group-sm mb-3 gap-2">
            <input class="form-control mb-0"  v-bind="field" type="text" placeholder="Jane Doe" />
          <Transition name="fade" mode="out-in">
          <span v-show="meta.touched && meta.validated && meta.valid" class="text-sucess">&#10003;</span>
        </Transition>
          </div>
          <Transition name="fade" mode="out-in">
             <span class="text-danger error-label mb-2" v-if="(errors.length)">{{ errorMessage }}</span>
             </Transition>
      </Field>

     
        </div>
                <div class="col-6 col-sm-12 col-md-4 d-flex flex-column justtify">

 <Field  
    :validate-on-input="false"
    :validate-on-change="false"
    :validate-on-model-update="false"
    :validate-on-blur="true" 
    name="email" v-slot="{ field, errors, errorMessage, meta }"  v-bind="field"  type="email" placeholder="jane@example.com">
          <span class="d-flex mb-2">Email</span>
          <div class="d-flex input-group input-group-sm mb-3 gap-2">
              <input v-bind="field" type="text" class="form-control" placeholder="jane@example.com" aria-label="Recipient’s username" aria-describedby="basic-addon2">

            <Transition name="fade" mode="out-in">
          <span v-show="meta.touched && meta.validated && meta.valid" class="text-sucess">&#10003;</span>
        </Transition>
          </div>
           <Transition name="fade" mode="out-in">
             <span class="text-danger error-label mb-2" v-if="(errors.length)">{{ errorMessage }}</span>
             </Transition>
         
      </Field>
                </div>

    </div>

    <div class="row mb-3">
    <div class="col-6 col-sm-12 col-md-4 d-flex flex-column justtify">


      <Field     
    :validate-on-input="false"
    :validate-on-change="false"
    :validate-on-model-update="false"
    :validate-on-blur="true" 
    name="contact_number" v-slot="{ field, errors, errorMessage, meta }"  v-bind="field"  type="tel" placeholder="(+27) 123-4567">
                       <span class="d-flex mb-2">Contact Number</span>

          <div class="d-flex input-group input-group-sm mb-1 gap-2">
            <input name="contact_number" class="form-control mb-0"  v-bind="field" type="tel" placeholder="(+27) 123-4567"  aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"/>
          <Transition name="fade" mode="out-in">
          <span v-show="meta.touched && meta.validated && meta.valid" class="text-sucess">&#10003;</span>
        </Transition>
          </div>
          <Transition name="fade" mode="out-in">
             <span class="text-danger error-label" v-if="(errors.length)">{{ errorMessage }}</span>
             </Transition>
      </Field>
      </div>
    </div>

<div class="row">
    <div class="col-12 col-sm-12 col-md-4 d-flex flex-column justtify">

      <Field     
    :validate-on-input="false"
    :validate-on-change="false"
    :validate-on-model-update="false"
    :validate-on-blur="true" 
    name="message" v-slot="{ field, errors, errorMessage, meta }"  v-bind="field"  type="tel" placeholder="(+27) 123-4567">
      <span>Message</span>
          <div class="d-flex input-group mb-1 gap-2">
            <textarea  class="form-control mb-0" v-bind="field" type="tel" placeholder="Whats on your mind?" />
          <Transition name="fade" mode="out-in">
          <span v-show="meta.touched && meta.validated && meta.valid" class="text-sucess">&#10003;</span>
        </Transition>
    </div>
          <Transition name="fade" mode="out-in">
             <span class="text-danger error-label mb-1" v-if="(errors.length)">{{ errorMessage }}</span>
             </Transition>
      </Field>
      </div>


    </div>
<div class="actions">
      <button type="button" class="btn btn-secondary" @click="resetForm">Reset</button>
      <button @click="onSubmit"  type="button"  class="btn btn-primary">Save details</button>
    </div> 

  </form>



</template>

<script setup>
import { ref } from 'vue';
import {Field} from 'vee-validate'
import { useDetailsForm } from './composables/useDetailsForm'
import { defineEmits } from 'vue'

const props = defineProps({
    onSubmit : {type: Function, required: true}
})
const emit = defineEmits(['submit'])
const {handleSubmit, resetForm} = useDetailsForm()
const isSubmitted = ref(false)
const responseError = ref(false)
const onSubmit = handleSubmit(async (values) => {

  try {
    await new Promise((resolve, reject) => {
      emit('submit', { values, resolve, reject })
    })
    isSubmitted.value = true
    responseError.value= false;
  } catch (err) {
    responseError.value = true;

  } finally {
    resetForm()
    setTimeout(() => {
      isSubmitted.value = false
      responseError.value = false
    }, 5000)
  }
})


</script>

<style scoped>

.error { color:red; font-size: 0.75rem; display: block; padding: 0; margin: 0; }
.details-form {
  max-width: auto;
  padding: 2rem;
  border: 1px solid #e5e7eb;
  background: #ffffff;
  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.06);
}

.form-header {
  margin-bottom: 2rem;
}

.form-header h2 {
  margin: 0 0 6px;
  font-size: 1.75rem;
  color: #111827;
}

.form-header p {
  margin: 0;
  color: #6b7280;
}

.field-row {
  /* display: grid; */
  /* grid-template-columns: repeat(2, minmax(0, 1fr)); */
  /* gap: 16px; */
  /* margin-bottom: 16px; */
}

.error-label {
  font-size: small;
  margin-top: 0;
}



/* input,
textarea {
  width: 100%;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  padding: 10px 12px;
  color: #111827;
  background: #fff;
  box-sizing: border-box;
} */

input:focus,
textarea:focus {
  outline: 2px solid rgba(59, 130, 246, 0.2);
  border-color: #3b82f6;
}

textarea {
  resize: vertical;
  min-height: 120px;
}

.actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 24px;
}


@media (max-width: 640px) {
  .field-row {
    grid-template-columns: 1fr;
  }

  .actions {
    flex-direction: column-reverse;
  }


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
  position: relative; /* lets the remaining items slide up smoothly */
}
.input-wrapper  {
  display: flex;
}



input[data-valid="true"] {
  border-color: #16a34a;
}

input[aria-invalid="true"] {
  border-color: #dc2626;
}


.header-wrapper {
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: center;
}




</style>
