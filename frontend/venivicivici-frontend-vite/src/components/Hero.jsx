import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import BannerCarousel from "../components/BannerCarousel";
import BrandsSection from "../components/BrandsSection";
import FeaturedProducts from "../components/FeaturedProducts";
import { useEffect, useState } from "react";
import api from "../services/api";

export default function Hero({ onAdd }) {
    const [featured, setFeatured] = useState([]);

    useEffect(() => {
        api.get("/producto/listar").then((res) => {
            setFeatured(res.data.slice(0, 5));
        });
    }, []);

    return (
        <>
            <BannerCarousel />
            <BrandsSection />   {}
            <FeaturedProducts products={featured} onAdd={onAdd} />
        </>
    );
}
