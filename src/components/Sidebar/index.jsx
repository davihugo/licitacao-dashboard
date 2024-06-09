import React, { useState } from 'react';
import { Container, Content, Profile, MenuIcon, EmailInput, NameInput, ProfilePic, FileInputLabel, FileInput } from './styles';
import { 
  FaHome, 
  FaChartBar, 
  FaFileAlt, 
  FaBell, 
  FaMapMarkerAlt, 
  FaRegSun 
} from 'react-icons/fa';
import SidebarItem from '../SidebarItem';
import Formulario from '../Formulario';

const Sidebar = ({ setActiveSection }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [profilePic, setProfilePic] = useState(null);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSectionClick = (section) => {
    setActiveSection(section);
    if (window.innerWidth <= 768) {
      setIsOpen(false); 
    }
  };

  return (
    <>
      <MenuIcon onClick={handleToggle}>
        &#9776;
      </MenuIcon>
      <Container className={isOpen ? 'open' : ''}>
        <Profile>
          <Formulario />
        </Profile>
        <Content>
          <SidebarItem Icon={FaHome} Text="Home" onClick={() => handleSectionClick('home')} />
          <SidebarItem Icon={FaChartBar} Text="Buscar Valores por Ano" onClick={() => handleSectionClick('buscar-valores-por-ano')} />
          <SidebarItem Icon={FaBell} Text="Buscar Licitações por Data" onClick={() => handleSectionClick('buscar-licitacoes-por-data')} />
          <SidebarItem Icon={FaMapMarkerAlt} Text="Buscar Status de Licitação" onClick={() => handleSectionClick('buscar-status-licitacao')} />
          <SidebarItem Icon={FaRegSun} Text="Configurações" onClick={() => handleSectionClick('configuracoes')} />
        </Content>
      </Container>
    </>
  );
};

export default Sidebar;
