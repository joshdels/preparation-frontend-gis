export default function Panel({ zoom }) {
  return (
    <>
      <div
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          background: "rgba(255, 255, 255, 0.7)",
          backdropFilter: "blur(5px)",
          WebkitBackdropFilter: "blur(5px)",
          padding: "16px 20px",
          borderRadius: "12px",
          boxShadow: "0 2px 2px rgba(0,0,0,0.15)",
          zIndex: 100,
          maxWidth: "300px",
          fontFamily: "Inter, Segoe UI, sans-serif",
          color: "#222",
          border: "1px solid rgba(255,255,255,0.6)",
        }}
      >
        <h1
          style={{
            fontSize: "18px",
            marginBottom: "8px",
            fontWeight: 700,
            color: "#300570",
          }}
        >
          Level of Display <span style={{ color: "#300570" }}>(LOD)</span>
        </h1>

        <p
          style={{
            fontSize: "14px",
            lineHeight: "1.5",
            marginBottom: "10px",
            color: "#333",
          }}
        >
          It’s a term used in mapping, GIS, and 3D visualization to describe how
          detailed something is drawn or represented depending on the scale or
          zoom level.
        </p>

        <p
          style={{
            fontWeight: 600,
            fontSize: "14px",
            color: "#5609C8",
            textAlign: "right",
            margin: 0,
          }}
        >
          Zoom Level: {zoom}
        </p>
      </div>
    </>
  );
}
