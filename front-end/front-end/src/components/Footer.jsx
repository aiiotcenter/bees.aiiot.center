import React, { useState } from 'react';
import { Left, Right, Wrapper } from '../Style/Footer/Style';
import Typography from '../Style/Typography';
import { Menu, MenuItem, Button } from '@mui/material';

export default function Footer() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState('English');

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelect = (language) => {
    setSelectedLanguage(language);
    handleClose();
  };

  const languages = ['English', 'Spanish', 'French', 'German', 'Chinese'];

  return (
    <>
      <Wrapper>
        <Left>
          <Typography variant="p" style={{ fontSize: '14px' }}>
            © Bee-Keeping. 2025 CreativeLayers. All rights reserved.
          </Typography>
        </Left>
        <Right>
          {/* Language Selector */}
          <Button
            variant="outlined"
            onClick={handleClick}
            sx={{
              textTransform: 'none',
              fontSize: '14px',
              padding: '6px 12px',
              borderColor: '#ccc',
              color: '#333',
            }}
          >
            {selectedLanguage}
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            PaperProps={{
              style: {
                maxHeight: 200,
                width: '20ch',
              },
            }}
          >
            {languages.map((language) => (
              <MenuItem
                key={language}
                selected={language === selectedLanguage}
                onClick={() => handleSelect(language)}
              >
                {language}
              </MenuItem>
            ))}
          </Menu>
        </Right>
      </Wrapper>
    </>
  );
}
  