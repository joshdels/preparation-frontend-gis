import React, { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

export default function WindDynamicMapSpacious() {
  const mapContainer = useRef(null);
  const mapRef = useRef(null);
  const canvasRef = useRef(null);
  const windDataRef = useRef([]);
  const fetchTimeout = useRef(null);

  // Generate a grid inside current bounds
  const generateGrid = (bounds, spacing) => {
    const points = [];
    const [minLon, minLat, maxLon, maxLat] = [
      bounds.getWest(),
      bounds.getSouth(),
      bounds.getEast(),
      bounds.getNorth(),
    ];

    for (let lat = minLat; lat <= maxLat; lat += spacing) {
      for (let lon = minLon; lon <= maxLon; lon += spacing) {
        points.push({ lat, lon });
      }
    }
    return points;
  };

  // Decide spacing based on zoom (larger spacing = fewer arrows)
  const getSpacing = (zoom) => {
    if (zoom < 6) return 0.5; // very spacious
    if (zoom < 8) return 0.5;
    return 0.5; // still spacious but more detail at high zoom
  };

  // Safe fetch for wind data
  const fetchWindData = async (gridPoints) => {
    if (!mapRef.current) return;

    const promises = gridPoints.map(async (pt) => {
      try {
        const res = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${pt.lat}&longitude=${pt.lon}&hourly=windspeed_10m,winddirection_10m`
        );
        const data = await res.json();
        return {
          ...pt,
          speed: data.hourly?.windspeed_10m?.[0] ?? 0,
          dir: data.hourly?.winddirection_10m?.[0] ?? 0,
        };
      } catch (e) {
        return { ...pt, speed: 0, dir: 0 };
      }
    });

    windDataRef.current = await Promise.all(promises);
  };

  useEffect(() => {
    const map = new maplibregl.Map({
      container: mapContainer.current,
      style: "https://tiles.stadiamaps.com/styles/alidade_smooth.json",
      center: [120.98, 14.6],
      zoom: 7,
    });
    mapRef.current = map;

    map.on("load", () => {
      // Create canvas overlay
      const canvas = document.createElement("canvas");
      canvas.width = map.getCanvas().width;
      canvas.height = map.getCanvas().height;
      canvas.style.position = "absolute";
      canvas.style.top = 0;
      canvas.style.left = 0;
      canvas.style.pointerEvents = "none";
      map.getContainer().appendChild(canvas);
      canvasRef.current = canvas;
      const ctx = canvas.getContext("2d");

      // Draw function
      const draw = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const zoomScale = map.getZoom();

        windDataRef.current.forEach((pt) => {
          const screen = map.project([pt.lon, pt.lat]);
          const tailLength = pt.speed * 0.08 * zoomScale; // slightly bigger tails
          const arrowSize = 8 * zoomScale * 0.2; // slightly bigger arrows

          ctx.save();
          ctx.translate(screen.x, screen.y);
          ctx.rotate((pt.dir * Math.PI) / 180);

          // Tail
          ctx.beginPath();
          ctx.moveTo(-tailLength, 0);
          ctx.lineTo(0, 0);
          ctx.strokeStyle = "orange";
          ctx.lineWidth = 5 * zoomScale * 0.1;
          ctx.stroke();

          // Arrow head
          ctx.beginPath();
          ctx.moveTo(0, -arrowSize / 2);
          ctx.lineTo(arrowSize, 0);
          ctx.lineTo(0, arrowSize / 2);
          ctx.closePath();
          ctx.fillStyle = "orange";
          ctx.fill();

          ctx.restore();
        });

        requestAnimationFrame(draw);
      };

      draw();

      // Update wind data dynamically
      const updateWindData = async () => {
        if (!mapRef.current) return;
        const zoom = map.getZoom();
        const spacing = getSpacing(zoom);
        const bounds = map.getBounds();
        const grid = generateGrid(bounds, spacing);
        await fetchWindData(grid);
      };

      // Initial fetch
      updateWindData();

      // Fetch after pan/zoom, debounced
      map.on("moveend", () => {
        if (fetchTimeout.current) clearTimeout(fetchTimeout.current);
        fetchTimeout.current = setTimeout(updateWindData, 500);
      });

      // Resize canvas
      map.on("resize", () => {
        canvas.width = map.getCanvas().width;
        canvas.height = map.getCanvas().height;
      });
    });

    return () => map.remove();
  }, []);

  return <div ref={mapContainer} style={{ width: "100vw", height: "100vh" }} />;
}
