
import * as React from "react"
import ProductAddToCart from "../components/ProductAddToCart";
import { SimpleGrid } from "@chakra-ui/react";

function ProductGrid() {

    const groups = [
        {
          isNew: true,
          imageURL:
            'https://images.cointelegraph.com/images/717_aHR0cHM6Ly9zMy5jb2ludGVsZWdyYXBoLmNvbS9zdG9yYWdlL3VwbG9hZHMvdmlldy8xNjQ1ODZiZjViYzBlMmFkNGUxMDM1NDVlM2Y0NjAxMi5qcGc=.jpg',
          name: 'Ape Community',
          rating: 4.2,
          numReviews: 34,
          href: 'https://lensnftchat.vercel.app/group/0x60aDe2DBFC12fe45035EA9641e22952a8876410b?topic=Ape Community'
        },
        {
          isNew: true,
          imageURL:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoQW2odaW9hf73btv9uY2QaHFvzmGtPaiPY-2HAHzGngWrUTdZZWr8ELkAqyYLriZwYm8&usqp=CAU',
          name: 'Rentable Warriors',
          rating: 4.2,
          numReviews: 34,
          href: 'https://lensnftchat.vercel.app/group/0xd956f74F467a23eF94b6535B7eB94074c37B3Cb8?topic=Rentable NFTs'
        },
        {
          isNew: false,
          imageURL:
            'https://pbs.twimg.com/profile_images/1626225438849929218/h_HtSU1a_400x400.jpg',
          name: 'ZetaChain Community',
          rating: 4.2,
          numReviews: 34,
          href: 'https://lensnftchat.vercel.app/group/0x4E75034960C924E8A85747E375378c49ddA17464?topic=ZetaChain NFTs'
        }
      ];
      
    return (
        <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing={4}>
        {groups.map((group, index) => (
          <ProductAddToCart key={index} data={group} />
        ))}
      </SimpleGrid>
    );
  }
  
  export default ProductGrid;
  
 