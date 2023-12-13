const isMatchPatternPath = (pathA: string, pathB: string) => {
  const partsA = pathA.split("/");
  const partsB = pathB.split("/");

  if (partsA.length !== partsB.length) return false;

  const isMatch = partsA.every((part: string, i: number) => {
    return part === partsB[i] || part.startsWith(":");
  });

  return isMatch;
};

export const useBreadcrumbs = () => {
  const router = useRouter();
  const route = useRoute();
  const routes = router.getRoutes();

  const HOMEPAGE = { name: "Home", path: "/", active: true };
  const breadcrumbs: Ref<Array<Breadcrumb>> = ref([HOMEPAGE]);

  function getBreadcrumbs(currRoute: string): any[] {
    if (currRoute === "" || currRoute === "/") return [HOMEPAGE];

    const paths = getBreadcrumbs(
      currRoute.slice(0, currRoute.lastIndexOf("/")),
    );

    const founds = routes.filter((r) => isMatchPatternPath(r.path, currRoute));

    const matchRoute =
      founds.length > 1 ? founds.find((r) => r.path === currRoute) : founds[0];

    paths[paths.length - 1].active = false;

    return [
      ...paths,
      {
        path: currRoute,
        name: capitalize(
          matchRoute?.name?.toString() || matchRoute?.path || currRoute,
        ),
        active: true,
      },
    ];
  }

  watch(
    () => ({
      path: route.path,
      name: route.name,
      meta: route.meta,
      matched: route.matched,
    }),
    (route) => {
      breadcrumbs.value = getBreadcrumbs(route.path);
    },
    {
      immediate: true,
    },
  );

  return {
    breadcrumbs,
  };
};
