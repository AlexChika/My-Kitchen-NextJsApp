const fetcher = (...args) => fetch(...args).then((res) => res.json());
const handler = (promise) =>
  promise.then((data) => [data, null]).catch((error) => [error, null]);

export async function findMeals(food) {
  try {
    const data = await fetch(
      `https://themealdb.com/api/json/v1/1/search.php?s=${food}`
    );
    const meals = await data.json();
    return {
      meals,
      isError: null,
    };
  } catch {
    return {
      meals: null,
      isError: true,
    };
  }
}
export async function findMeal(id) {
  try {
    const data = await fetch(
      `https://themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    );
    const meal = await data.json();
    return {
      meal,
      isError: null,
    };
  } catch {
    return {
      meal: null,
      isError: true,
    };
  }
}
export async function findMealCategory(category) {
  try {
    const data = await fetch(
      `https://themealdb.com/api/json/v1/1/filter.php?c=${category}`
    );
    const meals = await data.json();
    return {
      meals,
      isError: null,
    };
  } catch {
    return {
      meals: null,
      isError: true,
    };
  }
}
export async function findMealArea(area) {
  try {
    const data = await fetch(
      `https://themealdb.com/api/json/v1/1/filter.php?a=${area}`
    );
    const meals = await data.json();
    return {
      meals,
      isError: null,
    };
  } catch {
    return {
      meals: null,
      isError: true,
    };
  }
}

// .........
// export function findMeals(food) {
//   const { data, error } = useSWR(
//     `https://themealdb.com/api/json/v1/1/search.php?s=${food}`,
//     fetcher
//   );
//   return {
//     meal: data,
//     isLoading: !error && !data,
//     isError: error,
//   };
// }
