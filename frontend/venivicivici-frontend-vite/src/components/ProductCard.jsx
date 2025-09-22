import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    Button,
    CardActions,
} from "@mui/material";
import { Link } from "react-router-dom";

export default function ProductCard({ product, onAdd }) {
    const img =
        product.imagenUrl ||
        `https://via.placeholder.com/300x300?text=${product.nombre}`;

    return (
        <Card
            sx={{
                width: 260,
                margin: 2,
                display: "flex",
                flexDirection: "column",
                borderRadius: 2,
                boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                backgroundColor: "#111",
                color: "#fff",
            }}
        >

            <CardMedia
                component="img"
                image={img}
                alt={product.nombre}
                sx={{
                    height: 220,
                    objectFit: "cover",
                }}
            />

            <CardContent sx={{ flexGrow: 1 }}>
                <Typography
                    gutterBottom
                    variant="h6"
                    component={Link}
                    to={`/producto/${product.id}`}
                    sx={{
                        textDecoration: "none",
                        color: "#d4af37",
                        fontFamily: "Cinzel, serif",
                        fontWeight: 700,
                    }}
                >
                    {product.nombre}
                </Typography>
                <Typography variant="body2" color="#ccc">
                    ${product.precio}
                </Typography>
            </CardContent>

            <CardActions>
                <Button
                    size="small"
                    variant="contained"
                    onClick={() => onAdd(product)}
                    sx={{
                        backgroundColor: "#d4af37",
                        color: "#000",
                        fontWeight: "bold",
                        "&:hover": { backgroundColor: "#b7952b" },
                    }}
                >
                    Agregar
                </Button>
            </CardActions>
        </Card>
    );
}
