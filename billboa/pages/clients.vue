<template>
  <div class="row" id="cancel-row">
    <div
      class="col-xl-12 col-lg-12 col-sm-12 layout-top-spacing layout-spacing"
    >
      <div class="statbox widget box box-shadow">
        <div class="widget-content widget-content-area br-8">
          <div
            class="dataTables_wrapper container-fluid dt-bootstrap4 no-footer"
          >
            <div class="dt--top-section">
              <div class="row">
                <div
                  class="col-12 col-sm-6 d-flex justify-content-sm-start justify-content-center"
                ></div>
                <div
                  class="col-12 col-sm-6 d-flex justify-content-sm-end justify-content-center mt-sm-0 mt-3"
                >
                  <button class="btn btn-primary mb-2">
                    <Icon name="dashicons:plus-alt2" /><span
                      class="btn-text-inner"
                      >New client</span
                    >
                  </button>
                </div>
              </div>
            </div>
            <div class="table-responsive">
              <table
                class="table table-hover table-bordered"
                style="width: 100%"
              >
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
  </div>
</template>

<script setup lang="ts">
const supabase = useSupabaseClient<Database>();

const { data: clients } = await useAsyncData("clients", async () => {
  const { data } = await supabase.from("clients").select("*");
  return data;
});
</script>
