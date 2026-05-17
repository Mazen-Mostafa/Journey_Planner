import egyptData from "../../data/Egypt.json";
import placesData from "../../data/placesData.json";
import thingsTodoData from "../../data/ThingsTodoData.json";
import { PLACEHOLDER_IMAGE } from "../constants/images";

const USER_PLANS_KEY = "journey-plan-user-plans";
const GENERATED_PLANS_KEY = "journey-plan-generated-plans";

const placesImageByName = Object.fromEntries(
  placesData.cities.map((city) => [city.name.toLowerCase(), city.img])
);

/** Egypt.json city names that differ from placesData.json */
const CITY_IMAGE_ALIASES = {
  "new capital": "cairo",
  dakahlia: "damietta",
  "the red sea": "hurghada",
  beheira: "alexandria",
  fayoum: "faiyum",
  assiut: "cairo",
  "bani suef": "beni suef",
  sohag: "sohag",
  "north sinai": "el-arish",
};

function pickHttpImage(url, fallback) {
  if (typeof url === "string" && url.startsWith("http")) {
    return url;
  }
  return fallback;
}

export function resolveCityImageUrl(cityName) {
  const key = cityName?.toLowerCase()?.trim();
  if (!key) return PLACEHOLDER_IMAGE;

  const direct = placesImageByName[key];
  if (direct?.startsWith("http")) return direct;

  const aliasKey = CITY_IMAGE_ALIASES[key];
  if (aliasKey) {
    const aliasImage = placesImageByName[aliasKey];
    if (aliasImage?.startsWith("http")) return aliasImage;
  }

  return PLACEHOLDER_IMAGE;
}

function enrichPlace(place, cityImg) {
  const fallback = cityImg || PLACEHOLDER_IMAGE;
  const image = pickHttpImage(place.image, fallback);

  let collectionImages = (place["collection-images"] || [])
    .map((item) => pickHttpImage(item, fallback))
    .filter((item, index, array) => item && array.indexOf(item) === index);

  if (!collectionImages.length) {
    collectionImages = [image];
  }

  return {
    ...place,
    image,
    "collection-images": collectionImages,
  };
}

const enrichCity = (city) => {
  const cityImg = resolveCityImageUrl(city.name);

  return {
    ...city,
    img: cityImg,
    places: (city.places || []).map((place) => enrichPlace(place, cityImg)),
  };
};

export const cities = egyptData.cities.map(enrichCity);

export function getAllCities() {
  return cities;
}

export function getCityById(id) {
  if (!id) return null;
  const normalized = String(id).toLowerCase();
  return cities.find((city) => city.id?.toLowerCase() === normalized) ?? null;
}

export function getTodoItems() {
  return thingsTodoData.todo ?? [];
}

const DAY_NAMES = [
  "saturday",
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
];

function getDaysInRange(workDays) {
  if (!workDays?.from || !workDays?.to) return [...DAY_NAMES];

  const from = workDays.from.toLowerCase();
  const to = workDays.to.toLowerCase();
  const startIndex = DAY_NAMES.indexOf(from);
  const endIndex = DAY_NAMES.indexOf(to);

  if (startIndex === -1 || endIndex === -1) return [...DAY_NAMES];
  if (startIndex <= endIndex) return DAY_NAMES.slice(startIndex, endIndex + 1);
  return DAY_NAMES.slice(startIndex).concat(DAY_NAMES.slice(0, endIndex + 1));
}

function normalizeCategory(category = "") {
  return category.toLowerCase().replace(/\s+/g, " ").trim();
}

function placeMatchesCategories(place, categories) {
  if (!categories.length) return true;
  const placeCategory = normalizeCategory(place.category);
  return categories.some((category) => placeCategory.includes(category));
}

function getPlaceCoordinates(place) {
  return {
    latitude: place.location?.latitude ?? place.latitude,
    longitude: place.location?.longitude ?? place.longitude,
  };
}

function sortPlacesByDistance(places) {
  const validPlaces = places.filter((place) => {
    const { latitude, longitude } = getPlaceCoordinates(place);
    return latitude != null && longitude != null;
  });

  if (validPlaces.length === 0) return places;

  const travelPlan = [];
  const unvisited = new Set(validPlaces);
  let currentPlace = validPlaces[0];
  travelPlan.push(currentPlace);
  unvisited.delete(currentPlace);

  while (unvisited.size > 0) {
    let nearestPlace = null;
    let nearestDistance = Infinity;
    const currentCoords = getPlaceCoordinates(currentPlace);

    unvisited.forEach((place) => {
      const coords = getPlaceCoordinates(place);
      const distance = getDistance(
        currentCoords.latitude,
        currentCoords.longitude,
        coords.latitude,
        coords.longitude
      );
      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearestPlace = place;
      }
    });

    if (!nearestPlace) break;
    travelPlan.push(nearestPlace);
    unvisited.delete(nearestPlace);
    currentPlace = nearestPlace;
  }

  return travelPlan;
}

function getDistance(lat1, lon1, lat2, lon2) {
  const R = 6371e3;
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}

export function buildTravelPlan(cityName, numberOfDays, categories = []) {
  const city = cities.find(
    (entry) => entry.name.toLowerCase() === cityName.toLowerCase()
  );

  if (!city?.places?.length) return null;

  let places = city.places.filter((place) =>
    placeMatchesCategories(place, categories)
  );

  if (!places.length) {
    places = [...city.places];
  }

  places = sortPlacesByDistance(places);

  const days = Array.from({ length: numberOfDays }, (_, i) => `Day ${i + 1}`);
  const travelDays = [];
  const assignedPlaceNames = new Set();

  days.forEach((dayName, dayIndex) => {
    const dailyPlan = [];
    const usedCategories = new Set();

    for (const place of places) {
      if (dailyPlan.length >= 3) break;
      if (assignedPlaceNames.has(place.name)) continue;

      const category = normalizeCategory(place.category);
      if (category.includes("coastal") && usedCategories.has("coastal")) {
        continue;
      }

      const openDays = getDaysInRange(place["work-days"]);
      const dayOfWeek = DAY_NAMES[dayIndex % DAY_NAMES.length];
      if (!openDays.includes(dayOfWeek) && openDays.length < 7) {
        continue;
      }

      dailyPlan.push(place.name);
      usedCategories.add(category);
      assignedPlaceNames.add(place.name);
    }

    travelDays.push({ dayName, places: dailyPlan });
  });

  const planId = `${city.id}-${numberOfDays}d`.toLowerCase();

  return {
    id: planId,
    city: city.name,
    numberOfDays,
    days,
    categories,
    travelDays,
  };
}

const travelPlans = [];

cities.forEach((city) => {
  for (let days = 1; days <= 7; days += 1) {
    const plan = buildTravelPlan(city.name, days, []);
    if (plan) travelPlans.push(plan);
  }
});

export function getTravelPlans() {
  return travelPlans;
}

export function getTravelPlanById(id) {
  if (!id) return null;
  const normalized = String(id).toLowerCase();
  return (
    travelPlans.find((plan) => plan.id.toLowerCase() === normalized) ?? null
  );
}

function readGeneratedPlans() {
  try {
    const stored = localStorage.getItem(GENERATED_PLANS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function saveGeneratedPlan(plan) {
  const plans = readGeneratedPlans();
  plans.unshift(plan);
  localStorage.setItem(GENERATED_PLANS_KEY, JSON.stringify(plans));
}

export function getPlanById(id) {
  if (!id) return null;

  return (
    getTravelPlanById(id) ??
    readGeneratedPlans().find((plan) => plan.id === id) ??
    getUserPlans().find((plan) => plan.id === id) ??
    null
  );
}

export function filterTravelPlans({ numDays, categories = [], city = "" }) {
  if (categories.length > 0 && city && numDays) {
    const plan = buildTravelPlan(city, parseInt(numDays, 10), categories);
    return plan ? [plan] : [];
  }

  return travelPlans.filter((plan) => {
    if (numDays && plan.numberOfDays !== parseInt(numDays, 10)) {
      return false;
    }

    if (city && plan.city.toLowerCase() !== city.toLowerCase()) {
      return false;
    }

    if (categories.length > 0) {
      const planCategories = (plan.categories ?? []).map(normalizeCategory);
      const hasCategory = categories.some((category) =>
        planCategories.includes(normalizeCategory(category))
      );
      if (!hasCategory && plan.categories?.length) {
        return false;
      }
    }

    return true;
  });
}

export function getCityImage(cityName) {
  const city = cities.find(
    (entry) => entry.name.toLowerCase() === cityName.toLowerCase()
  );
  return city?.img ?? resolveCityImageUrl(cityName);
}

function readUserPlans() {
  try {
    const stored = localStorage.getItem(USER_PLANS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function writeUserPlans(plans) {
  localStorage.setItem(USER_PLANS_KEY, JSON.stringify(plans));
}

export function getUserPlans() {
  return readUserPlans();
}

export function saveUserPlan(plan) {
  const plans = readUserPlans();
  const existingIndex = plans.findIndex((entry) => entry.id === plan.id);

  if (existingIndex >= 0) {
    plans[existingIndex] = plan;
  } else {
    plans.push(plan);
  }

  writeUserPlans(plans);
  return plans;
}

export function deleteUserPlan(planId) {
  const plans = readUserPlans().filter((plan) => plan.id !== planId);
  writeUserPlans(plans);
  return plans;
}

export function userHasPlan(planId) {
  return readUserPlans().some((plan) => plan.id === planId);
}
