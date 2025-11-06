import React from "react";

export default function LegendPanel() {
  const items = [
    { color: "lightgray", label: "0 – 200 m" },
    { color: "royalblue", label: "200 – 400 m" },
    { color: "purple", label: "400+ m" },
  ];

  return (
    <div
      style={{
        position: "absolute",
        top: "20px",
        left: "20px",
        background: "#D3D3D3",
        color: "#black",
        padding: "14px 18px",
        boxShadow: "0 2px 2px rgba(0, 0, 0, 0.3)",
        borderRadius: "10px",
        fontSize: "14px",
        width: "220px",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <div
        style={{
          fontWeight: "800",
          fontSize: "20px",
          marginBottom: "10px",
          borderBottom: "1px solid black",
          paddingBottom: "10px",
          letterSpacing: "0.5px",
        }}
      >
        Building Height (m)
      </div>

      {items.map((item, i) => (
        <div
          key={i}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "8px",
          }}
        >
          <div
            style={{
              width: "50px",
              height: "20px",
              borderRadius: "1px",
              background: item.color,
              border: "1px solid black",
            }}
          ></div>
          <div style={{ flex: 1, textAlign: "right", fontSize: "15px" }}>
            {item.label}
          </div>
        </div>
      ))}
    </div>
  );
}
