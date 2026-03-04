import React, { useState } from 'react'
import ProfileLogoDropZone from 'components/base/ProfileLogoDropZone';
import Box from '@mui/material/Box';

const ShopLogo = () => {
	const [files, setFiles] = useState<File | null>(null);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log(files);
	}

	return (
		<Box sx={{ mx: 3, height: '100%' }}>
			<Box id='shop-logo-form' component="form" onSubmit={handleSubmit} sx={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', maxWidth: 584, mx: 'auto', py: 4 }}>
				<Box id="field-shop-logo-upload">
					<ProfileLogoDropZone
						maxSize={10 * 1024 * 1024} // 10MB
						defaultFile={files}
						onDrop={(acceptedFiles) => {
							setFiles(acceptedFiles[0] ?? null);
							console.log({ acceptedFiles });
						}}
						sx={{ maxWidth: 420 }}
						onRemove={() => setFiles(null)}
						accept={{
							'image/*': ['.png', '.gif', '.jpeg', '.jpg', '.webp', '.avif', '.svg', '.bmp', '.ico'],
							'image/webp': ['.webp'],
							'image/avif': ['.avif'],
							'image/svg+xml': ['.svg'],
						}}
					/>
				</Box>
			</Box>
		</Box>
	)
}

export default ShopLogo;