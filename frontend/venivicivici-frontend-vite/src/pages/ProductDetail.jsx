import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";
import {
    Box,
    Typography,
    Button,
    Grid,
    Card,
    CardMedia,
    Divider,
} from "@mui/material";

export default function ProductDetail({ onAdd }) {
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        api.get(`/producto/buscarid?id=${id}`).then((res) => setProduct(res.data));
    }, [id]);

    if (!product) return <Typography>Cargando producto...</Typography>;

    return (
        <Box sx={{ padding: 4 }}>
            <Grid container spacing={6} alignItems="flex-start">

                <Grid item xs={12} md={6} sx={{ minHeight: 400 }}>
                    <CardMedia
                        component="img"
                        image={
                            product.imagenUrl ||
                            `https://via.placeholder.com/500x500?text=${product.nombre}`
                        }
                        alt={product.nombre}
                        sx={{
                            objectFit: "cover",
                            maxHeight: 500,
                            p: 2,
                            borderRadius: 2
                        }}
                    />
                </Grid>


                <Grid item xs={12} md={6} sx={{ minHeight: 400 }}>
                    <Typography
                        variant="h3"
                        sx={{
                            fontFamily: "Cinzel, serif",
                            fontWeight: 700,
                            color: "#d4af37",
                            mb: 2,
                            fontSize: { xs: "1.6rem", md: "2.2rem" },
                            overflow: "hidden",
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            textOverflow: "ellipsis",
                            lineHeight: 1.2,
                            maxHeight: "5.5rem",
                        }}
                    >
                        {product.nombre}
                    </Typography>

                    <Divider sx={{ background: "#d4af37", mb: 2, width: "60%" }} />

                    <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
                        ${product.precio}
                    </Typography>

                    <Typography
                        variant="body1"
                        sx={{
                            color: "#ccc",
                            mb: 3,
                            overflow: "hidden",
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            textOverflow: "ellipsis",
                            lineHeight: 1.4,
                            height: "2.8em",
                        }}
                    >
                        {product.descripcion || "Sin descripción disponible."}
                    </Typography>

                    <Button
                        variant="contained"
                        size="large"
                        onClick={() => onAdd(product)}
                        sx={{
                            backgroundColor: "#d4af37",
                            color: "#000",
                            fontWeight: "bold",
                            px: 4,
                            py: 1.5,
                            "&:hover": {
                                backgroundColor: "#b7952b",
                            },
                        }}
                    >
                        Agregar al Carrito
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
}
