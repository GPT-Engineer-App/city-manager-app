import React, { useState, useEffect } from "react";
import { Container, VStack, Input, Button, List, ListItem, ListIcon, IconButton, useToast } from "@chakra-ui/react";
import { FaTrash, FaPlus, FaEdit } from "react-icons/fa";

const Index = () => {
  const [cities, setCities] = useState([]);
  const [newCity, setNewCity] = useState("");
  const toast = useToast();

  const fetchData = async () => {
    try {
      const response = await fetch("https://sheetdb.io/api/v1/atvconiejzkc3");
      const data = await response.json();
      setCities(data);
    } catch (error) {
      toast({
        title: "Error fetching cities",
        description: error.message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const addCity = async () => {
    try {
      await fetch("https://sheetdb.io/api/v1/atvconiejzkc3", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: [{ name: newCity }] }),
      });
      fetchData();
      setNewCity("");
      toast({
        title: "City added",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error adding city",
        description: error.message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const deleteCity = async (name) => {
    try {
      await fetch(`https://sheetdb.io/api/v1/atvconiejzkc3/name/${name}`, {
        method: "DELETE",
      });
      fetchData();
      toast({
        title: "City deleted",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error deleting city",
        description: error.message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  return (
    <Container centerContent maxW="container.md" py={8}>
      <VStack spacing={4} align="stretch">
        <Input placeholder="Add new city" value={newCity} onChange={(e) => setNewCity(e.target.value)} />
        <Button leftIcon={<FaPlus />} colorScheme="teal" onClick={addCity} isDisabled={!newCity}>
          Add City
        </Button>
        <List spacing={3}>
          {cities.map((city, index) => (
            <ListItem key={index} d="flex" justifyContent="space-between" alignItems="center">
              {city.name}
              <IconButton aria-label="Delete city" icon={<FaTrash />} onClick={() => deleteCity(city.name)} />
            </ListItem>
          ))}
        </List>
      </VStack>
    </Container>
  );
};

export default Index;
