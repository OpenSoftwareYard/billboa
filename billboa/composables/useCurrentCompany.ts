export const useCurrentCompany = async () => {
  const supabase = useSupabaseClient<Database>();

  const currentCompany = ref<
    Database["public"]["Tables"]["companies"]["Row"] | null
  >();

  const { data } = await useAsyncData("companies", async () => {
    const { data, error } = await supabase
      .from("companies")
      .select("*")
      .maybeSingle();

    currentCompany.value = data;

    return data;
  });

  return {
    currentCompany,
  };
};
