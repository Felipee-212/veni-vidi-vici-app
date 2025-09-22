import { Box, Typography, Link, IconButton } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";

export default function Footer() {
    return (
        <Box
            component="footer"
            sx={{
                mt: 8,
                py: 4,
                background: "#000",
                color: "#fff",
                textAlign: "center",
                borderTop: "2px solid #d4af37",
            }}
        >

            <Typography
                variant="h6"
                sx={{
                    fontFamily: "Cinzel, serif",
                    fontWeight: 700,
                    color: "#d4af37",
                    mb: 2,
                }}
            >
                Contacto
            </Typography>


            <Box sx={{ display: "flex", justifyContent: "center", gap: 3, mb: 2 }}>
                <IconButton
                    component={Link}
                    href="https://github.com/Felipee-212"
                    target="_blank"
                    sx={{ color: "#d4af37" }}
                >
                    <GitHubIcon fontSize="large" />
                </IconButton>
                <IconButton
                    component={Link}
                    href="https://www.linkedin.com/in/felipegula/"
                    target="_blank"
                    sx={{ color: "#d4af37" }}
                >
                    <LinkedInIcon fontSize="large" />
                </IconButton>
                <IconButton
                    component={Link}
                    href="mailto:felipegula120@gmail.com"
                    sx={{ color: "#d4af37" }}
                >
                    <EmailIcon fontSize="large" />
                </IconButton>
            </Box>


            <Typography variant="body2" sx={{ color: "#aaa" }}>
                © {new Date().getFullYear()} Veni Vidi Vici — Desarrollado por Felipe Gula
            </Typography>
        </Box>
    );
}
