export const useCurrentCompany = () => {
  const supabase = useSupabaseClient<Database>();

  const currentCompany =
    ref<Database["public"]["Tables"]["companies"]["Row"]>();

  const getCurrentCompany = async () => {
    const { data, error } = await supabase
      .from("companies")
      .select("*")
      .single();

    if (error) {
      throw error;
    }

    currentCompany.value = data;
  };

  getCurrentCompany();

  return {
    currentCompany,
  };
};
