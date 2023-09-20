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
    <FormGroup row className=" pb-64">
      <FormControl sx={{ width: 150 }} style={{ background: "white", borderRadius: "5px 0px 0px 5px" }}>
        <InputLabel>type</InputLabel>
        <Select
          id="type"
          value={type}
          label="type"
          onChange={handleChangeType}
        >
          <MenuItem value="item1">item1</MenuItem>
          <MenuItem value="item2">item2</MenuItem>
          <MenuItem value="item3">item3</MenuItem>
        </Select>
      </FormControl>
      <FormControl sx={{ width: 150 }} style={{ background: "white", borderRadius: "5px 0px 0px 5px" }}>
        <InputLabel>where</InputLabel>
        <Select
          id="destination"
          value={destination}
          label="where"
          onChange={handleChangeDestination}
        >
          <MenuItem value="item4">item4</MenuItem>
          <MenuItem value="item5">item5</MenuItem>
          <MenuItem value="item6">item6</MenuItem>
        </Select>
      </FormControl>
      <Button
        style={{ backgroundColor: "#8C8CF4", borderRadius: "0px 5px 5px 0px" }}
        variant="contained"
        size="small"
        color="primary"
        startIcon={<SearchIcon />}
      ></Button>
    </FormGroup>
  </div>
</div>

      </Box>
    </>
  );
};

export default Hero;
