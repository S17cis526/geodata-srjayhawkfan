window.addEventListener('load', function(){
  // Use Geolocation API yo determine where we address
  if("geolocation" in navigator){
    navigator.geolocation.getCurrentPosition(function(position){
d3.select('body').insert('div', ":first-child").text("You are at"+position.coords.latitude +" , "+position.coords.longitude);

      console.log(position);
    });
  }


  // Build a table for location data

  d3.json('/locations.json', function(err, locations){
    if(err) return console.log(err);

    console.log(locations);


    // create table
    var table = d3.select('body').append('table');

    // create table head
    table.append('thead').append('th').selectAll('th').data(['address', 'latitude', 'longitude']).enter().append('th').text(function(d){return d;});


    table.append('tbody').append('tr').selectAll('th').data(locations).enter().append('tr').each(function(d){
      d3.select(this).append('td').text(d.address);
      d3.select(this).append('td').text(d.latitude);
      d3.select(this).append('td').text(d.longitude);

    });
  });

  d3.json('/united-states.json', function(err, usa){
    if(err) return console.log(err);
    var w = 760;
    var h = 480;
    var svg = d3.select('body').append('svg').attr('width', w).attr('height', h);

    var projection = d3.geoAlbersUsa().scale(1000).translate([w/2, h/2]);

    var path = d3.geoPath().projection(projection);

    svg.insert('path', '.land-borders').datum(topojson.feature(usa, usa.objects.land)).attr('class', '.land-borders').attr('d', path);

    svg.insert('path', '.state-borders').datum(topojson);
  })

})
