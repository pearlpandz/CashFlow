"use client"

import { Typography } from "@mui/material";
import { User } from "../users/page";

export const renderItem = (user: User) => {
  return (
    <div>
        <Typography variant="h6" component="h6">{user.name}</Typography>
        <Typography variant="body1" component="p">{user.email}</Typography>
    </div>
  );
};