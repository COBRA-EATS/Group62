import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
const Sidebar = () => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return (
        <Box bgcolor='#dbd8da' flex={1} p={0} sx={{display: {xs: "none",sm:"block"}}}>
        <Button onClick={handleOpen}><h1>About Cobra EATS</h1></Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                    About Us
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    Cobra Eats is a social media platform with a focus on food recipes, resources, and tips to help college students with limited cooking experience. Students who are 
                    moving away from home for the first time may have difficulty preparing meals and adjusting their budget to their new environment. 
                    Cobra Eats is made to help alleviate these worries by fostering a community of people with similar situations.
                    </Typography>
                </Box>
        </Modal>
        </Box>
    )
}

export default Sidebar;