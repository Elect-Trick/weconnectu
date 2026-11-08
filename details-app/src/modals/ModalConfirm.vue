  <script setup lang="ts">
  import { useId } from 'vue'
  const emit = defineEmits(['update', 'checkForEdits'])
const props = defineProps<{ id: string }>()
 
  </script>

  <template>
  <div id="updateUserModal" class="modal" data-bs-backdrop="static" tabindex="-1">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <slot name="modal-title"></slot>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <slot name="modal-body"></slot>
      </div>
      <div class="modal-footer">
        <button  type="button" class="btn btn-secondary" data-bs-dismiss="modal" >Close</button>
        <button @click="emit('update')" data-bs-dismiss="modal" type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>
  </template>

  <style>
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
  </style>
<!-- @click="emit('checkForEdits')" -->