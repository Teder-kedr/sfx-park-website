import { Sound } from "~/utils/types";

export const useFilteredList = (items: Ref<Sound[]>) => {
  const tags = computed(() => {
    const resultSet = items.value.reduce((acc, item) => {
      item.tags.forEach((tag) => {
        acc.add(tag);
      });
      return acc;
    }, new Set());
    return [...resultSet];
  });

  const searchField = ref("");
  const tagsFilter: Ref<string[]> = ref([]);

  const filteredItems = computed(() => {
    if (!searchField.value && (tagsFilter.value === null || !tagsFilter.value.length)) return items.value;

    if (!searchField.value)
      return items.value.filter((item) => tagsFilter.value.every((tag) => item.tags.includes(tag)));

    if (tagsFilter.value === null || !tagsFilter.value.length)
      return items.value.filter((item) => item.title.toLowerCase().includes(searchField.value));

    return items.value.filter(
      (item) =>
        item.title.toLowerCase().includes(searchField.value) && tagsFilter.value.every((tag) => item.tags.includes(tag))
    );
  });

  return { tags, searchField, tagsFilter, filteredItems };
};
