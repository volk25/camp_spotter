import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CampDestroy from '../components/CampDestroy';

/**
 * Confirmation dialog about camp deletion.
 * @param {string} token token of the current user 
 * @param {string} slug slug of the camp to be deleted 
 * @param {boolean} openDialog trigger for open the dialog
 * @param {setState} setOpenDialog function for setting the trigger to open the dialog
 * @returns renders the dialog
 */
export default function DeleteCampDialog(props) {

    /**
	 * Event handler for element deletion
     * @returns calls the function for deletion and closes the dialog
	 */
    function handleDelete() {
        CampDestroy({
            token: props.token, 
            slug: props.slug
        });
        props.setOpenDialog(false);
    };

    // Render the dialog
    return (

        <div>

            {/* Create the dialog */}
            <Dialog
            open={props.openDialog}
            onClose={() => props.setOpenDialog(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">

                {/* Create the dialog title */}
                <DialogTitle id="alert-dialog-title">
                    Delete Camp
                </DialogTitle>

                {/* Create the dialog text */}
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure that you want to permanently delete this camp?
                    </DialogContentText>
                </DialogContent>

                {/* Create the dialog buttons */}
                <DialogActions>
                    <Button onClick={() => props.setOpenDialog(false)}>
                        Cancel
                    </Button>
                    <Button onClick={handleDelete} autoFocus>
                        Delete
                    </Button>
                </DialogActions>

            </Dialog>

        </div>

    );
}
