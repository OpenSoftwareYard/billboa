<template>
  <div class="layout-px-spacing">
    <div class="middle-content container-xxl p-0">
      <div class="row" id="cancel-row">
        <div class="col-xl-12 col-lg-12 col-sm-12 layout-top-spacing layout-spacing">
          <div class="widget-content widget-content-area br-8">
            <table class="table dt-table-hover" style="width:100%">
              <thead>
                <tr>
                  <th class="checkbox-column">Record no.</th>
                  <th>Name</th>
                  <th>Country</th>
                  <th>Company number</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="client in clients">
                  <td class="checkbox-column">{{ client.id }}</td>
                  <td>{{ client.name }}</td>
                  <td>{{ client.country }}</td>
                  <td>{{ client.company_number }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const supabase = useSupabaseClient<Database>();

const { data: clients } = await useAsyncData('clients', async () => {
  const { data } = await supabase.from('clients').select('*');
  return data;
});

</script>