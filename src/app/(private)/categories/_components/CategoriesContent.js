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
import { useCallback } from "react";

export default function CategoriesContent() {
  const [input, setInput] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const [allCategories, setAllCategories] = useState([
    { id: 1, name: "categoria 1" },
    { id: 2, name: "categoria 2" },
    { id: 3, name: "categoria 3" },
    { id: 4, name: "categoria 4" },
    { id: 5, name: "categoria 5" },
    { id: 6, name: "categoria 6" },
  ]);
  const [registeredCategories, setRegisteredCategories] = useState([
    { id: 1, name: "categoria 1" },
    { id: 3, name: "categoria 3" },
    { id: 4, name: "categoria 4" },
  ]);

  // const filterCategories = useCallback(() => {
  //   const updatedCategories = allCategories
  //     .map((categoryItem) => {
  //       // Verificar se a categoria está na lista de registeredCategories
  //       const isRegistered = registeredCategories.some(
  //         (userCategoryItem) => userCategoryItem.name === categoryItem.name
  //       );

  //       // Retornar um novo objeto com a propriedade "registered" atualizada
  //       return {
  //         ...categoryItem,
  //         registered: isRegistered,
  //       };
  //     })
  //     .sort((a, b) => a.registered - b.registered);

  //   setAllCategories(updatedCategories);
  // }, [allCategories, registeredCategories]);

  // useEffect(() => {
  //   filterCategories();
  // }, [filterCategories]);

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

  return (
    <div className="flex flex-col h-full">
      <div className="h-[40%]">
        <div className="h-[20%]">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={"categoria"}
          />
        </div>
        <div
          id="lista"
          className="flex flex-col my-2 flex-grow overflow-y-auto h-[50%]"
        >
          {filteredCategories.length === 0 ? (
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
      <div className="h-[60%]">
        <p className="h-[5%]">Categorias cadastradas</p>
        <div className="h-[95%] overflow-y-auto">
          {registeredCategories.map((item) => (
            <RegisteredCategory key={item.id} category={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
