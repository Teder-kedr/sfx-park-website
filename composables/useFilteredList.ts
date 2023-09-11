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

  const SORTING_METHODS = [
    {
      text: "Most Viewed",
      method: "mostviewed",
    },
    {
      text: "Most Liked",
      method: "mostliked",
    },
    {
      text: "Shortest",
      method: "lengthup",
    },
    {
      text: "Longest",
      method: "lengthdown",
    },
  ];

  const sortBy: Ref<string> = ref("mostviewed");

  const sortingFunctions = {
    lengthup: (a: Sound, b: Sound) => {
      if (a.duration < b.duration) return -1;
      return 1;
    },
    lengthdown: (a: Sound, b: Sound) => {
      if (a.duration > b.duration) return -1;
      return 1;
    },
    mostviewed: (a: Sound, b: Sound) => b.views - a.views,
    mostliked: (a: Sound, b: Sound) => b.likes - a.likes,
  };

  const sortedFilteredItems = computed(() => {
    const key = sortBy.value as "lengthup" | "lengthdown" | "mostviewed" | "mostliked";
    const result = [...filteredItems.value].sort(sortingFunctions[key]);
    return result;
  });

  return { tags, searchField, tagsFilter, SORTING_METHODS, sortBy, sortedFilteredItems };
};
