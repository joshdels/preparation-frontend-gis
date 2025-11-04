import { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { Chart, ArcElement, Tooltip, Legend, PieController, Title,} from "chart.js"
import '../App.css'

Chart.register(PieController, ArcElement, Tooltip, Legend, Title)

export default function MapComponent2() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (map.current) return;

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: {
        version: 8,
        sources: {},
        layers: [
          {
            id: "background",
            type: "background",
            paint: { "background-color": "#6F8FAF" }, // white
          },
        ],
      },
      center: [0, 0],
      zoom: 3,
    });

    map.current.on('style.load', () => {
      map.current.setProjection({
        type: 'globe',
      })
    })
    
    map.current.on("load", async () => {
      try {
        const geojsonUrl =  "https://services.arcgis.com/P3ePLMYs2RVChkJx/arcgis/rest/services/World_Continents/FeatureServer/0/query?outFields=*&where=1%3D1&f=geojson";
        const response = await fetch(geojsonUrl);
        const geojson = await response.json();
    
        map.current.addSource("contenent", { type: "geojson", data: geojson });
    
        map.current.addLayer({
          id: "contenent-fill",
          type: "fill",
          source: "contenent",
          paint: { 
            "fill-color": [
              "match",
              ["get", "CONTINENT"],
              "Africa", "#f67019",
              "Asia", "#f53794",
              "Europe", "#537bc4",
              "Oceania", "#4dc9f6",
              "North America", "#acc236",
              "South America", "#00a950",
              "Antarctica", "#58595b",
              "#cccccc" // fallback
            ],
            "fill-opacity": 1 },
        });
    
        map.current.addLayer({
          id: "contenent-outline",
          type: "line",
          source: "contenent",
          paint: {"line-color": "black", "line-width": 0.5}
        });
    
        map.current.on("click", "contenent-fill", (e) => {
          const feature = e.features[0];
          const name = feature.properties.CONTINENT
          const area = feature.properties.SQKM
    
          const popupHTML = `
              <h3 style="
                margin: 0;
                font-size: 16px;
                font-weight: 600;
                color: #004a99;
              ">${name}</h3>
              <p style="
                margin: 4px 0 0;
                font-size: 13px;
                color: #555;
              ">Area: <b>${area}</b> sq km</p>
            </div>
          `;
    
          new maplibregl.Popup()
            .setLngLat(e.lngLat)
            .setHTML(popupHTML)
            .addTo(map.current);

        })

        // Chart
        const totals = {};
        geojson.features.forEach((f) => {
          const name = f.properties.CONTINENT;
          const area = f.properties.SQKM;
          if (!totals[name]) totals[name] = 0;
          totals[name] += area;
        });

       const grandTotal = Object.values(totals).reduce((a, b) => a + b, 0)

        const labels = Object.keys(totals);
        const areas = Object.values(totals);

        const percentages = areas.map(a => ((a / grandTotal) * 100).toFixed(2));

        const colorMap = {
          Africa: "#f67019",
          Asia: "#f53794",
          Europe: "#537bc4",
          Oceania: "#4dc9f6",
          "North America": "#acc236",
          "South America": "#00a950",
          Antarctica: "#58595b",
        };

        const backgroundColor = labels.map(name => colorMap[name] || "ccccc");

        if (chartInstance.current) chartInstance.current.destroy();
        chartInstance.current = new Chart(chartRef.current, {
          type: "pie",
          data: {
            labels: labels.map((name, i) => `${name} (${percentages[i]}%)`),
            datasets: [
              {
                data: areas,
                backgroundColor,
                borderColor: "#fff",
                borderWidth: 2,
              },
            ],
          },
          options: {
            plugins: {
              legend: { position: "right" },
              title: {
                display: true,
                text: "World Continents (sq km)",
                color: "#000047",
                font: {
                  size: 25,
                  weight: "bold",
                  family: "Arial, sans-serif"
                }
              }
            }
          }
        })


      } catch (err) {
        console.log(err);
      }
    });
  }, []);

 return (
    <div style={{ position: "relative", width: "100%", height: "100vh" }}>
      {/* 🗺️ Map container */}
      <div ref={mapContainer} style={{ width: "100%", height: "99vh", backgroundColor: "#000047"}} />

      {/* 📊 Chart panel */}
      <div
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          width: "350px",
          background: "white",
          borderRadius: "6px",
          padding: "12px",
          zIndex: 10,
        }}
      >
        <canvas ref={chartRef} />
      </div>
    </div>
  );
}
