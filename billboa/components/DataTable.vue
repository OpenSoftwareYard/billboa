<template>
  <div class="dataTables_wrapper container-fluid dt-bootstrap4 no-footer">
    <div class="dt--top-section">
      <div class="row">
        <div
          class="col-12 col-sm-6 d-flex justify-content-sm-start justify-content-center"
        ></div>
        <div
          class="col-12 col-sm-6 d-flex justify-content-sm-end justify-content-center mt-sm-0 mt-3"
        >
          <NuxtLink :to="newEntry.route">
            <button class="btn btn-primary mb-2">
              <Icon name="dashicons:plus-alt2" /><span class="btn-text-inner">{{
                newEntry.label
              }}</span>
            </button>
          </NuxtLink>
        </div>
      </div>
    </div>
    <div class="table-responsive">
      <table class="table table-hover table-bordered" style="width: 100%">
        <thead>
          <tr>
            <th class="checkbox-column">{{ idColumn.label }}</th>
            <th v-for="column in columns">{{ column.label }}</th>
            <th v-if="actions">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="entry in data"
            @click="emit('rowClicked', valueForKey(entry, idColumn.name))"
          >
            <td class="checkbox-column">
              {{ valueForKey(entry, idColumn.name) }}
            </td>
            <td v-for="column in columns">
              {{ valueForKey(entry, column.name) }}
            </td>
            <td class="text-center" @click.stop v-if="actions">
              <div class="btn-group" role="group">
                <button
                  id="btndefault"
                  type="button"
                  class="btn btn-outline-primary btn-icon dropdown-toggle"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <Icon name="dashicons:arrow-down-alt2" />
                </button>
                <div class="dropdown-menu" aria-labelledby="btndefault">
                  <a
                    class="dropdown-item"
                    v-for="action in actions"
                    @click="action.action(valueForKey(entry, idColumn.name))"
                    ><Icon :name="action.icon" v-if="action.icon" />
                    {{ action.label }}</a
                  >
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  data: any[] | null;
  columns: {
    name: string;
    label: string;
  }[];
  idColumn: {
    name: string;
    label: string;
  };
  newEntry: {
    route: string;
    label: string;
  };
  actions?: {
    label: string;
    icon?: string;
    action: (id: string) => void;
  }[];
}>();

const emit = defineEmits<{
  (e: "rowClicked", id: string): void;
}>();
</script>
