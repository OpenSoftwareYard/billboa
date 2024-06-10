<template>
  <div class="row" id="cancel-row">
    <div
      class="col-xl-12 col-lg-12 col-sm-12 layout-top-spacing layout-spacing"
    >
      <div class="statbox widget box box-shadow">
        <div class="widget-content widget-content-area br-8">
          <DataTable
            :data="products"
            :columns="[
              { name: 'name', label: 'Name' },
              { name: 'description', label: 'Description' },
              {
                name: 'price',
                label: 'Price',
                transform: (value) => value / 100,
              },
              { name: 'currency', label: 'Currency' },
            ]"
            :idColumn="{ name: 'id', label: 'Record no.' }"
            :newEntry="{ route: '/products/create', label: 'New product' }"
            @rowClicked="navigateToProduct"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const supabase = useSupabaseClient<Database>();
const router = useRouter();

definePageMeta({
  middleware: ["auth", "has-company"],
});

const { data: products } = await useAsyncData("products", async () => {
  const { data } = await supabase.from("products").select("*");
  return data;
});

async function navigateToProduct(productId: string) {
  await router.push(`/products/${productId}`);
}
</script>
