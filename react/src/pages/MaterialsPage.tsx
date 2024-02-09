import { Button } from "@mui/material";
import { createMaterial, getMaterialsList } from "@src/api/MaterialsRoutes";
import { IMaterial } from "@src/interfaces/IMaterial";
import { useEffect, useState } from "react"
import { toast, Bounce } from "react-toastify";


export default function MaterialsPage() {
  const [materialsList, setMaterialsList] = useState<IMaterial[]>([]);

  useEffect(() => {
    document.title = "Materials - NEI"
    getMaterialsList().then((response) => {
      setMaterialsList(response)
    }).catch(() => {
      toast.error("Ocorreu um erro ao aceder aos Materiais! Por favor tenta novamente!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    });
  }, [])

  const handleCreateMaterial = () => {
    const newMaterial: IMaterial = {
      name: "Material de Exemplo",
      link: "https://www.google.com",
      tags: [
        {
          id: 1,
          name: "Exemplo",
        }
      ],
      curricularUnit: {
        id: 1,
        name: "MÉTODOS E TÉCNICAS DE SUPORTE AO DESENVOLVIMENTO DE SOFTWARE",
        abbreviation: "MTSDS",
        year: 1,
        course: [
          {
            id: 1,
            name: "Mestrado em Engenharia Informática",
            abbreviation: "MEI",
          }
        ]
      }
    }
    createMaterial(newMaterial).then(() => {
      toast.success("Material adicionado com sucesso! Após aprovado o mesmo ficará visível! :)", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    }).catch(() => {
      toast.error("Ocorreu um erro ao tentar criar o material :(", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    });
  }

  return (
    <>
      <h1>MaterialsPage</h1>
      <p>{JSON.stringify(materialsList)}</p>
      <Button onClick={handleCreateMaterial}>Adicionar Material</Button>
    </>
  )
}