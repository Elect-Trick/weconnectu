  <script setup lang="ts">
  import { useId } from 'vue'
  defineEmits(['delete'])

  </script>

  <template>
  <div id="deleteUserModal" class="modal" tabindex="-1">
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
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button @click="$emit('delete')" data-bs-dismiss="modal" type="button"  class="btn btn-primary">Confrirm</button>
      </div>
    </div>
  </div>
</div>
  </template>

  <style>

  </style>
