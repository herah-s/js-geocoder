mapboxgl.accessToken = "pk.eyJ1IjoieWFubmx1Y2tsZWluIiwiYSI6ImNqd3VvZmh0eDAwZzk0YWxjYmx1bmFpaDcifQ.R6oqb2VcNqMXhDf3S1Pb3A";

const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v9",
  center: [139.698652, 35.632313],
  zoom: 12
});

// TODO: Create a function to get the coordinates
// from an address and display a map with a marker on it

const showMap = (userInput) => {
  // TODO: Construct the URL (with apiKey & userInput) and make the fetch request to the mapbox API
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${userInput}.json?access_token=pk.eyJ1IjoieWFubmx1Y2tsZWluIiwiYSI6ImNqd3VvZmh0eDAwZzk0YWxjYmx1bmFpaDcifQ.R6oqb2VcNqMXhDf3S1Pb3A`;

  fetch(url)
    .then(response => response.json())
    .then((data) => {
      // TODO: Insert the info into the DOM
      // - Extract the coordinates from the parsed JSON response (lang, lat)
      // - Display the coordinates in the element where the coordinates will be displayed
      // - Create a map using the Mapbox API and the coordinates
      // - Add a marker to the map at the coordinates
      const longitude = data.features[0].geometry.coordinates[0];
      const latitude = data.features[0].geometry.coordinates[1];
      const coordinatesElement = document.querySelector('p');
      coordinatesElement.innerText = `${longitude}, ${latitude}`;
      const marker = new mapboxgl.Marker().setLngLat([longitude, latitude]).addTo(map);
      map.flyTo({
        center: [longitude, latitude],
        speed: 0.5
      });
    });
};

// TODO: Select the form element
// TODO: Add event listener to the form that:
// - Prevents the default form submission behavior
// - Get the user input
// - Calls the showMap function with the user input as an argument

const form = document.querySelector("form");
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const userInput = document.querySelector("input[type='text']");
  showMap(userInput.value);
});
