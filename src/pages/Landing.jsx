import React, { useContext } from "react";
import Box from "@mui/material/Box";
import { Button, Modal, TextField } from "@mui/material";
import { ctx } from "../context/contextAPI";
import { useNavigate } from "react-router";

export default function Landing() {
  const [open, setOpen] = React.useState(true);

  const navigate = useNavigate();

  const { name, setName } = useContext(ctx);

  const style = {
    position: "absolute",
    display: "flex",
    flexDirection: "column",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };

  const submitHandler = () => {
    if (name) {
      navigate("/flash");
    }
  };

  return (
    <div>
      <Modal
        open={open}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: "80%" }}>
          <TextField
            id="outlined-disabled"
            label="Enter Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            style={{ marginBottom: "20px" }}
          />

          <Button variant="contained" onClick={submitHandler}>
            Submit
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
