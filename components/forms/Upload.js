import { Mutation } from 'react-apollo';
import UPLOAD_FILE from '../../queries/uploadFile.gql';
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = (theme) => ({
	button: {
		margin: theme.spacing(1)
	},
	input: {
		display: 'none'
	}
});

const Upload = ({ required, multiple, name, accept, classes, handleUpload, meta }) => (
	<div>
		<Mutation mutation={UPLOAD_FILE}>
			{(upload) => (
				<input
					accept={accept || '*'}
					multiple={multiple || false}
					required={required}
					type="file"
					className={classes.input}
					id={name ? name : 'contained-button-file'}
					onChange={({ target: { validity, files } }) => {
						validity.valid;
						let urlList = [];
						Promise.all(
							Object.keys(files).map(async (fileKey) => {
								const file = files[fileKey];
								await upload({ variables: { file } }).then((res) => {
									if (res && res.data.uploadFile) {
										const url = res.data.uploadFile.url;
										urlList.push(url);
									}
								});
							})
						).then((i) => {
							handleUpload(urlList);
						});
					}}
				/>
			)}
		</Mutation>
		<label htmlFor={name ? name : 'contained-button-file'}>
			<Button variant="contained" component="span" className={classes.button}>
				Upload
			</Button>
			{/* <span>{meta.touched ? meta.error : undefined}</span>
			<span>{meta.error && meta.touched}</span> */}
		</label>
	</div>
);

Upload.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Upload);
