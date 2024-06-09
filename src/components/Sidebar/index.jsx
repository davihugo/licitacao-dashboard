import React, { useState } from 'react';
import { Container, Content, Profile, EmailInput, NameInput, ProfilePic, FileInputLabel, FileInput } from './styles';
import { 
  FaHome, 
  FaChartBar, 
  FaFileAlt, 
  FaBell, 
  FaMapMarkerAlt, 
  
  FaRegSun 
} from 'react-icons/fa';
import SidebarItem from '../SidebarItem';

const Sidebar = ({ setActiveSection }) => {
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

  return (
    <Container>
      <Profile>
        <ProfilePic src={profilePic || 'default-profile-pic.jpg'}  />
        <FileInputLabel>
          Escolha uma foto
          <FileInput type="file" accept="image/*" onChange={handleImageChange} />
        </FileInputLabel>
        <NameInput 
          type="text" 
          placeholder="Seu nome" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
        />
        <EmailInput 
          type="email" 
          placeholder="Seu email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
        />
      </Profile>
      <Content>
        <SidebarItem Icon={FaHome} Text="Home" onClick={() => setActiveSection('home')} />
        <SidebarItem Icon={FaChartBar} Text="Buscar Valores por Ano" onClick={() => setActiveSection('buscar-valores-por-ano')} />
        <SidebarItem Icon={FaBell} Text="Buscar Licitações por Data" onClick={() => setActiveSection('buscar-licitacoes-por-data')} />
        <SidebarItem Icon={FaMapMarkerAlt} Text="Buscar Status de Licitação" onClick={() => setActiveSection('buscar-status-licitacao')} />
      
        <SidebarItem Icon={FaRegSun} Text="Configurações" onClick={() => setActiveSection('configuracoes')} />
      </Content>
    </Container>
  );
};

export default Sidebar;
