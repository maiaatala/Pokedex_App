import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"

import { Pokedex, Pokemon } from "../pages"

const AppRoutes = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Pokedex />} />
          <Route path="/pokemon/:id" element={<Pokemon />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default AppRoutes
