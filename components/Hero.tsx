"use client";

import Image from "next/image";
import CustomButton from "./CustomButton";
import Box from "@mui/material/Box";
import * as React from "react";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import {
  Typography,
  FormGroup,
  InputLabel,
  MenuItem,
  FormHelperText,
  Menu,
  Button,
    FormControl,
} from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";

const Hero = () => {
  const handleScroll = () => {};

  const [type, setType] = React.useState("");
  const [destination, setDestination] = React.useState("");

  const handleChangeType = (event: SelectChangeEvent) => {
    setType(event.target.value);
  };

  const handleChangeDestination = (event: SelectChangeEvent) => {
    setDestination(event.target.value);
  };



  return (
    <>
      <Box>
        <div className="flex-1 pt-36 padding-x">
          <Typography
            variant="h1"
            className="text-center mt-28"
            sx={{
              fontSize: {
                xs: "2.5rem",
                sm: "3rem",
                md: "4rem",
                lg: "5rem",
                xl: "6rem",
              },
              filter: "invert(1)",
              mixBlendMode: "difference",
            }}
          >
            Welcome to Saudi Life
          </Typography>
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
  <div>
   
  </div>
</div>

      </Box>
    </>
  );
};

export default Hero;
