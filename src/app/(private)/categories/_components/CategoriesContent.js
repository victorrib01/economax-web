"use client";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Separator } from "@/components/Separator";
import CategorySelect from "./CategorySelect";
import RegisteredCategory from "./RegisteredCategory";
import { useState } from "react";
import { useEffect } from "react";
import React from "react";
import AddCategory from "./AddCategory";
import { getAllCategories, getUserCategories } from "@/services/category";
import { useAuth } from "@/contexts/auth";
import { AiOutlineArrowUp, AiOutlineArrowDown } from "react-icons/ai";

export default function CategoriesContent() {
  const { cookies } = useAuth();
  const [collapse, setCollapse] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedItems, setSelectedItems] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [registeredCategories, setRegisteredCategories] = useState([]);

  const fetchAllCategories = async () =>
    await getAllCategories(setAllCategories);

  const fetchUserCategories = async () => {
    await getUserCategories(setRegisteredCategories, cookies.id);
    setLoading(false);
  };

  const filteredCategories = allCategories.filter((item) => {
    if (typeof input === "string") {
      // Verifica se input é uma string
      if (input[input.length - 1] === " ") {
        return item.name
          .toLowerCase()
          .includes(input.slice(1, input.length - 1).toLowerCase());
      }
      return item.name.toLowerCase().includes(input.toLowerCase());
    }
    return true; // Retorna true para incluir todos os itens se input não for uma string
  });

  // Função para alternar a seleção de um item
  const toggleItem = (itemId) => {
    // Encontrar o índice do item selecionado na lista de seleção
    const itemIndex = selectedItems.findIndex((item) => item.id === itemId.id);
    // Se o item estiver selecionado (índice diferente de -1)
    if (itemIndex !== -1) {
      // Criar uma cópia da lista de seleção atual
      const updatedItems = [...selectedItems];
      // Remover o item da lista de seleção
      setSelectedItems(updatedItems);
      // Atualizar a lista de seleção
      updatedItems.splice(itemIndex, 1);
    }
    // Caso contrário, se o item não estiver selecionado
    else {
      // Encontrar o objeto do item selecionado na lista de categorias filtradas
      const newItem = filteredCategories.find((item) => item.id === itemId.id);

      // Se o objeto do item selecionado existir
      if (newItem) {
        // Adicionar o item à lista de seleção
        setSelectedItems([...selectedItems, newItem]);
      }
    }

    // Limpar o valor de input
    setInput("");
  };

  useEffect(() => {
    function filterCategories() {
      const updatedCategories = allCategories
        .map((categoryItem) => {
          // Verificar se a categoria está na lista de registeredCategories
          const isRegistered = registeredCategories.some(
            (userCategoryItem) => userCategoryItem.name === categoryItem.name
          );

          // Retornar um novo objeto com a propriedade "registered" atualizada
          return {
            ...categoryItem,
            registered: isRegistered,
          };
        })
        .sort((a, b) => a.registered - b.registered);

      setAllCategories(updatedCategories);
    }

    filterCategories();
  }, [registeredCategories]);

  useEffect(() => {
    if (cookies) {
      fetchAllCategories();
      fetchUserCategories();
    }
  }, [cookies]);

  return (
    <div className="flex flex-col h-full">
      {cookies ? (
        <>
          <div className={collapse ? "h-[90%]" : "h-[50%]"}>
            <div className={collapse ? "h-[10%]" : "h-[20%]"}>
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={"categoria"}
              />
            </div>
            <div
              id="lista"
              className={
                collapse
                  ? "flex flex-col my-2 flex-grow overflow-y-auto h-[80%]"
                  : "flex flex-col my-2 flex-grow overflow-y-auto h-[60%]"
              }
            >
              {loading ? (
                <div>
                  <p>loading</p>
                </div>
              ) : filteredCategories.length === 0 ? (
                <div>
                  <AddCategory />
                </div>
              ) : (
                filteredCategories.map((item, index) => {
                  const isSelected =
                    selectedItems.findIndex(
                      (selectedItem) => selectedItem.id === item.id
                    ) !== -1;
                  if (
                    allCategories.filter((category) => category.name === input)
                      .length === 0 &&
                    input.length > 0 &&
                    !allCategories.filter(
                      (category) => category.name === input.trim()
                    ).length
                  ) {
                    return (
                      <React.Fragment key={item.id}>
                        {index === 0 && <AddCategory />}
                        <CategorySelect
                          category={item}
                          isSelected={isSelected}
                          toggleItem={toggleItem}
                        />
                      </React.Fragment>
                    );
                  }
                  return (
                    <CategorySelect
                      key={item.id}
                      category={item}
                      isSelected={isSelected}
                      toggleItem={toggleItem}
                    />
                  );
                })
              )}
            </div>

            <div className="h-[10%]">
              <Button title={"Cadastrar"} />
              <Separator />
            </div>
          </div>
          <div className={collapse ? "h-[10%]" : "h-[50%]"}>
            <div
              className={
                collapse
                  ? "h-[100%] flex flex-row justify-between items-center"
                  : "h-[5%] flex flex-row justify-between items-center py-4"
              }
              onClick={() => setCollapse(!collapse)}
            >
              <p
              // className={collapse ? "h-[100%]" : "h-[5%]"}
              >
                Categorias cadastradas
              </p>
              {collapse ? <AiOutlineArrowDown /> : <AiOutlineArrowUp />}
            </div>
            <div className={collapse ? "hidden" : "h-[95%] overflow-y-auto"}>
              {loading ? (
                <div>
                  <p>loading</p>
                </div>
              ) : registeredCategories.length > 0 ? (
                registeredCategories.map((item) => (
                  <RegisteredCategory key={item.id} category={item} />
                ))
              ) : (
                <div>
                  <p>Sem categorias cadastradas até o momento</p>
                </div>
              )}
            </div>
          </div>
        </>
      ) : (
        <p>loading</p>
      )}
    </div>
  );
}
