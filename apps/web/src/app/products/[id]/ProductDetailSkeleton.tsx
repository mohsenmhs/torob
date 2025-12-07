export function ProductDetailSkeleton() {
  return (
    <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
      <div style={{ backgroundColor: "white", borderRadius: "0.5rem", boxShadow: "0 4px 6px rgba(0,0,0,0.1)", padding: "2rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
          <div style={{ height: "400px", backgroundColor: "#e5e7eb", borderRadius: "0.5rem" }} />
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div style={{ height: "2rem", backgroundColor: "#e5e7eb", borderRadius: "0.25rem", width: "75%" }} />
            <div style={{ height: "1rem", backgroundColor: "#e5e7eb", borderRadius: "0.25rem", width: "100%" }} />
            <div style={{ height: "1rem", backgroundColor: "#e5e7eb", borderRadius: "0.25rem", width: "83%" }} />
            <div style={{ height: "3rem", backgroundColor: "#e5e7eb", borderRadius: "0.25rem", width: "40%" }} />
            <div style={{ height: "1.5rem", backgroundColor: "#e5e7eb", borderRadius: "0.25rem", width: "30%" }} />
          </div>
        </div>
      </div>
    </div>
  );
}
