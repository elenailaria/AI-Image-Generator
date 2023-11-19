import { useState } from "react";
import "./main.scss";
import axios from "axios";
import {
   Stack,
   TextField,
   FormControl,
   InputLabel,
   Select,
   MenuItem,
   Button,
   Snackbar,
   Alert,
   CircularProgress,
} from "@mui/material";

// 256x256, 512x512, or 1024x1024 pixels

const sizes = {
   small: "256x256",
   medium: "512x512",
   large: "1024x1024",
};

const Main = () => {
   const [prompt, setPrompt] = useState("");
   const [size, setSize] = useState(sizes.small);
   const [open, setOpen] = useState(false);
   const [img, setImg] = useState("");
   const [loading, setLoading] = useState(false);

   const clickHandler = async () => {
      try {
         if (prompt === "") {
            //  alert("please enter something");
            setOpen(true);
            return;
         }
         setLoading(true);
         console.log({ prompt, size });
         const url = "http://localhost:8200/generate";
         const data = { prompt, size };
         const response = await axios.post(url, data);
         const imgSrc = response.data.src;
         setImg(imgSrc);
         setLoading(false);
      } catch (error) {
         setOpen(true);
         setLoading(false);
         return;
      }
   };

   //
   return (
      <div className="main">
         <Stack spacing={1} className="main-stack">
            <TextField label="Prompt" variant="outlined" value={prompt} onChange={(e) => setPrompt(e.target.value)} />
            <FormControl fullWidth>
               <InputLabel>Size</InputLabel>
               <Select value={size} label="Size" onChange={(e) => setSize(e.target.value)}>
                  <MenuItem value={sizes.small}>small</MenuItem>
                  <MenuItem value={sizes.medium}>medium</MenuItem>
                  <MenuItem value={sizes.large}>large</MenuItem>
               </Select>
               <Button variant="contained" onClick={clickHandler} sx={{ mt: "1rem" }}>
                  Generate New Image
               </Button>
            </FormControl>
         </Stack>
         {loading && <CircularProgress color="success" sx={{ mt: "1rem" }} />}
         {img !== "" && <img src={img} alt="img" />}
         <Snackbar open={open} autoHideDuration={6000} onClose={() => setOpen(false)} message="Note archived">
            <Alert severity="error">This is an error alert — check it out!</Alert>
         </Snackbar>
      </div>
   );
};

export default Main;