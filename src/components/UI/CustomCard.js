/**
 * CustomCard Component
 *
 * @file CustomCard.js
 * @description Reusable card component for displaying gallery items with image,
 *              title, and description. Built with Material-UI components.
 *
 * @component
 * @param {Object} gallery - Gallery item object
 * @param {string} gallery.imageUrl - URL of the image to display
 * @param {string} gallery.name - Title/name of the gallery item
 * @param {string} gallery.imageDescription - Description text for the gallery item
 *
 * @returns {JSX.Element} Card component for gallery display
 */

import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";

export default function CustomCard({ gallery }) {
  return (
    <Card
      sx={{
        maxWidth: 345,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: 6,
        },
      }}
      elevation={3}
    >
      <CardActionArea sx={{ flexGrow: 1 }}>
        {/* Gallery Image */}
        <CardMedia
          component="img"
          height="200"
          image={gallery.imageUrl}
          alt={gallery.name}
          sx={{
            objectFit: 'cover',
            backgroundColor: 'grey.200',
          }}
        />

        {/* Gallery Content */}
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography
            gutterBottom
            variant="h5"
            component="h3"
            sx={{
              fontWeight: 600,
              color: 'text.primary',
              mb: 1.5,
            }}
          >
            {gallery.name}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              lineHeight: 1.6,
            }}
          >
            {gallery.imageDescription}
          </Typography>
        </CardContent>
      </CardActionArea>

      {/* Optional Actions Area (can be expanded for future features) */}
      <CardActions sx={{ padding: 2, paddingTop: 0 }}>
        {/* Future: Add action buttons here if needed */}
      </CardActions>
    </Card>
  );
}

