import linearSearch from "./linearSearch";

const algorithmRegistry = {
  LS: {
    name: "Linear Search",
    category: "searching",
    algorithm: linearSearch,

    code: `vector<int> linearSearch(vector<int> arr, int target) {
    vector<int> result;

    for (int i = 0; i < arr.size(); i++) {
        if (arr[i] == target) {
            result.push_back(i);
            return result;
        }
    }

    return result;
}`,

    inputs: {
      array: true,
      target: true,
    },

    complexity: {
      best: "O(1)",
      average: "O(n)",
      worst: "O(n)",
      space: "O(1)",
    },
  },
};

export default algorithmRegistry;
