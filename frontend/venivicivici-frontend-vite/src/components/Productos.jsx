import { useEffect, useState } from "react";
import api from "../services/api";
import ProductCard from "./ProductCard";
import { Typography, Divider, Box } from "@mui/material";

export default function Productos({ onAdd }) {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProductos = async () => {
            try {
                const res = await api.get("/producto/listar");
                setProductos(res.data);
            } catch (err) {
                console.error("Error al cargar productos:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchProductos();
    }, []);

    if (loading)
        return (
            <Typography
                align="center"
                sx={{ mt: 4, fontFamily: "Cinzel, serif", color: "#aaa" }}
            >
                Cargando productos...
            </Typography>
        );

    return (
        <Box sx={{ px: 4, py: 6 }}>

            <Typography
                variant="h3"
                align="center"
                gutterBottom
                sx={{
                    fontFamily: "Cinzel, serif",
                    fontWeight: 700,
                    color: "#d4af37",
                    mb: 2,
                }}
            >
                Nuestros Productos
            </Typography>

            <Divider
                sx={{
                    backgroundColor: "#d4af37",
                    width: "120px",
                    height: "3px",
                    mx: "auto",
                    mb: 5,
                }}
            />


            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
                    gap: 24,
                    marginTop: 16,
                }}
            >
                {productos.map((p) => (
                    <ProductCard key={p.id} product={p} onAdd={onAdd} />
                ))}
            </div>
        </Box>
    );
}
