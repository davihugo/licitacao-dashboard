import React, { useState } from "react";
import axios from "axios";
import { FormContainer, FormLabel, FormInput, FormButton, ErrorMessage, SuccessMessage } from './styles';

const Formulario = () => {
  const [imagem, setImagem] = useState(null);
  const [nome, setNome] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false); // Adicionando estado para sucesso

  const handleImagemChange = (event) => {
    setImagem(event.target.files[0]);
  };

  const handleNomeChange = (event) => {
    setNome(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!imagem || !nome) {
      setError("Por favor, preencha todos os campos.");
      return;
    }

    const formData = new FormData();
    formData.append("IMAGEM", imagem);
    formData.append("NOME_CANDIDATO", nome);

    try {
      const response = await axios.post("http://54.232.172.200:5004/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response.data);
      setSuccess(true); // Definindo sucesso como verdadeiro
    } catch (error) {
      console.error("Erro ao enviar os dados:", error);
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <FormLabel>
        Nome:
        <FormInput
          type="text"
          placeholder="Seu nome"
          value={nome}
          onChange={handleNomeChange}
        />
      </FormLabel>
      <FormLabel>
        Imagem:
        <FormInput
          type="file"
          onChange={handleImagemChange}
        />
      </FormLabel>
      <FormButton type="submit">Enviar</FormButton>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {success && <SuccessMessage>Formulário enviado com sucesso!</SuccessMessage>}
    </FormContainer>
  );
};

export default Formulario;
