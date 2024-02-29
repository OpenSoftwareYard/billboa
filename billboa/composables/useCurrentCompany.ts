export const useCurrentCompany = async () => {
  const supabase = useSupabaseClient<Database>();

  const currentCompany = ref<
    Database["public"]["Tables"]["companies"]["Row"] | null
  >();

  const { data } = await useAsyncData("companies", async () => {
    const { data, error } = await supabase
      .from("companies")
      .select("*")
      .single();

    if (error) {
      throw error;
    }

    return data;
  });

  currentCompany.value = data.value;

  return {
    currentCompany,
  };
};
