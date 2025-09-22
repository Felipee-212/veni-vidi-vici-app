import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

import banner1 from "../assets/Diseño sin título.png";
import banner2 from "../assets/ISOLATE.png";
import banner3 from "../assets/Banner_1-_1_.png"
import banner4 from "../assets/CBUM-WEBSITE-BANNER-scaled.png"
import banner5 from "../assets/levroness.jpg"

export default function BannerCarousel() {
    return (
        <Swiper
            modules={[Navigation, Autoplay]}
            navigation
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            loop={true}
            style={{ width: "100%", height: "80vh" }}
        >
            {[banner1, banner2,banner3,banner4,banner5].map((banner, index) => (
                <SwiperSlide key={index}>
                    <Box
                        sx={{
                            width: "100%",
                            height: "100%",
                            position: "relative",
                        }}
                    >

                        <img
                            src={banner}
                            alt={`Banner ${index + 1}`}
                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />


                        <Box
                            sx={{
                                position: "absolute",
                                top: "50%",
                                left: "50%",
                                transform: "translate(-50%, -50%)",
                                textAlign: "center",
                                color: "#fff",
                                px: 4,
                                py: 3,
                                borderRadius: 3,
                                background: "rgba(0,0,0,0.4)",
                                backdropFilter: "blur(6px)",
                                boxShadow: "0 8px 32px rgba(0,0,0,0.6)",
                            }}
                        >
                            <Typography
                                variant="h2"
                                sx={{
                                    fontFamily: "Cinzel, serif",
                                    fontWeight: 700,
                                    mb: 2,
                                    letterSpacing: "2px",
                                }}
                            >
                                VENI VIDI VICI
                            </Typography>
                            <Typography variant="h5" sx={{ mb: 4 }}>
                                Suplementos para conquistar tus objetivos
                            </Typography>
                            <Button
                                variant="contained"
                                size="large"
                                component={Link}
                                to="/productos"
                                sx={{
                                    backgroundColor: "#d4af37",
                                    color: "#000",
                                    fontWeight: "bold",
                                    px: 4,
                                    py: 1.5,
                                    fontSize: "1.1rem",
                                    "&:hover": {
                                        backgroundColor: "#b7952b",
                                    },
                                }}
                            >
                                Ver productos
                            </Button>
                        </Box>

                    </Box>
                </SwiperSlide>
            ))}
        </Swiper>
    );
}
