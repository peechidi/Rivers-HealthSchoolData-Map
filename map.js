

let currentPage = 0;
const pageSize = 100; 

    // Initialize the map centered on Rivers State
    var map = L.map('map').setView([4.75, 6.83], 8);

    // Add a tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
    }).addTo(map);

    var markers = L.markerClusterGroup();

    var allMarkers = [];

   // Function to add hospitals to the map
    function addHospitalMarkers(hospitals)  {  
    hospitals.forEach(function(hospital) {
        var marker = L.circleMarker([hospital.LATITUDE, hospital.LONGITUDE], {
            color: hospital.COLOR,
            radius: 8,
            fillOpacity: 0.8
        }).addTo(map);
 // 

 marker.feature = { properties: hospital };

        // Add popups to tell the story of each hospital
        marker.bindPopup(
            "<b>" + hospital.NAME + "</b><br>" +
            "Challenge: " + hospital.CHALLENGES + "<br>" +
            "Beds: " + hospital.BED + " | Staff: " + hospital.STAFF + " | Facility-Level: " + hospital.LEVEL
        );
        // Bind the click event to update the sidebar
        marker.on('click', function() {
            updateSidebar(hospital);
        });

        markers.addLayer(marker); // Add marker to the cluster group
    });
    map.addLayer(markers); // Add cluster group to the map
        
    // });
}

// Function to add hospitals to the map
function addSchoolMarkers(schools)  {  
    schools.forEach(function(school) {
        var marker = L.circleMarker([school.Latitude, school.Longitude], {
            // color: hospital.COLOR,
            color: school.Color,
            radius: 8,
            fillOpacity: 0.8
        }).addTo(map);
 // 

 // Add properties field for search compatibility
 marker.feature = { properties: school };

        // Add popups to tell the story of each hospital
        marker.bindPopup(
            "<b>" + school.NAME + "</b><br>" +
            "Challenge: " + school.Challenges + "<br>" +
            "Number of Classrooms: " + school.Classrooms + " | School Structure : "  + school.Structure + " | Classroom Size: " + school.CSize + "<br>" + 
            " | Security Availability: " + school.Security_Guard + " | Number of Toilet : " + school.Toilet + "<br>" +
            " | Water Availability: " + school.Water + " | Sport Pitch Availability : " + school.Sports_Pitch + " | Sick Bay Availability : " + school.Sick_Bay 
        );
        // Bind the click event to update the sidebar
        marker.on('click', function() {
            updateSide(school);
        });

        markers.addLayer(marker); // Add marker to the cluster group
    });
    map.addLayer(markers); // Add cluster group to the map
        
    // });
}


 // Fetch the data from final.json
 function loadPage(page) {
    fetch('final.json')
        .then(response => response.json())
        .then(data => {
            const hospitals = data.hospitals.slice(page * pageSize, (page + 1) * pageSize);
            addHospitalMarkers(hospitals);
        })
        .catch(error => {
            console.error('Error loading data:', error);
        });
}

function loadPagetwo(page) {
    fetch('educate.json')
        .then(response => response.json())
        .then(data => {
            const schools = data.schools.slice(page * pageSize, (page + 1) * pageSize);
            addSchoolMarkers(schools);
        })
        .catch(error => {
            console.error('Error loading data:', error);
        });
}
// Initial load
loadPage(currentPage);
loadPagetwo(currentPage);

// Optional: Load more when the map is panned
map.on('moveend', function() {
    currentPage++;
    loadPage(currentPage);
});



//  fetch('final_json.json')
//  .then(response => {
//      if (!response.ok) {
//          throw new Error('Network response was not ok');
//      }
//      return response.json();
//  })
//  .then(data => {
//      addHospitalMarkers(data.hospitals); // Call the function to add markers
//  })
//  .catch(error => {
//      console.error('Error loading data:', error);
//  });
    // Add underserved areas (areas far from hospitals)
// var underservedArea = L.circle([5.15, 6.5], {
//     color: 'blue',
//     fillColor: '#f03',
//     fillOpacity: 0.2,
//     radius: 20000 // 20km area
// }).addTo(map);

// underservedArea.bindPopup("Underserved area: No hospitals within 20km.");

// Function to update the sidebar with hospital info

// Add the search control
var searchControl = new L.Control.Search({
    layer: markers,
    propertyName: 'NAME', // Assuming the property name for hospitals and schools is 'NAME'
    marker: false, // Disable adding markers on search
    moveToLocation: function(latlng, title, map) {
        map.setView(latlng, 14); // Zoom in when an item is found
    }, 
    
    filter: function(feature) {
        // Ensure the feature has a properties object and an LGA property
        return feature && feature.properties && feature.properties.LGA ? true : false;
    }
});

// Add the search control to the map
map.addControl(searchControl);

function updateSidebar(hospital) {
        document.getElementById('description').innerHTML = 
            "<b>" + hospital.NAME + "</b><br>" +
            "Challenge: " + hospital.CHALLENGES + "<br>" +
            "Beds: " + hospital.BED + " | Staff: " + hospital.STAFF + " | Facility-Level: " + hospital.LEVEL;
    }
function updateSide(school) {   
    document.getElementById('description').innerHTML = 
"<b>" + school.NAME + "</b><br>" +
            "Challenge: " + school.Challenges + "<br>" +
            "Number of Classrooms: " + school.Classrooms + " | School Structure : " + school.Structure + " | Classroom Size: " + school.CSize + "<br>" + 
            " | Security Availability: " + school.Security_Guard + " | Number of Toilet : " + school.Toilet + "<br>" +
            " | Water Availability: " + school.Water + " | Sport Pitch Availability : " + school.Sports_Pitch + " | Sick Bay Availability : " + school.Sick_Bay
        }  