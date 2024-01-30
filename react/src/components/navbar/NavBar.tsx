import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import PersonIcon from '@mui/icons-material/Person';
import Link from '@mui/material/Link';
import { useNavigate } from 'react-router-dom';


const navbar = {
  pages: [
    { name: 'Sobre Nós', URL: '/about', requiredLogin: false },
    { name: 'Blog', URL: '/blog', requiredLogin: false },
    { name: 'Calendário', URL: '/calendar', requiredLogin: false },
    { name: 'Mentoria', URL: '/mentoring', requiredLogin: true },
    { name: 'Materiais', URL: '/materials', requiredLogin: false },
  ],
};

const settings =
{
  guest: [
    { name: "Iniciar Sessão", URL: "/login" },
    { name: "Criar Conta", URL: "/register" },
  ],
  logged: [
    { name: 'Perfil', URL: "/profile" },
    //{ name: "Definições", URL: "" },
    { name: "Terminar Sessão", URL: "/logout" },
  ],
};

function NavBar() {
  const navigate = useNavigate();

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const [isLogged, setIsLogged] = React.useState(false);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#002454'}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* screen > 899 x 877 */}
          <Avatar alt="NEI" src="/public/logo.png" component="a" href="/" sx={{ mr: 2, display: { xs: 'none', md: 'flex' }, fontWeight: 700, letterSpacing: '.3rem', color: 'inherit', textDecoration: 'none', }} />

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton size="large" aria-label="nei menu" aria-controls="menu-appbar" aria-haspopup="true" onClick={handleOpenNavMenu} color="inherit">
              <MenuIcon />
            </IconButton>
            <Menu id="menu-appbar" anchorEl={anchorElNav} anchorOrigin={{ vertical: 'bottom', horizontal: 'left', }} keepMounted transformOrigin={{ vertical: 'top', horizontal: 'left', }}
              open={Boolean(anchorElNav)} onClose={handleCloseNavMenu} sx={{ display: { xs: 'block', md: 'none' }, }}>
              {navbar.pages.map((page) => (
                <MenuItem key={page.name}
                  onClick={() => { handleCloseNavMenu(); navigate(page.URL); }}
                  disabled={!isLogged && page.requiredLogin}>
                  <Button onClick={() => navigate(page.URL)} sx={{ color: 'inherit', textTransform: 'none' }}>{page.name}</Button>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* screen <= 899 x 877 */}
          <Avatar alt="NEI" src="/public/logo.png" sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} component="a" href="/"/>

          <Typography
            variant="h5"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            NEI
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {navbar.pages.map((page) => (
              <Button key={page.name} 
                onClick={() => { handleCloseNavMenu(); navigate(page.URL);}} 
                style={{
                  my: 2,
                  color: !isLogged && page.requiredLogin ? '#969696' : 'white',
                  display: 'block',
                }}
                disabled={!isLogged && page.requiredLogin}
                >{page.name}</Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {isLogged ?
              <Tooltip title="Abrir Definições">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar sx={{ backgroundColor: "#054496" }}><PersonIcon /></Avatar>
                </IconButton>
              </Tooltip>
              : <Tooltip title="Iniciar Sessão">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar sx={{ backgroundColor: "#054496" }}><PersonIcon /></Avatar>
                </IconButton>
              </Tooltip>
            }

            {/* icon user */}
            <Menu sx={{ mt: '45px' }} id="menu-appbar" anchorEl={anchorElUser} anchorOrigin={{ vertical: 'top', horizontal: 'right', }} keepMounted transformOrigin={{ vertical: 'top', horizontal: 'right', }} open={Boolean(anchorElUser)} onClose={handleCloseUserMenu}>
              {isLogged
                ? settings.logged.map((setting) => (
                  <MenuItem key={setting.name} onClick={handleCloseUserMenu}>
                    <Link href={setting.URL} component="a" underline="none" color="inherit">{setting.name}</Link>
                  </MenuItem>
                ))
                : settings.guest.map((setting) => (
                  <MenuItem key={setting.name} onClick={handleCloseUserMenu}>
                    <Link href={setting.URL} component="a" underline="none" color="inherit">{setting.name}</Link>
                  </MenuItem>
                ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar >
  );
}
export default NavBar;